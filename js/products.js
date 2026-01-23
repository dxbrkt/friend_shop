
export const OZON_SELLER_URL = 'https://www.ozon.ru/seller/friend-guide-shop-560835/'
export const CONTACT_PHONE = '+7 (993) 599-58-02'

// Прямые ссылки на товары на Ozon
export const OZON_PRODUCT_URLS = {
  'leather-sandalwood':
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-kozha-i-sandal-100-ml-ot-fg-collection-2396004755/?_bctx=CAQQw50i&hs=1',
  bergamot:
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-bergamot-100-ml-ot-fg-collection-2396004566/?_bctx=CAQQw50i&hs=1',
  'mango-mandarin':
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-mango-i-mandarin-100-ml-ot-fg-collection-2039234460/?_bctx=CAQQw50i&hs=1',
  'citrus-cake':
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-tsitrusovyy-keks-100-ml-ot-fg-collection-2396004807/?_bctx=CAQQw50i&hs=1',
  peony:
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-pion-100-ml-ot-fg-collection-2039234576/?_bctx=CAQQw50i&hs=1',
  'pure-cotton':
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-chistyy-hlopok-100-ml-ot-fg-collection-2039234802/?_bctx=CAQQw50i&hs=1',
  lemongrass:
    'https://www.ozon.ru/product/diffuzor-dlya-doma-aromatizator-dlya-doma-s-palochkami-lemongrass-100-ml-ot-fg-collection-2039234689/?_bctx=CAQQw50i&hs=1',
}

export const PRODUCTS = [
  {
    id: 'mango-mandarin',
    title: 'Манго мандарин',
    price: 928,
    family: 'Фруктовый',
    intensity: 'Яркий',
    mood: 'Тропики / энергия',
    image: 'assets/products/mango-mandarin.png',
    notes: { top: ['мандарин', 'цитрус'], heart: ['манго', 'нектар'], base: ['мускус'] },
    description:
      'Сочный спелый манго и солнечный мандарин. Тропический, яркий и жизнерадостный аромат для кухни и гостиной.',
    rooms: ['кухня', 'гостиная'],
    duration: 'до 16 недель',
  },
  {
    id: 'citrus-cake',
    title: 'Citrus Cake',
    price: 923,
    family: 'Гурманский',
    intensity: 'Средний',
    mood: 'Уют / тёплая выпечка',
    image: 'assets/products/citrus-cake.png',
    notes: { top: ['апельсиновая цедра', 'лимон'], heart: ['ваниль', 'бисквит'], base: ['карамель', 'сироп'] },
    description:
      'Тёплый аромат мягкой выпечки с апельсиновой и лимонной цедрой, ванилью и лёгким сиропом. Максимально «домашний» эффект.',
    rooms: ['кухня', 'гостиная'],
    duration: 'до 16 недель',
  },
  {
    id: 'peony',
    title: 'Пион',
    price: 9467,
    family: 'Цветочный',
    intensity: 'Мягкий',
    mood: 'Романтика / свежесть',
    image: 'assets/products/peony.png',
    notes: { top: ['зелёные ноты'], heart: ['пион', 'лепестки'], base: ['белые мускусы'] },
    description:
      'Нежные лепестки, весеннее цветение и романтичная цветочная атмосфера. Хорош для спальни и ванной.',
    rooms: ['спальня', 'ванная'],
    duration: 'до 16 недель',
  },
  {
    id: 'pure-cotton',
    title: 'Ч̶и̶с̶т̶ы̶й̶ ̶х̶л̶о̶п̶о̶к̶(нет в наличии)',
    price: 10330,
    family: 'Чистота',
    intensity: 'Мягкий',
    mood: 'Чистота / свежий текстиль',
    image: 'assets/products/pure-cotton.png',
    notes: { top: ['альдегиды'], heart: ['хлопок', 'чистое бельё'], base: ['светлое дерево'] },
    description:
      'Мягкость, свежесть и чистота. Напоминает только что постиранное бельё и дневной свет. Универсальный аромат «на каждый день».',
    rooms: ['спальня', 'гардероб', 'ванная'],
    duration: 'до 16 недель',
  },
  {
    id: 'bergamot',
    title: 'Bergamot',
    price: 895,
    family: 'Цитрусовый',
    intensity: 'Средний',
    mood: 'Фокус / свежесть',
    image: 'assets/products/bergamot.png',
    notes: { top: ['бергамот', 'зелёный цитрус'], heart: ['инжирный лист'], base: ['чайные ноты'] },
    description:
      'Изысканная свежесть зелёного цитруса с лёгкой горчинкой и оттенками инжирного листа. Отлично работает в кабинете.',
    rooms: ['кабинет', 'гостиная'],
    duration: 'до 16 недель',
  },
  {
    id: 'lemongrass',
    title: 'Lemongrass',
    price: 10307,
    family: 'Свежий',
    intensity: 'Яркий',
    mood: 'Бодрость / чистый воздух',
    image: 'assets/products/lemongrass.png',
    notes: { top: ['лемонграсс', 'лайм'], heart: ['травы'], base: ['лёгкая древесность'] },
    description:
      'Цитрусовая свежесть, травянистые ноты и бодрящее солнечное звучание. Хорош для прихожей и рабочих зон.',
    rooms: ['прихожая', 'кабинет'],
    duration: 'до 16 недель',
  },
  {
    id: 'leather-sandalwood',
    title: 'Кожа и сандал',
    price: 769,
    family: 'Древесный',
    intensity: 'Средний',
    mood: 'Статус / тепло',
    image: 'assets/products/leather-sandalwood.png',
    notes: { top: ['сухие специи'], heart: ['кожа'], base: ['сандал', 'древесные ноты'] },
    description:
      'Благородная кожа, бархатистый сандал и сухие древесные ноты. Тёплый и статусный аромат для гостиной и офиса.',
    rooms: ['гостиная', 'кабинет'],
    duration: 'до 16 недель',
  },
]

export const FAMILIES = Array.from(new Set(PRODUCTS.map((p) => p.family)))


for (const p of PRODUCTS) {
  p.ozonUrl = OZON_PRODUCT_URLS[p.id] || OZON_SELLER_URL
}

export function byId(id) {
  return PRODUCTS.find((p) => p.id === id)
}
