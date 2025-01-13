<script>
import axios from 'axios';
import router from '@/router';
import iconimg from '../assets/wsfff.jpg'
export default {
    name: 'create',
    components: {
    },
    computed() {

    },
    data() {
        return {
            fromdata:{},
            preview_img :'',
            iconimg : ''
        }
    },
    methods: {
        createData() {
            const token = localStorage.getItem('authtoken');
            const formData = new FormData();
            formData.append('product_name', this.fromdata.product_name ? this.fromdata.product_name : "");
            formData.append('product_img', this.fromdata.product_img ? this.fromdata.product_img : "");
            formData.append('price', this.fromdata.price ? this.fromdata.price : "");
            formData.append('description', this.fromdata.description ); 
            formData.append('product_type', this.fromdata.product_type ); 

            axios.post(`${import.meta.env.VITE_API}/product`, formData, {
                headers: {'Content-Type': 'application/json', },
                data:{}
            }).then(res => {
                if (res.status == 200) {
                    router.push('/about');
                }
                console.log(res.status)
            }).catch(err => {
                console.log(err);
            });
        },

        onFileChanged(e) {
            const files = e.target.files;
            if (files.length > 0) {
                const selectFile = files[0];
                this.fromdata.Profile = selectFile;
                this.preview_img = URL.createObjectURL(selectFile); 
            }
        }
    }
}

</script>

<template>
<div class="form-input">
  
    <div class="inputs">
        <div style="background: #ececec; padding: 30px">
    <a-card title=" Create Page" :bordered="false" style="width: 300px">
        <p>name</p>
        <input class="input" type="text" v-model="fromdata.product_name">
        <p>product_img</p>
        <input class="input" type="text" v-model="fromdata.product_img">
        <p>price</p>
        <input class="input" type="text" v-model="fromdata.price ">  
        <p>description</p>
        <input class="input" type="text" v-model="fromdata.description">
        <p>product_type</p>
        <input class="input" type="text" v-model="fromdata.product_type">
    </a-card>
  </div>
    <!-- <input
        type="file"
        @change="onFileChanged($event)"
        accept="image/*"
        capture
    
    /> -->
        <!-- <img :src="preview_img" alt="Selected Image" v-if="preview_img" width="100"> -->
    </div>
    <button @click="createData()" type="submit" class="submit">Submit</button>
</div>

</template>


<style scoped>
.form-input {
 width: 40%;
 height: 400px;
 background: #505050;  
 padding: 40px;
 position: relative;
 color: black;
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
