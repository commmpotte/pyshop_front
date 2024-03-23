<template>
  <div class="q-pa-md">
    <q-page class="flex flex-center">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6 q-mb-md">Login</div>
          <q-input v-model="email" label="Email" />
          <q-input v-model="password" label="Password" type="password" />
          <div class="flex justify-between items-center">
            <q-btn
              class="q-mt-md"
              color="primary"
              label="Login"
              @click="login"
            />

            <q-btn
              class="q-mt-md"
              flat
              color="primary"
              label="Sign up"
              @click="goToRegisterPage"
            />
          </div>
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
import { useRouter } from "vue-router";
import backendURL from "../../backendConfig.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${backendURL}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        const token = response.data.token;
        console.log("Logged in successfully. Token:", token);
        localStorage.setItem("token", token);
        const userId = response.data.userId;
         console.log("Current user ID:", userId);
        localStorage.setItem("userId", userId);
        this.$router.push("/users");
      } catch (error) {
        console.error("Login failed:", error);
        this.error = "Login failed. Please check your credentials.";
      }
    },
    goToRegisterPage() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
</style>
