import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../interceptor'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    _myData: false,
    posts: [],
    post: {},
    paginationCount: 1
  },
  mutations: {
    set_myData (state, payload) {
      state._myData = payload
    },
    loadPosts (state, payload) {
      state.posts = payload.data.results
      state.paginationCount = Math.ceil(payload.data.count / 6)
    },
    loadPost (state, payload) {
      state.post = payload
    }
  },
  actions: {
    async  FETCH_POSTS_FROM_API ({ commit }, currentPage) {
      try {
        const postsApi = await Axios.get(`/posts/?page=${currentPage}`)
        commit('loadPosts', postsApi)
        commit('set_myData', true)
      } catch (e) {
      }
    },
    async FETCH_POST_FROM_API ({ commit }, id) {
      try {
        await Axios.get(`/post-ops/${id}`).then(response => {
          commit('loadPost', response.data)
        })
      } catch (e) {
      }
    }
  }
}
