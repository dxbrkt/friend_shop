import { PRODUCTS, OZON_SELLER_URL } from './products.js'
import { mountLayout, fmtMoney, updateCartBadge } from './ui.js'
import { initOverlay } from './overlay.js'

mountLayout({ active: 'home' })
initOverlay()


for (const a of document.querySelectorAll('[data-ozon]')) {
  a.href = OZON_SELLER_URL
  a.target = '_blank'
  a.rel = 'noreferrer'
}


const featured = PRODUCTS[0]
if (featured) {
  const priceEl = document.getElementById('featured-price')
  const titleEl = document.getElementById('featured-title')
  const descEl = document.getElementById('featured-desc')
  const imgEl = document.getElementById('featured-image')
  const moreEl = document.getElementById('featured-more')

  if (priceEl) priceEl.textContent = fmtMoney(featured.price)
  if (titleEl) titleEl.textContent = featured.title
  if (descEl) descEl.textContent = featured.description
  if (imgEl) imgEl.src = featured.image
  if (moreEl) moreEl.href = `product.html?id=${encodeURIComponent(featured.id)}`
}

window.addEventListener('storage', updateCartBadge)
