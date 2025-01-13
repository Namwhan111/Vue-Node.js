<template>
  <div class="form-input">
    <div>Create Page</div>
    <div class="inputs">
      <p>name</p>
      <input class="input" type="text" v-model="editfrom.Fname" />
      <p>Last Name</p>
      <input class="input" type="text" v-model="editfrom.Lname" />
      <p>Phone</p>
      <input class="input" type="text" v-model="editfrom.Phone" />
      <div class="colunm"></div>
      <input
        type="file"
        @change="onFileChanged($event)"
        accept="image/*"
        capture
      />
      <img
        :src="preview_img"
        alt="Selected Image"
        v-if="preview_img"
        width="100"
      />
    </div>
    <button @click="editData()" type="submit" class="submit">Submit</button>
  </div>
</template>
<script>
// import router from '@/router';
import router from "@/router";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  name: "Edit",
  data() {
    return {
      fetchData: {},
      editfrom: {},
      preview_img: "",
    };
  },

  created() {
    this.fecthData();
  },
  methods: {
    fecthData() {
      const router = useRoute();
      axios({
        method: "get",
        url: `${import.meta.env.VITE_API}/student/${router.params.id}`,
        data: {},
      })
        .then((res) => {
          this.fetchData = res.data;
          this.editfrom = { ...this.fetchData };
          this.preview_img = this.fetchData.Profile;
          console.log(this.fetchData);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editData() {
      const id = this.fetchData.id;
      const fromData = new FormData();
      fromData.append("Fname", this.editfrom.Fname);
      fromData.append("Lname", this.editfrom.Lname);
      fromData.append("Phone", this.editfrom.Phone);
      fromData.append("Profile", this.editfrom.Profile);
      axios({
        method: "put",
        url: `${import.meta.env.VITE_API}/student/${id}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: fromData,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          router.push("/about");
        }
      });
    },

    onFileChanged(e) {
      const files = e.target.files;
      if (files.length > 0) {
        const selectFile = files[0];
        this.editfrom.Profile = selectFile;
        this.preview_img = URL.createObjectURL(selectFile);
      }
    },
  },
};
</script>
<style scoped>
.form-input {
  width: 40%;
  height: 400px;
  background: #505050;
  padding: 40px;
  position: relative;
  color: white;
  border-radius: 4px;
}
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 30px;
}
input {
  width: 200px;
  height: 30px;
  border-radius: 4px;
}

.submit {
  position: absolute;
  right: 60px;
  bottom: 60px;
  width: 100px;
  height: 40px;
}

.colunm {
  display: flex;
  justify-content: space-between;
}
</style>
