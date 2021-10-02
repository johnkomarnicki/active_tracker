<template>
  <div></div>
</template>

<script>
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
