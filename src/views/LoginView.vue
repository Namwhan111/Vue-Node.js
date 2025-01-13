<template>
  <a-row justify="center" align="middle">
    <a-col :span="24">
      <a-card title="Login" bordered>
        <a-form :form="form" layout="vertical" @submit.prevent="login">
          <!-- Username -->
          <a-form-item label="Username">
            <a-input
              v-model:value="formValues.username"
              placeholder="Enter your username"
              :allow-clear="true"
            />
          </a-form-item>

          <!-- Password -->
          <a-form-item label="Password">
            <a-input-password
              v-model:value="formValues.password"
              placeholder="Enter your password"
            />
          </a-form-item>

          <!-- Submit Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" block> Login </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  data() {
    return {
      formValues: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API}/login`, {
          username: this.formValues.username, // ใช้ข้อมูลจาก formValues
        password: this.formValues.password,
        });
        const token = response.data.token;
        // Save token to localStorage
        localStorage.setItem("authtoken", token);
        router.push("/");
        window.location.reload();
        // Redirect or do something else after successful login
      } catch (error) {
        console.error(error);
        // Handle login error
      }
    },
  },
};
</script>
