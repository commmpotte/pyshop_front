<template>
  <div class="user-dashboard">
    <h2>Dashboard</h2>
    <div class="user-info">
      <q-input v-model="user.name" label="Name" />
      <q-input v-model="user.email" label="Email" />
      <q-input v-model="user.phone" label="Phone" />
      <q-input v-model="user.address" label="Address" />
      <q-input v-model="user.about" label="About" />
      <div class="button-group">
        <q-btn
          class="button"
          color="primary"
          label="Save"
          @click="saveChanges"
        />
        <q-btn
          class="button"
          color="negative"
          label="Delete"
          @click="deleteAccount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import backendURL from "../../backendConfig.js";

export default {
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    const userId = this.$route.params.id;
    try {
      const response = await axios.get(`${backendURL}/users/${userId}`);
      this.user = response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
  methods: {
    async saveChanges() {
      const userId = this.$route.params.id;
      try {
        await axios.put(`${backendURL}/users/${userId}`, this.user);
        this.$router.push("/users");
        console.log("Changes saved successfully.");
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    },
    async deleteAccount() {
      const userId = this.$route.params.id;
      try {
        await axios.delete(`${backendURL}/users/${userId}`);
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    },
  },
};
</script>

<style scoped>
.user-dashboard {
  text-align: center;
  width: 60%;
  margin: auto;
}

.user-info {
  margin-top: 20px;
}

.button-group {
  margin-top: 20px;
}
.button {
  margin: 10px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
