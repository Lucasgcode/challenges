import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = () => ({
  user: {
    login: null,
    info: null
  },
})

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
