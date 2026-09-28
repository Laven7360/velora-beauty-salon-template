// Native showModal supplies the focus boundary and makes the background inert.
export function openStyleDialog(dialog, heading, ownerDocument = document) {
  const trigger = ownerDocument.activeElement
  const previousOverflow = ownerDocument.body.style.overflow
  dialog.showModal()
  ownerDocument.body.style.overflow = 'hidden'
  heading?.focus({ preventScroll: true })
  return () => {
    if (dialog.open) dialog.close()
    ownerDocument.body.style.overflow = previousOverflow
    if (trigger?.isConnected) trigger.focus({ preventScroll: true })
  }
}

