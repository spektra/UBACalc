const STORAGE_KEY = 'uba_errors'
const MAX_STORED = 50

interface StoredError {
  msg: string
  url?: string
  line?: number
  col?: number
  stack?: string
  time: string
}

function store(err: StoredError) {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredError[]
    stored.push(err)
    if (stored.length > MAX_STORED) stored.splice(0, stored.length - MAX_STORED)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
  } catch {
    // storage full or unavailable — silently drop
  }
}

export function initErrorReporter() {
  window.onerror = (msg, url, line, col, err) => {
    const entry: StoredError = {
      msg: String(msg),
      url,
      line,
      col,
      stack: err?.stack,
      time: new Date().toISOString(),
    }
    store(entry)
    console.error('[UBACalc Error]', msg, err)
  }

  window.onunhandledrejection = (e) => {
    const entry: StoredError = {
      msg: String(e.reason),
      stack: e.reason?.stack,
      time: new Date().toISOString(),
    }
    store(entry)
    console.error('[UBACalc Unhandled Promise]', e.reason)
  }
}

export function getStoredErrors(): StoredError[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function clearStoredErrors() {
  localStorage.removeItem(STORAGE_KEY)
}
