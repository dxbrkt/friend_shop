import { loadCart, getCount } from './cart.js'
import { OZON_SELLER_URL, CONTACT_PHONE } from './products.js'

export function iconSparkles() {
  return `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l1.2 5.1L18 9l-4.8 1.9L12 16l-1.2-5.1L6 9l4.8-1.9L12 2z" stroke="currentColor" stroke-width="1.6" fill="none"/>
    <path d="M19 14l.7 2.2L22 17l-2.3.8L19 20l-.7-2.2L16 17l2.3-.8L19 14z" stroke="currentColor" stroke-width="1.6" fill="none"/>
  </svg>`
}

export function fmtMoney(value) {
  return Number(value || 0).toLocaleString('ru-RU') + ' ₽'
}

export function getParam(name) {
  const url = new URL(window.location.href)
  return url.searchParams.get(name)
}

export function mountLayout({ active = '' } = {}) {
  document.body.insertAdjacentHTML('afterbegin', `<div class="noise"></div>`)

  const header = document.querySelector('[data-header]')
  const footer = document.querySelector('[data-footer]')

  if (header) header.innerHTML = renderHeader(active)
  if (footer) footer.innerHTML = renderFooter()

  updateCartBadge()
}

export function updateCartBadge() {
  const badge = document.querySelector('[data-cart-count]')
  if (!badge) return
  const count = getCount(loadCart())
  badge.textContent = String(count)
}

export function toast(message) {
  const el = document.createElement('div')
  el.className = 'glass'
  el.style.cssText = `position:fixed;left:16px;right:16px;bottom:16px;z-index:80;max-width:560px;margin:0 auto;padding:14px 16px;border-radius:18px;box-shadow:var(--shadow2);transform:translateY(14px);opacity:0;transition:transform .22s ease, opacity .22s ease;`
  el.textContent = message
  document.body.appendChild(el)
  requestAnimationFrame(() => {
    el.style.transform = 'translateY(0)'
    el.style.opacity = '1'
  })
  setTimeout(() => {
    el.style.transform = 'translateY(14px)'
    el.style.opacity = '0'
    setTimeout(() => el.remove(), 260)
  }, 1900)
}

function renderHeader(active) {
  const nav = (href, label, key) => {
    const is = active === key
    return `<a href="${href}" style="color:${is ? 'rgba(255,255,255,.95)' : 'rgba(255,255,255,.70)'}">${label}</a>`
  }

  return `
  <div class="glass-strong">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="На главную">
        <span class="mark" aria-hidden="true">${iconSparkles()}</span>
        <span>
          <div class="brand-title">Friend Guide</div>
          <div class="brand-sub">Home Fragrance</div>
        </span>
      </a>

      <nav class="nav" aria-label="Навигация">
        ${nav('index.html', 'Главная', 'home')}
        ${nav('catalog.html', 'Ароматы', 'catalog')}
        ${nav('index.html#faq', 'Вопросы', 'faq')}
      </nav>

      <div class="header-actions">
        <a class="btn btn-secondary" href="catalog.html">Выбрать аромат</a>
        <a class="btn btn-secondary" href="cart.html" aria-label="Корзина">
          Корзина <span class="cart-badge" data-cart-count>0</span>
        </a>
      </div>
    </div>
  </div>`
}

function renderFooter() {
  const year = new Date().getFullYear()
  return `
  <div class="container footer-inner">
    <div>
      <div style="font-weight:800">Friend Guide</div>
      <div class="small">Аромадиффузоры для дома • минималистичный флакон • стойкое звучание</div>
      <div class="small" style="margin-top:10px;display:flex;flex-wrap:wrap;gap:10px">
        <a href="${OZON_SELLER_URL}" target="_blank" rel="noreferrer" style="color:rgba(255,255,255,.70)">Ozon: Friend Guide Shop</a>
        <span style="opacity:.35">•</span>
        <a href="tel:${CONTACT_PHONE.replace(/\D/g, '')}" style="color:rgba(255,255,255,.70)">${CONTACT_PHONE}</a>
      </div>
    </div>
    <div class="small">© ${year} Friend Guide</div>
  </div>`
}
