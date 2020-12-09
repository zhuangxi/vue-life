import axios from '@/utils/axios'

export function getSpendList(data) {
  return axios({
    url: 'spend/getAllPage',
    method: 'get',
    params: data
  })
}

export function getAllSpendList() {
  return axios({
    url: 'spend/getAll',
    method: 'get'
  })
}

export function createSpend(data) {
  return axios({
    url: 'spend/addOne',
    method: 'post',
    data
  })
}
export function modifySpend(data) {
  return axios({
    url: 'spend/modifyOne',
    method: 'post',
    data
  })
}
export function deleteSpend(data) {
  return axios({
    url: 'spend/deleteOne',
    method: 'post',
    data
  })
}
