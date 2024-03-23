<template>
  <div class="members-list">
  
    <div class="header">
    <h2>Members List</h2>
      <div class="actions">
        <q-btn
          flat
          label="Dashboard"
          @click="goToDashboard()"
          class="dashboard-btn"
          color="blue"
        />
        <q-btn
          flat
          label="Logout"
          @click="logout"
          class="logout-btn"
          color="red"
        />
      </div>
    </div>
    <div v-for="user in users" :key="user.id" class="user-card">
      <div class="user-info">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Address:</strong> {{ user.address }}</p>
        <p><strong>About:</strong> {{ user.about }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import backendURL from "../../backendConfig.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      users: [],
      currentUserId: localStorage.getItem("userId"),
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const token = localStorage.getItem("token");
      if (!token) {
        const router = useRouter();
        router.push("/");
        return;
      }
      axios
        .get(`${backendURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/");
    },
    goToDashboard() {
      if (this.currentUserId) {
        this.$router.push(`/users/${this.currentUserId}`);
      } else {
        console.error("Current user ID is not available.");
      }
    },
  },
};
</script>

<style scoped>
.members-list {

  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-card {
  margin-top: 20px;
}

.user-info {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  font-size: 24px;
  margin: 0;
}

.actions {
  display: flex;
}

.logout-btn {
  margin-left: 10px;
}

.dashboard-btn {
  margin-left: 10px;
}
</style>
