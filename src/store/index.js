import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    POSTS_SET(state, data) {
      state.posts = data;
    },
    POST_ADD(state, data) {
      state.posts.unshift(data);
    },
    POST_REMOVE(state, id) {
      state.posts = state.posts.filter(p => p.id !== id);
    }
  },
  actions: {
    async POSTS_FETCH(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = response.data.slice(0, 20);
      context.commit("POSTS_SET", posts);
      return posts;
    },
    async POST_CREATE(context, data) {
      const response =
        await axios.post(
          "https://jsonplaceholder.typicode.com/posts", data
        );
      context.commit("POST_ADD", response.data);
    },
    async POST_DELETE(context, id) {
      await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/" + id
      );
      context.commit("POST_REMOVE", id);
    },


  },
  getters: {
    posts(state) {
      return state.posts;
    },
  },
  modules: {},
});
