import { useState } from 'react'
import useStorageState from 'react-use-storage-state'

const en = {
  login: 'Login',
  forget_password: 'Forget Password',
  setting: 'Settings',
  logout: 'Logout',
}
const zh = {
  login: '登入',
  forget_password: '忘記密碼',
  setting: '設定',
  logout: '登出',
}
const langs = { en, zh }

function getDefaultLang() {
  let lang = navigator.language
  if (lang.includes('en')) {
    return 'en'
  }
  return 'zh'
}

export function useLangDict() {
  const [lang, setLang] = useStorageState('lang', getDefaultLang)
  const dict = langs[lang as keyof typeof langs]
  return { dict, setLang }
}

export function LoginPage() {
  const { dict } = useLangDict()
  return (
    <fieldset>
      <legend>{dict.login}</legend>
      <div>
        <button>{dict.login}</button>
        <button>{dict.forget_password}</button>
      </div>
    </fieldset>
  )
}
export function SettingsPage() {
  const { dict } = useLangDict()
  return (
    <fieldset>
      <legend>{dict.setting}</legend>
      <div>
        <button>{dict.logout}</button>
      </div>
    </fieldset>
  )
}

const App = () => {
  const { setLang } = useLangDict()
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <p>i18n</p>
      <div>
        <button onClick={() => setLang('en')}>En</button>
        <button onClick={() => setLang('zh')}>Zh</button>
      </div>
      <button onClick={() => setCount(count + 1)}>other state: {count}</button>
      <LoginPage />
      <SettingsPage />
    </div>
  )
}
export default App
