<template>
  <div>
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Post from "../components/Post.vue";

export default {
  name: "Posts",
  mounted() {
    if (!this.posts.length) this.POSTS_FETCH();
  },
  methods: {
    ...mapActions(["POSTS_FETCH"]),
  },
  computed: {
    ...mapGetters(["posts"]),
  },
  components: {
    Post,
  },
};
</script>
