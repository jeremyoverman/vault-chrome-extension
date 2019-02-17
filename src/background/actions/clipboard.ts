import { Action } from "@actions";

export const copyToClipboard = new Action('copyToClipboard', (text: string, cb) => {
  let textarea = document.createElement('textarea')
  textarea.textContent = text

  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.blur()

  document.body.removeChild(textarea)

  cb()
})