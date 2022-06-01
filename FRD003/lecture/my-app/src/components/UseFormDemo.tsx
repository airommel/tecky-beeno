import React, { FormEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'

type FormState = {
  username: ''
  password: ''
}

export function UseFormDemo() {
  const { register, handleSubmit, formState, watch } = useForm<FormState>({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { errors } = formState
  useEffect(() => {
    let sub = watch(data => {
      console.log('watch data:', data)
      console.log('watch errors:', formState.errors)
    })
    return sub.unsubscribe
  }, [])

  // console.log('formState:', formState)

  function submit(data: FormState) {
    console.log('data:', data)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h2>UseForm Demo</h2>

      {/* <div>form state: {JSON.stringify(formState)}</div> */}
      {/* <div>form error: {JSON.stringify(formState.errors)}</div> */}

      <Form.Group>
        <Form.Label htmlFor="username">username</Form.Label>
        <Form.Control
          id="username"
          {...register('username', {
            // required: true,
            // minLength: 3,
            validate: username => {
              console.log('validate username:', username)
              if (username.length < 3) {
                return 'Username should be at least 3 characters'
              }
              return true
            },
          })}
        ></Form.Control>
        <Alert variant="danger" hidden={!errors.username?.message}>
          {errors.username?.message}
        </Alert>
      </Form.Group>

      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            // required: true,
            // minLength: 6,
            validate: password => {
              if (password.length < 6) {
                return 'Password should be at least 6 characters'
              }
              return true
            },
          })}
        ></input>
        <div hidden={!errors.password?.message}>{errors.password?.message}</div>
      </div>

      <div>
        <input type="submit" value="Login"></input>
      </div>
    </form>
  )
}
