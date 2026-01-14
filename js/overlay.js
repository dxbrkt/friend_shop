import { OZON_SELLER_URL, CONTACT_PHONE } from './products.js'

let mounted = false
let lastFocus = null

function qs(sel, root = document) {
  return root.querySelector(sel)
}

function esc(str) {
  return String(str || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}

function lockScroll(lock) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

function mount() {
  if (mounted) return
  mounted = true

  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="fg-overlay" id="fgOverlay" aria-hidden="true">
      <div class="fg-overlay__backdrop" data-close></div>
      <div class="fg-overlay__panel glass-strong" role="dialog" aria-modal="true" aria-label="Оформление">
        <div class="fg-overlay__header">
          <div>
            <div class="fg-overlay__title" id="fgOverlayTitle">Оформление</div>
            <div class="fg-overlay__sub" id="fgOverlaySub">—</div>
          </div>
          <button class="fg-overlay__close" data-close aria-label="Закрыть">✕</button>
        </div>
        <div class="fg-overlay__body" id="fgOverlayBody"></div>
      </div>
    </div>
  `.trim(),
  )

  const root = qs('#fgOverlay')

  const close = () => {
    root.setAttribute('aria-hidden', 'true')
    root.classList.remove('is-open')
    lockScroll(false)
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus()
  }

  root.addEventListener('click', (e) => {
    const t = e.target
    if (t && t.matches('[data-close]')) close()
  })

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close()
  })
}

function openBase({ title, sub, bodyHtml }) {
  mount()
  const root = qs('#fgOverlay')
  const titleEl = qs('#fgOverlayTitle')
  const subEl = qs('#fgOverlaySub')
  const bodyEl = qs('#fgOverlayBody')

  lastFocus = document.activeElement

  titleEl.textContent = title || 'Оформление'
  subEl.textContent = sub || ''
  bodyEl.innerHTML = bodyHtml

  root.setAttribute('aria-hidden', 'false')
  root.classList.add('is-open')
  lockScroll(true)

  const first = root.querySelector('button, a, input, [tabindex]:not([tabindex="-1"])')
  if (first) first.focus()
}

function openTabs(urls) {
  const unique = Array.from(new Set(urls.filter(Boolean)))
  for (const u of unique) {
    window.open(u, '_blank', 'noopener,noreferrer')
  }
}

async function copyText(text, btn) {
  try {
    await navigator.clipboard.writeText(text)
    if (btn) {
      const prev = btn.textContent
      btn.textContent = 'Скопировано ✓'
      setTimeout(() => (btn.textContent = prev), 1400)
    }
  } catch {
    if (btn) {
      const prev = btn.textContent
      btn.textContent = 'Не удалось скопировать'
      setTimeout(() => (btn.textContent = prev), 1600)
    }
  }
}

export function initOverlay() {
  mount()
}

export function openProductOverlay(product, qty = 1) {
  if (!product) return

  openBase({
    title: 'Купить на Ozon',
    sub: 'Оплата и доставка — на стороне Ozon',
    bodyHtml: `
      <div class="fg-overlay__note">
        <div style="font-weight:800">${esc(product.title)}</div>
        <div class="small" style="margin-top:6px">В Ozon выберите количество: <b>${esc(qty)}</b> шт.</div>
      </div>

      <div class="fg-overlay__actions">
        <a class="btn btn-primary" href="${esc(product.ozonUrl)}" target="_blank" rel="noopener noreferrer">Открыть товар на Ozon</a>
        <a class="btn btn-secondary" href="${esc(OZON_SELLER_URL)}" target="_blank" rel="noopener noreferrer">Магазин Friend Guide на Ozon</a>
      </div>

      <div class="fg-overlay__hr"></div>

      <div class="small">Нужна помощь с выбором? Напишите или позвоните:</div>
      <div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-ghost" href="tel:${CONTACT_PHONE.replace(/\D/g, '')}">${esc(CONTACT_PHONE)}</a>
      </div>
    `.trim(),
  })
}

export function openCartOverlay(items = []) {
  const list = Array.isArray(items) ? items : []
  const urls = list.map((x) => x.ozonUrl).filter(Boolean)
  const lines = list.map((x) => `• ${x.title} × ${x.qty}`).join('\n')

  const rows = list
    .map((x) => {
      const title = esc(x.title)
      const qty = esc(x.qty)
      const url = esc(x.ozonUrl || OZON_SELLER_URL)
      return `
        <div class="fg-overlay__row">
          <div>
            <div style="font-weight:800">${title}</div>
            <div class="small" style="margin-top:4px">В Ozon выбери количество: <b>${qty}</b> шт.</div>
          </div>
          <a class="btn btn-secondary" href="${url}" target="_blank" rel="noopener noreferrer">Открыть</a>
        </div>
      `.trim()
    })
    .join('')

  openBase({
    title: 'Оформить на Ozon',
    sub: 'Ozon не даёт добавлять товары в корзину «по ссылке», поэтому откроем карточки товаров.',
    bodyHtml: `
      <div class="fg-overlay__actions">
        <button class="btn btn-primary" id="fgOpenAll">Открыть все товары</button>
        <button class="btn btn-secondary" id="fgCopyList">Скопировать список</button>
        <a class="btn btn-ghost" href="${esc(OZON_SELLER_URL)}" target="_blank" rel="noopener noreferrer">Открыть магазин на Ozon</a>
      </div>

      <div class="fg-overlay__list">${rows || '<div class="small">Корзина пустая.</div>'}</div>

      <div class="fg-overlay__hr"></div>

      <div class="small">Или же оформите заказ вручную по телефону:</div>
      <div style="margin-top:8px;display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-ghost" href="tel:${CONTACT_PHONE.replace(/\D/g, '')}">${esc(CONTACT_PHONE)}</a>
      </div>
    `.trim(),
  })

  const btnOpenAll = qs('#fgOpenAll')
  const btnCopy = qs('#fgCopyList')

  if (btnOpenAll) btnOpenAll.addEventListener('click', () => openTabs(urls.length ? urls : [OZON_SELLER_URL]))
  if (btnCopy) btnCopy.addEventListener('click', () => copyText(`Заказ Friend Guide:\n${lines}`, btnCopy))
}
