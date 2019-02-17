import { h, render } from 'preact';
import './popup.scss';
import { Provider } from 'mobx-preact';

import { App } from '@components/App';
import { stores } from '@stores';

window.onload = async () => {
  stores.session.update()

  let root = document.getElementById('root');

  if (root) {
    render(
      <Provider {...stores}>
        <App />
      </Provider>,
      root
    )
  }
}