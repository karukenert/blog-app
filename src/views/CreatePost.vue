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
  mounted() {
    this.handlaInputsFill();
  },
  methods: {
    ...mapActions(["POSTS_FETCH", "POST_CREATE"]),
    async handleSubmit() {
      await this.POST_CREATE(this.model);
      this.$router.push({ name: "posts" });
    },
    async handlaInputsFill() {
      let posts = this.posts;

      if (!this.posts.length) {
        posts = await this.POSTS_FETCH();
      }

      if (this.isEdit) {
        const post = posts.find((p) => p.id === Number(this.$route.params.id));
        this.model = { title: post.title, body: post.body };
      }
    },
  },
  computed: {
    ...mapGetters(["posts"]),
    isEdit() {
      return !!this.$route.params.id;
    },
  },
};
</script>
