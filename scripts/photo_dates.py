#!/usr/bin/env python3
"""Build src/data/photo-dates.json: {"/images/<folder>/<file>": [taken, added]}.

taken = date the photo was taken (EXIF DateTimeOriginal) or null.
added = date the file first appeared in git (or today for files not committed yet).

Run BEFORE resizing new photos (resizing with PIL drops EXIF), from the repo root:
    python3 scripts/photo_dates.py
Existing non-null "taken" values are kept, so re-running is safe.
Sources for "taken", in order: EXIF of the published file, the unblurred sibling original
in the same folder (name without -sfw), a same-named file anywhere under ~/Pictures/Models.
"""
import datetime, json, os, re, subprocess
from PIL import Image

FOLDERS = ['gallery', 'boudoir']  # urban is intentionally not sortable yet
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'public/images')
OUT = os.path.join(ROOT, 'src/data/photo-dates.json')
MODELS = os.path.expanduser('~/Pictures/Models')
MEDIA = re.compile(r'\.(jpe?g|png|webp|mp4)$', re.I)


def exif_taken(path):
    try:
        e = Image.open(path).getexif()
        v = e.get_ifd(0x8769).get(0x9003) or e.get(0x0132)
        if not v:
            return None
        d = datetime.datetime.strptime(str(v).strip()[:19], '%Y:%m:%d %H:%M:%S')
        return d.isoformat() if 1995 <= d.year <= datetime.date.today().year else None
    except Exception:
        return None


def git_added():
    out = subprocess.run(['git', 'log', '--diff-filter=A', '--name-only', '--format=@@%aI'],
                         cwd=ROOT, capture_output=True, text=True).stdout
    added, cur = {}, None
    for line in out.splitlines():  # newest first, so later lines overwrite = oldest wins
        if line.startswith('@@'):
            cur = line[2:10 + 2][:10]
        elif line.strip():
            added[line.strip()] = cur
    return added


def main():
    old = json.load(open(OUT)) if os.path.exists(OUT) else {}
    models = {}
    for dp, _, fs in os.walk(MODELS):
        if 'Claude outputs' in dp:
            continue
        for f in fs:
            models.setdefault(f.lower(), os.path.join(dp, f))
    added = git_added()
    today = datetime.date.today().isoformat()
    data, stats = {}, {}
    # Only files git would publish: tracked or new-but-not-ignored (git-excluded originals are skipped).
    listed = set(subprocess.run(['git', 'ls-files', '--cached', '--others', '--exclude-standard', 'public/images'],
                                cwd=ROOT, capture_output=True, text=True).stdout.split('\n'))
    for folder in FOLDERS:
        d = os.path.join(IMG, folder)
        for f in sorted(os.listdir(d)):
            if not MEDIA.search(f) or f'public/images/{folder}/{f}' not in listed:
                continue
            key = f'/images/{folder}/{f}'
            taken = None
            if not f.lower().endswith('.mp4'):
                taken = exif_taken(os.path.join(d, f))
                base = re.sub(r'-sfw(?=\.)', '', f, flags=re.I)
                if not taken:
                    for sib in os.listdir(d):
                        if sib.lower() == base.lower() and sib != f:
                            taken = exif_taken(os.path.join(d, sib))
                if not taken and base.lower() in models:
                    taken = exif_taken(models[base.lower()])
            taken = taken or (old.get(key) or [None])[0]
            data[key] = [taken, added.get(f'public/images/{folder}/{f}', today)]
            s = stats.setdefault(folder, [0, 0]); s[0] += 1; s[1] += bool(taken)
    json.dump(data, open(OUT, 'w'), indent=0, sort_keys=True)
    for k, (n, t) in stats.items():
        print(f'{k}: {n} files, {t} with date taken, {n - t} without')


main()
