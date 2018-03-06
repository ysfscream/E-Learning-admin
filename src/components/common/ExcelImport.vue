<template>
  <div class="excel-import-view">
    <input
      type="file"
      @change="importFile(this)"
      id="imFile"
      style="display: none"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
              application/vnd.ms-excel"/>
    <a id="downlink"></a>
    <el-button class="button" @click="uploadFile()">导入</el-button>
    <!-- <el-button class="button">导出</el-button> -->
    <!--错误信息提示-->
    <el-dialog title="提示" v-model="errorDialog">
      <span>{{errorMsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="errorDialog=false">确认</el-button>
        </span>
    </el-dialog>
    <!--展示导入信息-->
    <el-table :data="excelData" height="350" empty-text="这里显示您导入的学生列表，点击导入选择文件">
      <el-table-column label="学号" prop="studentID"></el-table-column>
      <el-table-column label="姓名" prop="studentName"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="班级" prop="className"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="专业" prop="professional"></el-table-column>
    </el-table>
    <el-button
      class="import-btn"
      type="primary"
      @click="save"
      :loading="fullscreenLoading">
      确认导入
    </el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { httpPost } from '@/utils/api'

export default {
  name: 'excel-import-view',
  data() {
    return {
      fullscreenLoading: false,
      imFile: '',
      outFile: '',
      errorDialog: false,
      errorMsg: '',
      excelData: [],
    }
  },
  methods: {
    uploadFile() {
      this.imFile.click()
    },
    // downloadFile(rs) {
    //   let data = [{}]
    //   for (let k in rs[0]) {
    //     data[0][k] = k
    //   }
    //   data = data.concat(rs)
    //   this.downloadExl(data, '菜单')
    // },
    // 导入excel
    importFile() {
      this.fullscreenLoading = true
      const obj = this.imFile
      if (!obj.files) {
        this.fullscreenLoading = false
        return
      }
      const f = obj.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result
        if (this.rABS) {
          // 手动转化
          this.wb = XLSX.read(btoa(this.fixdata(data)), {
            type: 'base64',
          })
        } else {
          this.wb = XLSX.read(data, {
            type: 'binary',
          })
        }
        const json = XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[0]])
        // analyzeData: 解析导入数据
        this.dealFile(this.analyzeData(json))
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    // 导出到excel
    // downloadExl(json, downName, type) {
    //   let keyMap = [] // 获取键
    //   for (let k in json[0]) {
    //     keyMap.push(k)
    //   }
    //   console.info('keyMap', keyMap, json)
    //   let tmpdata = [] // 用来保存转换好的json
    //   json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
    //     v: v[k],
    //     position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    //   }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
    //     tmpdata[v.position] = {
    //       v: v.v,
    //     }
    //   })
    //   let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
    //   let tmpWB = {
    //     SheetNames: ['mySheet'], // 保存的表标题
    //     Sheets: {
    //       'mySheet': Object.assign({},
    //         tmpdata, // 内容
    //         {
    //           '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
    //         })
    //     }
    //   }
    //   let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
    //     {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'}
    // 这里的数据是用来定义导出的格式类型
    //   ))], {
    //     type: ''
    //   })  // 创建二进制对象写入转换好的字节流
    //   let href = URL.createObjectURL(tmpDown)  // 创建对象超链接
    //   this.outFile.download = downName + '.xlsx'  // 下载名称
    //   this.outFile.href = href  // 绑定a标签
    //   this.outFile.click()  // 模拟点击实现下载
    //   setTimeout(function () {  // 延时释放
    //     URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
    //   }, 100)
    // },
    // 此处可以解析导入数据
    analyzeData(data) {
      return data
    },
    // 处理导入的数据
    dealFile(data) {
      const dbData = data.map((item) => {
        const itemValue = item
        itemValue.studentID = itemValue['学号']
        delete itemValue['学号']
        itemValue.studentName = itemValue['姓名']
        delete itemValue['姓名']
        itemValue.gender = itemValue['性别']
        delete itemValue['性别']
        itemValue.className = itemValue['班级']
        delete itemValue['班级']
        itemValue.email = itemValue['邮箱']
        delete itemValue['邮箱']
        itemValue.password = itemValue['密码']
        delete itemValue['密码']
        itemValue.professional = itemValue['专业']
        delete itemValue['专业']
        return item
      })
      this.imFile.value = ''
      this.fullscreenLoading = false
      if (data.length <= 0) {
        this.errorDialog = true
        this.errorMsg = '请导入正确信息'
      } else {
        this.excelData = dbData
      }
    },
    // // 字符串转字符流
    // s2ab(s) {
    //   const buf = new ArrayBuffer(s.length)
    //   const view = new Uint8Array(buf)
    //   for (let i = 0; i !== s.length; i += 1) {
    //     const str = s.charCodeAt(i)
    //   }
    //   return buf
    // },
    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    getCharCol(n) {
      let num = n
      let s = ''
      let m = 0
      while (num > 0) {
        m = (num % 26) + 1
        s = String.fromCharCode(m + 64) + s
        num = ((num - m) / 26)
      }
      return s
    },
    // 文件流转BinaryString
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; l += 1) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, (l * w) + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    save() {
      const data = this.excelData
      if (!data.length) {
        this.$message.error('请选择要导入学生的 Excel 文档')
        return
      }
      this.fullscreenLoading = true
      httpPost('/students/importStudents', data).then((response) => {
        if (response.data.status === 201) {
          this.$notify({
            title: '导入学生成功',
            message: '学生登录平台的初始密码为 123456',
            type: 'success',
          })
          this.excelData = []
          this.fullscreenLoading = false
          this.$emit('reload')
        }
      })
    },
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
    this.outFile = document.getElementById('downlink')
  },
}
</script>


<style lang="scss">
.excel-import-view {
  .import-btn {
    position: relative;
    left: 85%;
    margin-top: 20px;
  }
}
</style>
