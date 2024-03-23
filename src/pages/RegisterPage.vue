<template>
  <div class="q-pa-md">
    <q-page class="flex flex-center">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6 q-mb-md">Register</div>
          <q-input v-model="userData.email" label="Email" />
          <q-input
            v-model="userData.password"
            label="Password"
            type="password"
          />
          <q-input v-model="userData.name" label="Name" />
          <q-input v-model="userData.phone" label="Phone" />
          <q-input v-model="userData.address" label="Address" />
          <q-input v-model="userData.about" label="About" />
          <q-btn
            class="q-mt-md"
            color="primary"
            label="Register"
            @click="register"
          />
        </q-card-section>
        <q-card-section v-if="error" class="text-red q-mt-sm">
          {{ error }}
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import backendURL from "../../backendConfig.js";

export default {
  data() {
    return {
      userData: {
        email: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        about: "",
      },
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post(
          `${backendURL}/auth/register`,
          this.userData
        );
        const token = response.data.token;
        console.log("Registered successfully");
        this.$router.push("/");
      } catch (error) {
        console.error("Registration failed:", error);
        this.error = "Registration failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
</style>
