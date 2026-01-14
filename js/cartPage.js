import { PRODUCTS, OZON_SELLER_URL } from './products.js'
import { loadCart, getCount, getTotal, setQty, removeFromCart, clearCart } from './cart.js'
import { mountLayout, fmtMoney, toast, updateCartBadge } from './ui.js'
import { initOverlay, openCartOverlay } from './overlay.js'

mountLayout({ active: 'catalog' })
initOverlay()

// общий Ozon-канал (если ссылки нужны где-то ещё)
for (const a of document.querySelectorAll('[data-ozon]')) {
  a.href = OZON_SELLER_URL
  a.target = '_blank'
  a.rel = 'noreferrer'
}

const emptyEl = document.getElementById('empty')
const gridEl = document.getElementById('grid')
const itemsEl = document.getElementById('items')
const totalEl = document.getElementById('total')
const orderEl = document.getElementById('order')
const clearBtn = document.getElementById('clear')
const copyBtn = document.getElementById('copy')

const buyLink = document.querySelector('[data-ozon]')
if (buyLink) {
  buyLink.addEventListener('click', (e) => {
    e.preventDefault()
    const items = loadCart().map((it) => {
      const p = productById(it.id)
      return { ...it, ozonUrl: p ? p.ozonUrl : OZON_SELLER_URL }
    })
    openCartOverlay(items)
  })
}

function productById(id) {
  return PRODUCTS.find((p) => p.id === id)
}

function orderText(items) {
  if (!items.length) return ''
  const lines = items.map((x) => `• ${x.title} × ${x.qty}`)
  return `Заказ Friend Guide:\n${lines.join('\n')}\n\nИтого: ${fmtMoney(getTotal(items))}`
}

function row(item) {
  const p = productById(item.id)
  const el = document.createElement('div')
  el.className = 'cart-row'
  el.innerHTML = `
    <div class="thumb">${p ? `<img src="${p.image}" alt="${item.title}" />` : ''}</div>
    <div style="flex:1">
      <div style="display:flex;align-items:start;justify-content:space-between;gap:12px">
        <div>
          <div style="font-weight:800">${item.title}</div>
          <div class="small" style="margin-top:4px">${fmtMoney(item.price)} за шт.</div>
        </div>
        <button class="btn btn-ghost" data-remove style="padding:10px 14px">Убрать</button>
      </div>

      <div style="margin-top:10px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px">
        <div class="qty">
          <button data-dec aria-label="Уменьшить">−</button>
          <span data-qty>${item.qty}</span>
          <button data-inc aria-label="Увеличить">+</button>
        </div>
        <div style="font-weight:900">${fmtMoney(item.qty * item.price)}</div>
      </div>
    </div>
  `

  el.querySelector('[data-dec]').addEventListener('click', () => {
    render(setQty(item.id, Math.max(1, item.qty - 1)))
  })
  el.querySelector('[data-inc]').addEventListener('click', () => {
    render(setQty(item.id, Math.min(99, item.qty + 1)))
  })
  el.querySelector('[data-remove]').addEventListener('click', () => {
    render(removeFromCart(item.id))
  })

  return el
}

function render(items = loadCart()) {
  const count = getCount(items)
  const total = getTotal(items)

  
  const badge = document.querySelector('[data-cart-count]')
  if (badge) badge.textContent = String(count)
  updateCartBadge()

  if (!items.length) {
    emptyEl.style.display = 'block'
    gridEl.style.display = 'none'
    return
  }

  emptyEl.style.display = 'none'
  gridEl.style.display = 'grid'

  itemsEl.innerHTML = ''
  for (const it of items) itemsEl.appendChild(row(it))

  totalEl.textContent = fmtMoney(total)
  orderEl.textContent = orderText(items)
}

clearBtn.addEventListener('click', () => {
  render(clearCart())
  toast('Корзина очищена')
})

copyBtn.addEventListener('click', async () => {
  const txt = orderEl.textContent || ''
  try {
    await navigator.clipboard.writeText(txt)
    toast('Скопировано ✓')
  } catch {
    toast('Не удалось скопировать (разреши доступ к буферу)')
  }
})

render()
window.addEventListener('storage', () => render())
