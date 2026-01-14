import { PRODUCTS, OZON_SELLER_URL, byId } from './products.js'
import { addToCart } from './cart.js'
import { mountLayout, fmtMoney, getParam, toast, updateCartBadge } from './ui.js'
import { initOverlay, openProductOverlay } from './overlay.js'

mountLayout({ active: 'catalog' })
initOverlay()

for (const a of document.querySelectorAll('[data-ozon]')) {
  a.href = OZON_SELLER_URL
  a.target = '_blank'
  a.rel = 'noreferrer'
}

const id = getParam('id')
const p = byId(id)

if (!p) {
  document.querySelector('#title').textContent = 'Товар не найден'
  document.querySelector('#desc').textContent = 'Похоже, ссылка устарела. Вернитесь в каталог.'
}

function makeChip(text) {
  const s = document.createElement('span')
  s.className = 'chip'
  s.textContent = text
  return s
}

function renderRelated(currentId) {
  const wrap = document.getElementById('related')
  wrap.innerHTML = ''
  const rel = PRODUCTS.filter((x) => x.id !== currentId).slice(0, 3)
  for (const r of rel) {
    const el = document.createElement('article')
    el.className = 'glass product'
    el.innerHTML = `
      <a href="product.html?id=${encodeURIComponent(r.id)}" aria-label="${r.title}">
        <div class="img"><img src="${r.image}" alt="${r.title}" loading="lazy" /></div>
        <h3>${r.title}</h3>
        <div class="desc">${r.mood}</div>
        <div class="bottom"><div class="price">${fmtMoney(r.price)}</div><span class="small">${r.family}</span></div>
      </a>
    `
    wrap.appendChild(el)
  }
}

if (p) {
  // SEO-ish title
  document.title = `${p.title} — Friend Guide`

  document.getElementById('img').src = p.image
  document.getElementById('img').alt = p.title
  document.getElementById('title').textContent = p.title
  document.getElementById('desc').textContent = p.description
  document.getElementById('meta').textContent = `100 мл • ${p.duration} • ${p.intensity}`
  document.getElementById('price').textContent = fmtMoney(p.price)

  const chips = document.getElementById('chips')
  chips.appendChild(makeChip(p.family))
  chips.appendChild(makeChip(p.intensity))
  chips.appendChild(makeChip(p.mood))

  const notes = document.getElementById('notes')
  const block = (label, arr) => {
    const d = document.createElement('div')
    d.innerHTML = `<div class="small">${label}</div><div style="margin-top:4px;color:rgba(255,255,255,.65)">${arr.join(' • ')}</div>`
    return d
  }
  notes.appendChild(block('Верх', p.notes.top))
  notes.appendChild(block('Сердце', p.notes.heart))
  notes.appendChild(block('База', p.notes.base))

  const rooms = document.getElementById('rooms')
  for (const r of p.rooms) rooms.appendChild(makeChip(r))

  const addBtn = document.getElementById('add')
  addBtn.addEventListener('click', () => {
    addToCart(p, 1)
    updateCartBadge()
    toast(`Добавлено в корзину: ${p.title}`)
  })

  // логика 
  const buyLink = document.querySelector('[data-ozon]')
  if (buyLink) {
    buyLink.href = p.ozonUrl
    buyLink.addEventListener('click', (e) => {
      // пояснения почему нельзя ябольше добавить
      e.preventDefault()
      openProductOverlay(p, 1)
    })
  }

  renderRelated(p.id)
}

window.addEventListener('storage', updateCartBadge)
