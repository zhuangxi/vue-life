import cookie from 'js-cookie'

export function getToken() {
  return cookie.get('token')
}

export function setToken(token) {
  console.log(1)
  return cookie.set('token', token)
}

export function removeToken() {
  return cookie.remove('token')
}
