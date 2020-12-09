const { setToken } = require('../../utils/cookie')
const state = {
  token: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  setToken({ commit }, token) {
    console.log(token)
    commit('SET_TOKEN', token)
    setToken(token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
