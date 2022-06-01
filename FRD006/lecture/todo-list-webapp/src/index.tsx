import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ReduxRouter } from '@lagunovsky/redux-react-router'
import { history } from './redux/history';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxRouter store={store} history={history}>
        <App />
      </ReduxRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
