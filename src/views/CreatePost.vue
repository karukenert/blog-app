<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="model.title" placeholder="Post title" />
    <textarea v-model="model.body" rows="5" placeholder="Post body" />
    <button type="submit">
      <template v-if="isEdit">Update</template>
      <template v-else>Create</template>
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    model: {
      body: "",
      title: "",
    },
  }),

  methods: {
    ...mapActions(["POSTS_FETCH", "POST_CREATE", "POST_UPDATE"]),
    async handlaInputsFill() {
      let posts = this.posts;

      if (!posts.length) {
        posts = await this.POSTS_FETCH();
      }

      if (this.isEdit) {
        const post = posts.find((p) => p.id === Number(this.$route.params.id));
        this.model = {
          id: post.id,
          title: post.title,
          body: post.body,
        };
      }
    },
    async handleSubmit() {
      const promise = this.isEdit ? this.POST_UPDATE : this.POST_CREATE;

      await promise(this.model);
      this.$router.push({ name: "posts" });
    },
  },
  computed: {
    ...mapGetters(["posts"]),
    isEdit() {
      return !!this.$route.params.id;
    },
  },
  mounted() {
    this.handlaInputsFill();
  },
  watch: {
    $route() {
      this.handleInputsFill();
    },
  },
};
</script>
