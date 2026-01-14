const KEY = 'fg_cart_v2'

export function loadCart() {
  try {
    const raw = localStorage.getItem(KEY)
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    
  }
}

export function getCount(items) {
  return items.reduce((s, x) => s + (x.qty || 0), 0)
}

export function getTotal(items) {
  return items.reduce((s, x) => s + (x.qty || 0) * (x.price || 0), 0)
}

export function addToCart(product, qty = 1) {
  const items = loadCart()
  const existing = items.find((x) => x.id === product.id)
  if (existing) existing.qty += qty
  else items.push({ id: product.id, title: product.title, price: product.price, qty })
  saveCart(items)
  return items
}

export function setQty(id, qty) {
  const q = Math.max(1, Math.min(99, Number(qty) || 1))
  const items = loadCart().map((x) => (x.id === id ? { ...x, qty: q } : x))
  saveCart(items)
  return items
}

export function removeFromCart(id) {
  const items = loadCart().filter((x) => x.id !== id)
  saveCart(items)
  return items
}

export function clearCart() {
  saveCart([])
  return []
}
