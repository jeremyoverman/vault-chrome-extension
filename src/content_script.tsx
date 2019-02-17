import { h, render } from 'preact';
import { ContextIcon } from './contentscript/ContextIcon/ContextIcon';

function getLoginInputs () {
  let username = document.querySelector('input[name=username]');
  let password = document.querySelector('input[name=password]')

  return { username, password }
}

function injectVaultIcon (el: Element) {
  let bbox = el.getBoundingClientRect()

  let contextEl = document.createElement('div')
  document.body.append(contextEl)

  render(<ContextIcon bbox={bbox}/>, contextEl)
}

function pollForLogin () {
  let { username, password } = getLoginInputs()

  if (username) {
    injectVaultIcon(username)
  }

  if (password) {
    injectVaultIcon(password)
  }

  if (!username && !password) {
    setTimeout(pollForLogin, 1000)
  }
}

pollForLogin()