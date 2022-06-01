import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Data from './components/Data'
import { Data1 } from './components/Data1'
import { FCDemo } from './components/FCDemo'
import { ClassDemo } from './components/ClassDemo';

ReactDOM.render(
  <React.StrictMode>
    <FCDemo style={{ margin: '1em' }} />
    <ClassDemo style={{ margin: '1em' }} />
    <App />
    <Data />
    <Data1 />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
