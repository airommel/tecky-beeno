import React, { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormState = {
  username: ''
  password: ''
}

export function FormDemo() {
  const [state, setState] = useState<FormState>({
    username: '',
    password: '',
  })

	function handleSubmit(fn:(data:any)=>void){
		return (event:FormEvent) => {
			event.preventDefault()
			let data = {}
			fn(data)
		}
	}

  function submit(event: React.FormEvent) {
    event.preventDefault()
    let form: any = event.currentTarget
    setState({
      username: form.username.value,
      password: form.password.value,
    })
  }
  // function submit2(event: FormEvent) {
  //   event.preventDefault()
  // }

  return (
    <form onSubmit={submit}>
      <h2>Form Demo</h2>

      <div>state: {JSON.stringify(state)}</div>

      <div>
        <label htmlFor="username">username</label>
        <input id="username" name="username"></input>
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="password" name="password"></input>
      </div>

      <div>
        <input type="submit" value="Login"></input>
      </div>
    </form>
  )
}
