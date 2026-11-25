export type Lang = 'en' | 'es' | 'ja';
export type PageKey = 'home' | 'beauty-glamour' | 'boudoir-portraits' | 'urban-street';

export const languages: Lang[] = ['es', 'en', 'ja'];
export const defaultLang: Lang = 'en';

export const meta: Record<Lang, { htmlLang: string; ogLocale: string; label: string; name: string; sep: string }> = {
	en: { htmlLang: 'en', ogLocale: 'en_US', label: 'EN', name: 'English', sep: ', ' },
	es: { htmlLang: 'es', ogLocale: 'es_MX', label: 'ES', name: 'Español', sep: ', ' },
	ja: { htmlLang: 'ja', ogLocale: 'ja_JP', label: 'JA', name: '日本語', sep: '、' },
};

/** English lives at the site root; Spanish and Japanese live under /es/ and /ja/. */
export function pagePath(lang: Lang, key: PageKey): string {
	const slug = key === 'home' ? '' : `${key}/`;
	return lang === defaultLang ? `/${slug}` : `/${lang}/${slug}`;
}

type GalleryText = {
	title: string;
	description: string;
	h1: string;
	intro: string;
	subjects: string[];
	details: string[];
};

type Dict = {
	defaultDescription: string;
	jsonLdDescription: string;
	nav: Record<PageKey, string>;
	switcherLabel: string;
	home: {
		title: string;
		description: string;
		intro: string;
		servicesTitle: string;
		services: { key: PageKey | null; name: string; text: string }[];
	};
	galleries: Record<'beauty-glamour' | 'boudoir-portraits' | 'urban-street', GalleryText>;
	lightbox: { close: string; prev: string; next: string };
	media: { videos: string; photos: string };
	sort: { label: string; shuffle: string; takenNew: string; takenOld: string; addedNew: string; addedOld: string };
};

const brand = "Devtag' Studios";

export const dict: Record<Lang, Dict> = {
	en: {
		defaultDescription: `${brand} | Photography and Videography in CDMX`,
		jsonLdDescription:
			'Professional glamour, beauty, boudoir, street, urban, and experimental photography and videography with over 19 years of experience.',
		nav: {
			home: 'Home',
			'beauty-glamour': 'Beauty & Glamour',
			'boudoir-portraits': 'Boudoir Portraits',
			'urban-street': 'Urban & Street',
		},
		switcherLabel: 'Language',
		home: {
			title: `${brand} | Glamour, Boudoir and Urban Photography in CDMX`,
			description:
				'With over 19 years of experience, our studio delivers professional glamour, beauty, boudoir, street, urban, and experimental photography and videography. Our work has taken us across both the West and the East, bringing a refined eye and a distinctive creative vision to every project.',
			intro:
				'With over 19 years of experience, our studio delivers professional glamour, beauty, boudoir, street, urban, and experimental photography and videography. Our work has taken us across both the West and the East, bringing a refined eye and a distinctive creative vision to every project.',
			servicesTitle: 'What we do',
			services: [
				{ key: 'beauty-glamour', name: 'Beauty & Glamour', text: 'Polished, editorial portraits with refined lighting and styling.' },
				{ key: 'boudoir-portraits', name: 'Boudoir Portraits', text: 'Elegant, tasteful portraits created with trust and artistic care.' },
				{ key: 'urban-street', name: 'Urban & Street', text: 'Candid and styled work shot in the streets, architecture, and light of the city.' },
				{ key: null, name: 'Experimental & Videography', text: 'Creative photo and video projects built around a distinctive visual idea.' },
			],
		},
		galleries: {
			'beauty-glamour': {
				title: `Beauty & Glamour Photography in CDMX | ${brand}`,
				description: `Professional beauty and glamour photography in CDMX (Mexico City) by ${brand}. Polished, editorial portraits with refined lighting and styling.`,
				h1: 'Beauty & Glamour Photography',
				intro:
					'Polished, expressive portraits that celebrate natural beauty and confident style. Our beauty and glamour photography combines refined lighting, careful styling, and direct collaboration with each model to create images with a timeless, editorial feel.',
				subjects: ['Beauty and glamour portrait', 'Glamour photography', 'Beauty photoshoot', 'Studio beauty portrait', 'Fashion glamour portrait', 'Model portrait', 'Glamour photo session'],
				details: ['natural light', 'soft studio lighting', `styled by ${brand}`, 'close-up beauty look', 'elegant pose', 'editorial style', 'professional model shoot', `by ${brand}`],
			},
			'boudoir-portraits': {
				title: `Boudoir Portrait Photography in CDMX | ${brand}`,
				description: `Elegant boudoir portrait photography in CDMX (Mexico City) by ${brand}. Tasteful, artistic and professional sessions. Adult audience.`,
				h1: 'Boudoir Portrait Photography',
				intro:
					'Elegant, intimate portraits created with respect, trust, and artistic care. Our boudoir photography focuses on mood, light, and confidence, delivering tasteful images in a comfortable, professional setting. This gallery is intended for adult audiences.',
				subjects: ['Boudoir portrait', 'Boudoir photography', 'Elegant boudoir session', 'Intimate portrait', 'Lingerie portrait', 'Artistic boudoir photo', 'Boudoir photoshoot'],
				details: ['moody lighting', 'tasteful and artistic', 'lingerie styling', 'soft window light', `by ${brand}`, 'professional boudoir session', 'elegant pose', 'fine art style'],
			},
			'urban-street': {
				title: `Urban & Street Photography in CDMX | ${brand}`,
				description: `Urban and street photography in CDMX (Mexico City) by ${brand}. Fashion, city atmosphere and experimental compositions.`,
				h1: 'Urban & Street Photography',
				intro:
					'Candid and styled work shot in the streets, architecture, and light of the city. Our urban and street photography blends fashion, atmosphere, and experimental composition, drawing on more than 19 years of experience across the West and the East.',
				subjects: ['Urban photography', 'Street photography', 'Urban fashion portrait', 'City street portrait', 'Experimental urban photo', 'Street style photoshoot', 'Urban portrait'],
				details: ['city architecture', 'stairs and concrete', 'street style', 'natural city light', `by ${brand}`, 'urban fashion', 'cinematic city mood', 'downtown setting'],
			},
		},
		lightbox: { close: 'Close', prev: 'Previous photo', next: 'Next photo' },
		media: { videos: 'Videos', photos: 'Photos' },
		sort: { label: 'Sort by', shuffle: 'Shuffle', takenNew: 'Date taken: newest', takenOld: 'Date taken: oldest', addedNew: 'Date added: newest', addedOld: 'Date added: oldest' },
	},

	es: {
		defaultDescription: `${brand} | Fotografía y videografía en CDMX`,
		jsonLdDescription:
			'Fotografía y videografía profesional de glamour, belleza, boudoir, calle, urbana y experimental, con más de 19 años de experiencia.',
		nav: {
			home: 'Inicio',
			'beauty-glamour': 'Belleza y Glamour',
			'boudoir-portraits': 'Retratos Boudoir',
			'urban-street': 'Urbano y Calle',
		},
		switcherLabel: 'Idioma',
		home: {
			title: `${brand} | Fotografía de Glamour, Boudoir y Urbana en CDMX`,
			description:
				'Con más de 19 años de experiencia, nuestro estudio ofrece fotografía y videografía profesional de glamour, belleza, boudoir, calle, urbana y experimental. Nuestro trabajo nos ha llevado por Occidente y Oriente, aportando una mirada refinada y una visión creativa distintiva a cada proyecto.',
			intro:
				'Con más de 19 años de experiencia, nuestro estudio ofrece fotografía y videografía profesional de glamour, belleza, boudoir, calle, urbana y experimental. Nuestro trabajo nos ha llevado por Occidente y Oriente, aportando una mirada refinada y una visión creativa distintiva a cada proyecto.',
			servicesTitle: 'Lo que hacemos',
			services: [
				{ key: 'beauty-glamour', name: 'Belleza y Glamour', text: 'Retratos editoriales y pulidos, con iluminación y estilismo refinados.' },
				{ key: 'boudoir-portraits', name: 'Retratos Boudoir', text: 'Retratos elegantes y de buen gusto, creados con confianza y cuidado artístico.' },
				{ key: 'urban-street', name: 'Urbano y Calle', text: 'Trabajo espontáneo y estilizado, hecho en las calles, la arquitectura y la luz de la ciudad.' },
				{ key: null, name: 'Experimental y Videografía', text: 'Proyectos creativos de foto y video construidos en torno a una idea visual distintiva.' },
			],
		},
		galleries: {
			'beauty-glamour': {
				title: `Fotografía de Belleza y Glamour en CDMX | ${brand}`,
				description: `Fotografía profesional de belleza y glamour en CDMX (Ciudad de México) por ${brand}. Retratos editoriales y pulidos con iluminación y estilismo refinados.`,
				h1: 'Fotografía de Belleza y Glamour',
				intro:
					'Retratos pulidos y expresivos que celebran la belleza natural y el estilo seguro. Nuestra fotografía de belleza y glamour combina iluminación refinada, estilismo cuidadoso y colaboración directa con cada modelo para crear imágenes con un aire editorial y atemporal.',
				subjects: ['Retrato de belleza y glamour', 'Fotografía de glamour', 'Sesión de fotos de belleza', 'Retrato de belleza en estudio', 'Retrato de glamour y moda', 'Retrato de modelo', 'Sesión de fotos de glamour'],
				details: ['luz natural', 'iluminación suave de estudio', `estilismo de ${brand}`, 'look de belleza en primer plano', 'pose elegante', 'estilo editorial', 'sesión profesional con modelo', `por ${brand}`],
			},
			'boudoir-portraits': {
				title: `Fotografía de Retratos Boudoir en CDMX | ${brand}`,
				description: `Fotografía de retratos boudoir elegante en CDMX (Ciudad de México) por ${brand}. Sesiones de buen gusto, artísticas y profesionales. Solo para público adulto.`,
				h1: 'Fotografía de Retratos Boudoir',
				intro:
					'Retratos elegantes e íntimos creados con respeto, confianza y cuidado artístico. Nuestra fotografía boudoir se centra en el ambiente, la luz y la confianza, entregando imágenes de buen gusto en un entorno cómodo y profesional. Esta galería está destinada a público adulto.',
				subjects: ['Retrato boudoir', 'Fotografía boudoir', 'Sesión boudoir elegante', 'Retrato íntimo', 'Retrato en lencería', 'Foto boudoir artística', 'Sesión de fotos boudoir'],
				details: ['iluminación envolvente', 'de buen gusto y artístico', 'estilismo en lencería', 'suave luz de ventana', `por ${brand}`, 'sesión boudoir profesional', 'pose elegante', 'estilo de arte fino'],
			},
			'urban-street': {
				title: `Fotografía Urbana y de Calle en CDMX | ${brand}`,
				description: `Fotografía urbana y de calle en CDMX (Ciudad de México) por ${brand}. Moda, ambiente de ciudad y composiciones experimentales.`,
				h1: 'Fotografía Urbana y de Calle',
				intro:
					'Trabajo espontáneo y estilizado, hecho en las calles, la arquitectura y la luz de la ciudad. Nuestra fotografía urbana y de calle mezcla moda, atmósfera y composición experimental, con más de 19 años de experiencia entre Occidente y Oriente.',
				subjects: ['Fotografía urbana', 'Fotografía de calle', 'Retrato de moda urbana', 'Retrato en la calle de la ciudad', 'Foto urbana experimental', 'Sesión de fotos de street style', 'Retrato urbano'],
				details: ['arquitectura de la ciudad', 'escaleras y concreto', 'street style', 'luz natural de la ciudad', `por ${brand}`, 'moda urbana', 'ambiente cinematográfico de ciudad', 'escenario del centro'],
			},
		},
		lightbox: { close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente' },
		media: { videos: 'Videos', photos: 'Fotos' },
		sort: { label: 'Ordenar por', shuffle: 'Aleatorio', takenNew: 'Fecha de la foto: más reciente', takenOld: 'Fecha de la foto: más antigua', addedNew: 'Fecha de subida: más reciente', addedOld: 'Fecha de subida: más antigua' },
	},

	ja: {
		defaultDescription: `${brand} | CDMXの写真・映像制作`,
		jsonLdDescription:
			'19年以上の経験を持つ、グラマー、ビューティー、ブドワール、ストリート、アーバン、実験的な写真・映像制作のプロフェッショナルスタジオ。',
		nav: {
			home: 'ホーム',
			'beauty-glamour': 'ビューティー＆グラマー',
			'boudoir-portraits': 'ブドワール・ポートレート',
			'urban-street': 'アーバン＆ストリート',
		},
		switcherLabel: '言語',
		home: {
			title: `${brand} | CDMX（メキシコシティ）のグラマー・ブドワール・アーバン写真`,
			description:
				'19年以上の経験をもとに、グラマー、ビューティー、ブドワール、ストリート、アーバン、実験的な写真・映像制作をプロフェッショナルに提供するスタジオです。西洋と東洋の両方で活動し、洗練された感性と独自のクリエイティブビジョンをすべてのプロジェクトにお届けします。',
			intro:
				'19年以上の経験をもとに、グラマー、ビューティー、ブドワール、ストリート、アーバン、実験的な写真・映像制作をプロフェッショナルに提供するスタジオです。西洋と東洋の両方で活動し、洗練された感性と独自のクリエイティブビジョンをすべてのプロジェクトにお届けします。',
			servicesTitle: '私たちの仕事',
			services: [
				{ key: 'beauty-glamour', name: 'ビューティー＆グラマー', text: '洗練されたライティングとスタイリングによる、上質でエディトリアルなポートレート。' },
				{ key: 'boudoir-portraits', name: 'ブドワール・ポートレート', text: '信頼と芸術的な配慮から生まれる、上品で品格のあるポートレート。' },
				{ key: 'urban-street', name: 'アーバン＆ストリート', text: '街並み、建築、光の中で撮影した、自然体からスタイリッシュまでの作品。' },
				{ key: null, name: '実験的作品＆映像', text: '独自のビジュアルコンセプトに基づく、クリエイティブな写真・映像プロジェクト。' },
			],
		},
		galleries: {
			'beauty-glamour': {
				title: `CDMX（メキシコシティ）のビューティー＆グラマー写真 | ${brand}`,
				description: `${brand}による、CDMX（メキシコシティ）でのプロフェッショナルなビューティー＆グラマー写真。洗練されたライティングとスタイリングによるエディトリアルなポートレート。`,
				h1: 'ビューティー＆グラマー写真',
				intro:
					'自然な美しさと自信に満ちたスタイルを称える、洗練された表情豊かなポートレート。ビューティー＆グラマー写真では、洗練されたライティング、丁寧なスタイリング、モデルとの密なコラボレーションを組み合わせ、時代を超えたエディトリアルな雰囲気の作品を生み出します。',
				subjects: ['ビューティー＆グラマーのポートレート', 'グラマー写真', 'ビューティー撮影', 'スタジオ・ビューティーポートレート', 'ファッション・グラマーポートレート', 'モデルポートレート', 'グラマー撮影セッション'],
				details: ['自然光', '柔らかなスタジオライティング', `${brand}のスタイリング`, 'クローズアップのビューティールック', 'エレガントなポーズ', 'エディトリアルスタイル', 'プロのモデル撮影', `${brand}撮影`],
			},
			'boudoir-portraits': {
				title: `CDMX（メキシコシティ）のブドワール・ポートレート写真 | ${brand}`,
				description: `${brand}による、CDMX（メキシコシティ）でのエレガントなブドワール・ポートレート写真。上品で芸術的なプロフェッショナルセッション。成人向け。`,
				h1: 'ブドワール・ポートレート写真',
				intro:
					'敬意と信頼、そして芸術的な配慮から生まれる、エレガントで親密なポートレート。ブドワール写真ではムード、光、自信を大切にし、心地よくプロフェッショナルな環境で上品な作品をお届けします。このギャラリーは成人向けです。',
				subjects: ['ブドワール・ポートレート', 'ブドワール写真', 'エレガントなブドワール撮影', '親密なポートレート', 'ランジェリー・ポートレート', '芸術的なブドワール写真', 'ブドワール撮影セッション'],
				details: ['ムードのある照明', '上品で芸術的', 'ランジェリーのスタイリング', '柔らかな窓の光', `${brand}撮影`, 'プロのブドワールセッション', 'エレガントなポーズ', 'ファインアート風'],
			},
			'urban-street': {
				title: `CDMX（メキシコシティ）のアーバン＆ストリート写真 | ${brand}`,
				description: `${brand}による、CDMX（メキシコシティ）でのアーバン＆ストリート写真。ファッション、街の空気感、実験的な構図。`,
				h1: 'アーバン＆ストリート写真',
				intro:
					'街並み、建築、光の中で撮影した、自然体からスタイリッシュまでの作品。アーバン＆ストリート写真では、ファッション、空気感、実験的な構図を融合し、西洋と東洋にわたる19年以上の経験を活かしています。',
				subjects: ['アーバン写真', 'ストリート写真', 'アーバン・ファッションポートレート', '街角のポートレート', '実験的なアーバン写真', 'ストリートスタイル撮影', 'アーバンポートレート'],
				details: ['都市の建築', '階段とコンクリート', 'ストリートスタイル', '街の自然光', `${brand}撮影`, 'アーバンファッション', 'シネマティックな街の雰囲気', 'ダウンタウンの風景'],
			},
		},
		lightbox: { close: '閉じる', prev: '前の写真', next: '次の写真' },
		media: { videos: '動画', photos: '写真' },
		sort: { label: '並べ替え', shuffle: 'ランダム', takenNew: '撮影日：新しい順', takenOld: '撮影日：古い順', addedNew: '追加日：新しい順', addedOld: '追加日：古い順' },
	},
};
