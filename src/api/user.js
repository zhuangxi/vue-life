import axios from '@/utils/axios'

export function login(data) {
  return axios({
    url: '/user/login',
    method: 'post',
    data
  })
}
