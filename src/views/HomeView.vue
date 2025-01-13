<template>
  <SideBar/>
  <div id="docxExport">
    <button class="bg-blue-600" @click="exportWord">
      Download
    </button>
  </div>
</template>

<script>
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import JszipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'
import SideBar from '@/components/SideBar.vue'

export default {
  components: {
    SideBar
  },
  data() {
    return {
      img: 'https://media.discordapp.net/attachments/1252284229677744178/1252628911284555919/MG_8493.jpg?ex=6672e915&is=66719795&hm=2524ff49a40149555ad85b6d3aee405e366d92dd1386b042f476f72189fd0781&=&format=webp&width=656&height=437'
    }
  },
  methods: {
    urlToBase64(url) {
      return new Promise((resolve) => {
        const image = new Image()
        image.setAttribute('crossOrigin', 'Anonymous')
        image.onload = function() {
          const canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          canvas.getContext('2d').drawImage(image, 0, 0)
          const result = canvas.toDataURL('image/png')
          resolve(result)
        }
        image.src = url
      })
    },

    base64DataURLToArrayBuffer(dataURL) {
      const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/
      if (!base64Regex.test(dataURL)) {
        return false
      }
      const stringBase64 = dataURL.replace(base64Regex, '')
      let binaryString
      if (typeof window !== 'undefined') {
        binaryString = window.atob(stringBase64)
      } else {
        binaryString = Buffer.from(stringBase64, 'base64').toString('binary')
      }
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i)
        bytes[i] = ascii
      }
      return bytes.buffer
    },

    async exportWord() {
      const _this = this
      let base64Image = await this.urlToBase64(this.img)

      // 将文件转为二进制
      JszipUtils.getBinaryContent('/src/assets/test.docx', function(err, res) {  // 使用正确的路径
        if (err) {
          throw err
        }
        let opts = {
          centered: false,
          fileType: 'docx'
        }
        opts.getImage = function(tagValue) {
          return _this.base64DataURLToArrayBuffer(tagValue)
        }
        opts.getSize = function(_, tagValue) {
          return [600, 400] // word 里面图片的尺寸
        }
        // 将文件转为 zip 文件
        let pizZip = new PizZip(res)
        let doc = new Docxtemplater()
        doc.loadZip(pizZip)

        doc.attachModule(new ImageModule(opts))
        // 设置填充内容
        let a = {
          name1:"wave",
          name2:"book",
          name3: "jack",
          last1:"qweqw",
          last2:"sdas",
          last3:"asdasd",
          image: base64Image,
        }
        doc.setData(a)
        // 进行内容填充
        try {
          doc.render()
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          }
          console.log(e)
          throw error
        }
        // 获取要下载的文件
        let out = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        // 进行下载
        saveAs(out, '带有图片的docx下载.docx')
      })
    }
  }
}
</script>

<style lang="">
</style>