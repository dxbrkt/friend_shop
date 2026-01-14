import { PRODUCTS, FAMILIES, OZON_SELLER_URL } from './products.js'
import { mountLayout, fmtMoney, updateCartBadge } from './ui.js'
import { initOverlay } from './overlay.js'

mountLayout({ active: 'catalog' })
initOverlay()

for (const a of document.querySelectorAll('[data-ozon]')) {
  a.href = OZON_SELLER_URL
  a.target = '_blank'
  a.rel = 'noreferrer'
}

const qEl = document.getElementById('q')
const famEl = document.getElementById('family')
const famTriggerEl = document.getElementById('familyTrigger')
const famMenuEl = document.getElementById('familyMenu')
const listEl = document.getElementById('products')
const emptyEl = document.getElementById('empty')

function option(value, label) {
  const o = document.createElement('option')
  o.value = value
  o.textContent = label
  return o
}

famEl.appendChild(option('all', 'Все семейства'))
for (const f of FAMILIES) famEl.appendChild(option(f, f))

// дропчик
function openMenu() {
  famTriggerEl.setAttribute('aria-expanded', 'true')
  famMenuEl.hidden = false
}

function closeMenu() {
  famTriggerEl.setAttribute('aria-expanded', 'false')
  famMenuEl.hidden = true
}

function isMenuOpen() {
  return famTriggerEl.getAttribute('aria-expanded') === 'true'
}

function syncTriggerLabel() {
  const selected = famEl.options[famEl.selectedIndex]
  famTriggerEl.textContent = selected ? selected.textContent : 'Все семейства'
}

function buildMenu() {
  famMenuEl.innerHTML = ''
  for (const o of famEl.options) {
    const item = document.createElement('div')
    item.className = 'cselect__option'
    item.role = 'option'
    item.dataset.value = o.value
    item.textContent = o.textContent
    item.setAttribute('aria-selected', o.selected ? 'true' : 'false')
    item.addEventListener('click', () => {
      famEl.value = o.value
      famEl.dispatchEvent(new Event('change', { bubbles: true }))
      syncTriggerLabel()
      buildMenu()
      closeMenu()
    })
    famMenuEl.appendChild(item)
  }
}

famTriggerEl.addEventListener('click', (e) => {
  e.preventDefault()
  if (isMenuOpen()) closeMenu()
  else openMenu()
})

document.addEventListener('click', (e) => {
  if (!isMenuOpen()) return
  const root = e.target.closest('[data-cselect]')
  if (root) return
  closeMenu()
})

document.addEventListener('keydown', (e) => {
  if (!isMenuOpen()) return
  if (e.key === 'Escape') closeMenu()
})

syncTriggerLabel()
buildMenu()
closeMenu()

function matches(product, query, family) {
  const matchesFamily = family === 'all' || product.family === family
  if (!matchesFamily) return false
  if (!query) return true
  const text = `${product.title} ${product.description} ${product.family} ${product.mood}`.toLowerCase()
  return text.includes(query)
}

function card(p) {
  const el = document.createElement('article')
  el.className = 'glass product'
  el.innerHTML = `
    <a href="product.html?id=${encodeURIComponent(p.id)}" aria-label="${p.title}">
      <div class="img"><img src="${p.image}" alt="${p.title}" loading="lazy" /></div>
      <h3>${p.title}</h3>
      <div class="desc">${p.description}</div>
      <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:8px">
        <span class="chip">${p.family}</span>
        <span class="chip">${p.intensity}</span>
        <span class="chip">${p.mood}</span>
      </div>
      <div class="bottom">
        <div class="price">${fmtMoney(p.price)}</div>
        <span class="small">100 мл • ${p.duration}</span>
      </div>
    </a>
  `
  return el
}

function render() {
  const query = (qEl.value || '').trim().toLowerCase()
  const family = famEl.value

  listEl.innerHTML = ''
  const data = PRODUCTS.filter((p) => matches(p, query, family))

  for (const p of data) listEl.appendChild(card(p))
  emptyEl.style.display = data.length ? 'none' : 'block'
}

qEl.addEventListener('input', render)
famEl.addEventListener('change', render)
render()

window.addEventListener('storage', updateCartBadge)
