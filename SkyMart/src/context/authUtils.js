const USERS_STORAGE_KEY = 'skymart_users'

function readUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function registerUser(userData) {
  const users = readUsers()
  const normalizedEmail = normalizeEmail(userData.email)

  if (!normalizedEmail) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  const alreadyExists = users.some((user) => normalizeEmail(user.email) === normalizedEmail)
  if (alreadyExists) {
    return { success: false, message: 'An account with this email already exists.' }
  }

  const newUser = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name: userData.name || 'SkyMart User',
    email: normalizedEmail,
    password: userData.password || '',
  }

  users.push(newUser)
  writeUsers(users)

  return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } }
}

export function authenticateUser({ email, password }) {
  const users = readUsers()
  const normalizedEmail = normalizeEmail(email)

  const user = users.find((entry) => normalizeEmail(entry.email) === normalizedEmail)

  if (!user || user.password !== String(password || '')) {
    return { success: false, message: 'Invalid email or password.' }
  }

  return {
    success: true,
    user: { id: user.id, name: user.name, email: user.email },
  }
}
