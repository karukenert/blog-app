<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" v-model="model.title" placeholder="Post title" />
    <textarea v-model="model.body" rows="5" placeholder="Post body" />
    <button type="submit">Create</button>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    model: {
      body: "",
      title: "",
    },
  }),
  methods: {
    ...mapActions(["POST_CREATE"]),
    async handleSubmit() {
      await this.POST_CREATE(this.model);
      this.$router.push({ name: "posts" });
    },
  },
};
</script>
