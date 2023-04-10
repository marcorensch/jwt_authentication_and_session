<template>

  <form>
    <input type="text" name="email" placeholder="Username" v-model="username" />
    <input type="password" name="password" placeholder="Password" v-model="password" />
    <button type="submit" @click="submitForm">Login</button>
  </form>
  <button @click="handleLogoutClicked">Logout</button>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      host: "https://localhost:8080",
      username: "",
      password: ""
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
        if(response.data.success) {
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
    }
  }
}
</script>

<style scoped>

</style>