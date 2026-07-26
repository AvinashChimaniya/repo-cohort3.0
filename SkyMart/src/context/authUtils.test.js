import test from 'node:test'
import assert from 'node:assert/strict'

const storage = new Map()
globalThis.localStorage = {
  getItem(key) {
    return storage.has(key) ? storage.get(key) : null
  },
  setItem(key, value) {
    storage.set(key, String(value))
  },
  removeItem(key) {
    storage.delete(key)
  },
  clear() {
    storage.clear()
  },
}

const { registerUser, authenticateUser } = await import('./authUtils.js')

test('registerUser stores a new account and authenticateUser accepts matching credentials', () => {
  localStorage.clear()

  const registration = registerUser({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    password: 'secret123',
  })

  assert.equal(registration.success, true)
  assert.equal(registration.user.email, 'ada@example.com')

  const login = authenticateUser({
    email: 'ada@example.com',
    password: 'secret123',
  })

  assert.equal(login.success, true)
  assert.equal(login.user.name, 'Ada Lovelace')
})

test('authenticateUser rejects invalid password', () => {
  localStorage.clear()

  registerUser({
    name: 'Grace Hopper',
    email: 'grace@example.com',
    password: 'securepw',
  })

  const login = authenticateUser({
    email: 'grace@example.com',
    password: 'wrongpw',
  })

  assert.equal(login.success, false)
  assert.match(login.message, /Invalid email or password/i)
})
