import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import CreatePost from "../views/CreatePost.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "posts",
    component: Posts,
  },
  {
    path: "/create",
    name: "create",
    component: CreatePost,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
