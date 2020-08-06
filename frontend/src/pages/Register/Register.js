import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result)
    },
    variables: values
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('object')
    addUser
  }

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Input type='text' label='Username' name='username' value={values.username} onChange={onChange} />
        <Form.Input type='email' label='Email' name='email' value={values.email} onChange={onChange} />
        <Form.Input type='password' label='Password' name='password' value={values.password} onChange={onChange} />
        <Form.Input type='password' label='Confirm Password' name='passwordConfirmation' value={values.passwordConfirmation} onChange={onChange} />
        <Button type='submit' primary>Register</Button>
      </Form>
    </div>
  )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id email username createdAt token
    }
  }
`
