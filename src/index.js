import React from 'react'
import { render } from 'react-dom'
import store, { history } from './store'
import Root from './Root';

const target = document.querySelector('#root');

render(
  <Root store={store} history={history} />,
  target
)

