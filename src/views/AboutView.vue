<script>
import axios from "axios";
// import Modalimg from "./Modal_img.vue";
import router from "@/router";
import { FileAddOutlined } from '@ant-design/icons-vue';
export default {
  name: "about",
  // components: {
  //   Modalimg,
  // },
  data() {
    return {
      fetch: [],
      selectedFile: null,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "product_type",
          dataIndex: "product_type",
          key: "product_type",
        },
        {
          title: "description",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "createdAt",
          dataIndex: "createdAt",
          key: "createdAt",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
        },
      ],
      filters: [], // เก็บค่าที่ถูกเลือกจาก CheckBox หลายๆตัว
      // Popupimg:false,
      // dataimg:'',
    };
  },
  created() {
    this.fetchData();
    console.log();
  },
  methods: {
    async downloadExcel() {
      try {
        const type = this.filters.join(","); // รวมค่าที่ถูกเลือกเป็นสตริงเดียว

        const response = await fetch(
          `http://localhost:3000/api/export?product_type=${type}`
        );
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users_data.xlsx";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Error downloading the Excel file", error);
      }
    },

    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async importFile() {
      if (!this.selectedFile) {
        alert("Please select a file first");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        // const response = await fetch('http://localhost:3000/api/import', {
        //   method: 'POST',
        //   body: formData,
        // });
        await axios({
          method: "get",
          url: "http://localhost:3000/api/import",
          data: { data },
        })
          .then((response) => console.log(response))

          .catch((error) => console.log(error));

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        alert("File imported successfully");
      } catch (error) {
        console.error("Error importing file:", error);
        alert("Error importing file");
      }
    },
    // isModal (item) {
    //   this.dataimg = item
    //   console.log("🚀 ~ isModal ~ item:", item)
    //   this.Popupimg = true
    // },
    // isclose() {
    //   this.Popupimg = false
    // },

    // getImageUrl(profilePath) {
    //   return `${import.meta.env.VITE_BASE_URL}/${profilePath}`; // Assuming VITE_BASE_URL is your base URL
    // },

    fetchData() {
      const token = localStorage.getItem("authtoken");
      this.loading = true; // Set loading to true to show loading spinner
      axios({
        method: "get",
        url: `http://localhost:3000/api/product`,
        headers: {
          "Content-Type": "application/json",
          authtoken: token,
        },
      })
        .then((res) => {
          this.fetch = res.data;
          this.loading = false; // Set loading to false after data is fetched
          console.log(this.fetch);
        })
        .catch((err) => {
          this.loading = false; // Handle error case
          console.error("Error fetching products:", err);
        });
    },

    deletedata(id) {
      const token = localStorage.getItem("authtoken");
      axios({
        method: "delete",
        url: "http://localhost:3000/api/product/" + id,
        headers: { authtoken: token },
        data: id,
      })
        .then((res) => {
          if (res.status == 200) {
            this.fetchData();
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout() {
      localStorage.removeItem("authtoken");
      router.push("/login");
    },
  },
};
</script>

<template>
  <!-- <router-link :to="`/edit/${user.id}`">
        <div class="pad">
          <button class="button-edit">Edit</button>
        </div>
      </router-link> -->
  <a-row>
    <a-col>
      <router-link to="/create">
        <FileAddOutlined />
        <a-button>Create</a-button>
      </router-link>
    
    <a-table
      :columns="columns"
      :data-source="this.fetch"
      :rowKey="(record) => record.id"
    >
      <!-- ส่วนปรับแต่ง Header Cell -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <!-- ส่วนปรับแต่ง Body Cell -->
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <smile-outlined />
          <a>
            {{ record.product_name }}
          </a>
        </template>
      </template>
    </a-table>
  </a-col>
  </a-row>

  <!-- <div class="mt-3"> -->
  <!-- <div>
    <label>
      <input type="checkbox" v-model="filters" value="รองเท้า"> รองเท้า
    </label>
    <label>
      <input type="checkbox" v-model="filters" value="สร้อย"> สร้อย
    </label>
    <label>
      <input type="checkbox" v-model="filters" value="โมเดล"> โมเดล
    </label>
    <label>
      <input type="checkbox" v-model="filters" value="xo"> xo
    </label>
    <button class="btn_button" @click="downloadExcel">Download Excel</button>
  </div> -->
  <!-- <button @click="logout">Logout</button>
    
    <div id="app">
    <input type="file" @change="handleFileUpload" />
    <button @click="importFile">Import File</button>
  </div> -->
  <!-- <div class="table" v-for="(user,index) in fetch">
        <img @click="isModal(user)" :src="user.product_img " alt="" width="160" height="220">
        console.log("🚀 ~ user:", user)
      <div class="fix-righ">
        <p class="font-size"> Name: {{ user.product_name }} {{ user.price }}</p> 
        <p class="font-size"> TelephoneNumber: {{ user.description }}</p>
        <p class="font-size"> TelephoneNumber: {{ user.product_type }}</p>
      </div>
      <div>
        <div class="pad">
          <button @click="deletedata(user.id)" class="button-del">Del</button>
        </div>
      </div>
    </div> -->
  <Modalimg v-show="Popupimg" @close="isclose" :dataimg="dataimg" />
  <!-- </div> -->
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
td,
th {
  border-radius: 6px;
  text-align: left;
  padding: 30px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
.btn_button {
  border-radius: 4px;
  padding: 10px;
  background: green;
}
.button-edit {
  background: #4a7bbb;
  padding: 10px;
  border-radius: 4px;
  border: none;
}
.button-del {
  background: #c74444;
  padding: 12px;
  border-radius: 4px;
  border: none;
}
.buttons {
  display: flex;
  justify-content: space-between;
  height: 200px;
}

.pad {
  padding: 8px;
}
.add-button {
  background: #5cfe77;
  border-radius: 4px;
  border: none;
  padding: 10px;
  box-shadow: #303030 2px 2px 8px;
}
.table {
  width: 900px;
  height: 200px;
  background: #c8c8c8;
  border-radius: 6px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 1px 2px 2px #303030;
}
img {
  padding: 10px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 1px 1px 2px 1px gray;
}
.font-size {
  font-size: large;
  font-weight: 800;
}
.fix-righ {
  padding-right: 250px;
}
</style>
