import React from 'react'
import logo from './logo.svg'
import './App.css'
import { marked } from 'marked'
import sanitizeHTML from 'sanitize-html'

// console.log(sanitizeHTML.defaults)

function App() {
  let list = []
  for (let i = 0; i < 10; i++) {
    list.push(i * 3)
  }
  let name = 'Alice and <b>o</b>'
  let html = marked.parse('# Marked in Node.js\n\nRendered by **marked**.')
  html += "<img src=x onerror=alert('img') />"
  html = sanitizeHTML(html, {
    allowedTags: ['img', ...sanitizeHTML.defaults.allowedTags],
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>name: {name}</p>
        <div>
          <h2>Notes</h2>
          <h3>Code</h3>
          <div>{html}</div>
          <h3>Preview</h3>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
        <div>{list.join(', ')}</div>
        <ul>
          {list.map(item => (
            <li key={item}>
              {item} {item % 2 === 0 ? 'even' : 'odd'}
            </li>
          ))}
        </ul>
        <div>{logo}</div>
        <br/>
        <br></br>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React with Typescript and SCSS
        </a>
      </header>
    </div>
  )
}

export default App
