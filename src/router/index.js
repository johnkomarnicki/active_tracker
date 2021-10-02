import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewExercise from "../views/ViewExercise.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
      title: "Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      auth: false,
    },
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta: {
      auth: true,
      title: "Create",
    },
  },
  {
    path: "/view-exercise/:id",
    name: "view-exercise",
    component: ViewExercise,
    meta: {
      auth: false,
      title: "View Workout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "Login" });
    return;
  }
  next();
});

export default router;
