import { ref, readonly } from 'vue'

const toasts = ref([])
let idCounter = 0

export function useToast() {
  const add = (message, type = 'info', duration = 3500, onClick = null) => {
    const id = ++idCounter
    toasts.value.push({ id, message, type, duration, onClick })
    setTimeout(() => {
      remove(id)
    }, duration)
    return id
  }

  const onClick = (id) => {
    const toast = toasts.value.find(t => t.id === id)
    if (toast?.onClick) {
      toast.onClick()
    }
    remove(id)
  }

  const remove = (id) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  const info = (msg, dur) => add(msg, 'info', dur)
  const success = (msg, dur) => add(msg, 'success', dur)
  const error = (msg, dur) => add(msg, 'error', dur)
  const warning = (msg, dur) => add(msg, 'warning', dur)

  return {
    toasts: readonly(toasts),
    add,
    info,
    success,
    error,
    warning,
    remove,
    onClick,
  }
}