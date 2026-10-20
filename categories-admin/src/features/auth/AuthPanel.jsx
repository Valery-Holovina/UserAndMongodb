
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from './authSlice'

export default function AuthPanel() {
  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.auth)

  const [mode, setMode] = useState('login')
  const [validationError, setValidationError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }))

    setValidationError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.password.length < 6) {
      setValidationError(
        'Пароль має містити щонайменше 6 символів.'
      )
      return
    }

    if (
      mode === 'register' &&
      form.password !== form.confirmPassword
    ) {
      setValidationError('Паролі не збігаються.')
      return
    }

    const credentials = {
      email: form.email.trim(),
      password: form.password
    }

    dispatch(
      mode === 'login'
        ? loginUser(credentials)
        : registerUser(credentials)
    )
  }

  return (
    <section>
      <h2>
        {mode === 'login' ? 'Увійти' : 'Реєстрація'}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        {mode === 'register' && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Підтвердіть пароль"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        {validationError && <p>{validationError}</p>}
        {error && <p>{error}</p>}

        <button
          disabled={status === 'loading'}
          type="submit"
        >
          {status === 'loading'
            ? 'Зачекайте…'
            : mode === 'login'
              ? 'Увійти'
              : 'Зареєструватися'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === 'login' ? 'register' : 'login')
          setValidationError('')
        }}
      >
        {mode === 'login'
          ? 'Створити акаунт'
          : 'Вже є акаунт? Увійти'}
      </button>
    </section>
  )
}

