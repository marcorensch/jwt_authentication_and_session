<template>

  <form>
    <input type="text" name="email" placeholder="Username" v-model="username" />
    <input type="password" name="password" placeholder="Password" v-model="password" />
    <button type="submit" @click="submitForm">Login</button>
  </form>
  <button @click="handleGetItemsClicked">Get Items</button>
  <button @click="handleLogoutClicked">Logout</button>

  <div v-if="items.length">
    <h3>Items</h3>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      host: "https://localhost:8080",
      username: "",
      password: "",
      items: []
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      axios.post("/api/login", {
        username: this.username,
        password: this.password
      }).then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("success");
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    handleLogoutClicked() {
      axios.get("/api/logout").then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
    handleGetItemsClicked() {
      axios.get("/api/items").then((response) => {
        console.log(response);
        this.items = response.data.items;
      }).catch((error) => {
        this.items = [];
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>

</style>