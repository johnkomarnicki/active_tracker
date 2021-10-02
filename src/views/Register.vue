<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <form
      @submit.prevent="login"
      class="p-8 flex flex-col bg-light-grey rounded-lg shadow-lg"
    >
      <h1 class="text-3xl text-at-light-green mb-4 ">Register</h1>
      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-light-green">Email</label>
        <input
          required
          class="p-2 text-gray-500 focus:outline-none"
          type="text"
          id="email"
          v-model="email"
        />
      </div>
      <div class="flex flex-col mb-2">
        <label for="password" class="mb-1 text-sm text-at-light-green">Password</label>
        <input
          required
          class="p-2 text-gray-500 focus:outline-none"
          type="text"
          id="password"
          v-model="password"
        />
      </div>
      <div class="flex flex-col">
        <label for="confirm-password" class="mb-1 text-sm text-at-light-green"
          >Confirm Password</label
        >
        <input
          required
          class="p-2 text-gray-500 focus:outline-none"
          type="text"
          id="confirm-password"
          v-model="confirmPassword"
        />
      </div>
      <button
        type="submit"
        class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-white hover:bg-white hover:text-at-light-green"
      >
        Register
      </button>
      <router-link class="text-sm mt-6 text-center" :to="{ name: 'Login' }"
        >Already have an account?
        <span class="text-at-light-green">Login</span></router-link
      >
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../supabase/init";
export default {
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);

    const login = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if (error) throw error;
          router.push({ name: "Home" });
        } catch (error) {
          console.warn(error.message);
        }
      }
    };

    return { email, password, confirmPassword, login };
  },
};
</script>
