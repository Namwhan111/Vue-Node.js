<template>
    <div class="modal-backdrop ">
        <div class="modal">
            <div class="modal-body">
                <button
                    type="button"
                    class="btn-close"
                    @click="close"
                    aria-label="Close modal">
                    x
                </button>  
            </div>
            <div class="img-center">
              <img :src="this.dataimg.Profile" alt="">  
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "modal",
    props: {
        fetch:Function,
        dataimg:Object,

    },
    data() {
        return {

        }
    },

    created() {
        console.log(this.dataimg)
    },
    methods: {
        close() {
      this.$emit("close");
    },
    }

}

</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: #ffffff;
  color: black;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 75%;
  border-radius: 20px;
  
}
img {
    width: 400px;
    height: 600px;
   
    object-fit: cover;
} 
.btn-close {
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
.modal-body {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>