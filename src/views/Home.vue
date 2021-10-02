<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <!-- No Data -->
    <div class="w-full flex flex-col items-center" v-if="data.length === 0">
      <h1 class="text-2xl">Looks empty here....</h1>
      <router-link
        class="mt-4 text-sm text-white bg-at-light-green py-2 px-6 rounded-sm border-solid border-2 border-transparent duration-200 hover:border-at-light-green hover:bg-white hover:text-at-light-green"
        :to="{ name: 'Create' }"
        >Create Workout</router-link
      >
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        v-for="(exercise, index) in data"
        :key="index"
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer"
        :to="{ name: 'view-exercise', params: { id: exercise.id } }"
      >
        <!-- Cardio -->
        <img
          v-if="exercise.workoutType === 'cardio'"
          class="h-24 w-auto"
          src="@/assets/images/running-light-green.png"
          alt=""
        />

        <!-- Strength Training -->
        <img
          v-else
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-light-green.png"
          alt=""
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green rounded-lg shadow-md"
        >
          {{ exercise.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
          {{ exercise.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { supabase } from "../supabase/init";
import { ref } from "vue";
export default {
  name: "Home",
  components: {},
  setup() {
    const data = ref([]);
    const dataLoaded = ref(null);
    const getData = async () => {
      try {
        let { data: workouts, error } = await supabase.from("workouts").select("*");
        if (error) throw error;
        data.value = workouts;
        dataLoaded.value = true;
      } catch (error) {
        console.warn(error.message);
      }
    };

    getData();

    return { getData, data, dataLoaded };
  },
};
</script>
