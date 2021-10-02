<template>
  <header class="bg-at-light-green text-white">
    <nav class="container py-5 px-4 flex flex-col gap-4 items-center sm:flex-row">
      <div class="flex items-center gap-x-4">
        <img class="w-14" src="../assets/images/dumbbell-light.png" alt="" />
        <h1 class="text-lg">Active Tracker</h1>
      </div>
      <ul class="flex flex-1 justify-end gap-x-10">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link v-if="user" :to="{ name: 'Create' }">Create</router-link>
        <li v-if="user" class="cursor-pointer" @click="logout">Logout</li>
        <router-link v-else :to="{ name: 'Login' }">Login</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
import store from "../store/index";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { supabase } from "../supabase/init";

export default {
  setup() {
    const user = computed(() => store.state.user);

    const router = useRouter();
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "Home" });
    };

    return { user, logout };
  },
};
</script>

<style></style>
