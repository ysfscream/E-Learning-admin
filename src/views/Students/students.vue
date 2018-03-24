<template>
  <div class="student-view">
    <!-- 导入学生 -->
    <el-dialog :visible.sync="dialogForm">
      <excel-import @reload="loadData"></excel-import>
    </el-dialog>
    <!-- 学生列表 -->
    <e-learn-header title="这些是注册过该平台的学生">
      <el-button
        type="primary"
        slot="createBtn"
        @click="dialogForm = true">
        批量导入
      </el-button>
    </e-learn-header>
    <div class="check-students">
      <el-row :gutter="20">
        <el-col :span="8">
          <e-learn-select
            v-model="professional"
            :data="professional"
            placeholder="选择专业或输入专业搜索"
            url="/departments/professional">
          </e-learn-select>
        </el-col>
        <el-col :span="8">
          <e-learn-select
            v-model="className"
            :data="className"
            placeholder="选择班级或输入班级搜索"
            url="/departments/classes">
          </e-learn-select>
        </el-col>
        <el-col :span="2">
          <el-button
            type="info"
            round
            @click="typeSearch">
            分类查询
          </el-button>
        </el-col>
        <el-col :span="2" style="padding-left:40px;">
          <el-button
            round
            @click="clearQuery">
            清除
          </el-button>
        </el-col>
      </el-row>
    </div>

    <e-learn-null v-if="isEmpty"></e-learn-null>

    <el-card v-if="!isEmpty">
      <el-button
        v-if="isDeleteAll"
        class="delete-all"
        size="mini"
        type="danger"
        icon="el-icon-close"
        round
        @click="deleteAllData">
        删除选项
      </el-button>
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="studentRcords"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="平台头像">
          <template slot-scope="scope">
            <img :src="scope.row.headImg" alt="" width="30" height="30">
          </template>
        </el-table-column>
        <el-table-column
          label="姓名">
          <template slot-scope="scope">
            <el-tooltip
              effect="dark"
              :content="scope.row.isLogin ? '在线' : '离线'"
              placement="top-start">
              <span>{{ scope.row.studentName }}</span>
            </el-tooltip>
            <el-badge v-if="scope.row.isLogin" is-dot class="item"></el-badge>
          </template>
        </el-table-column>
        <el-table-column
          label="学号">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="点击查看详情" placement="top-start">
              <router-link
                :to="{ path: `/students/${scope.row.studentID}`, query: { type: 'view' } }">
                {{ scope.row.studentID }}
              </router-link>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="className"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="professional"
          label="专业">
        </el-table-column>
        <el-table-column
          sortable
          label="注册时间"
          prop="createAt"
          width="200px">
        </el-table-column>
         <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="删除" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                round
                @click="deleteData(scope.row.studentID)">
                <i class="fas fa-trash-alt"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>


<script>
import ELearnHeader from '@/components/common/ELearnHeader'
import ELearnNull from '@/components/common/ELearnNull'
import ELearnSelect from '@/components/common/ELearnSelect'
import ExcelImport from '@/components/common/ExcelImport'

import { httpGet, httpDelete } from '@/utils/api'

export default {
  name: 'student-view',
  components: {
    ELearnHeader,
    ELearnNull,
    ELearnSelect,
    ExcelImport,
  },
  data() {
    return {
      isEmpty: false,
      loading: false,
      isDeleteAll: false,
      dialogForm: false,
      studentRcords: [],
      className: '',
      professional: '',
      ids: [],
      page: 1,
      pageSize: 8,
      total: 0,
    }
  },
  watch: {
    ids() {
      if (this.ids.length) {
        this.isDeleteAll = true
      } else {
        this.isDeleteAll = false
      }
    },
  },
  methods: {
    loadData() {
      this.loading = true
      this.className = this.$route.query.className
      this.professional = this.$route.query.professional
      let getURL = ''
      if (!Object.keys(this.$route.query).length) {
        getURL = `/students?page=${this.page}&pageSize=${this.pageSize}`
      } else {
        getURL =
          `/students?page=${this.page}&pageSize=${this.pageSize}&className=${this.className}&professional=${this.professional}`
      }
      httpGet(getURL).then((response) => {
        if (response.data.status === 200) {
          if (response.data.items.students.length) {
            this.isEmpty = false
            this.studentRcords = response.data.items.students
            this.total = response.data.meta.count
          } else {
            this.ids = []
            this.isEmpty = true
          }
        }
        this.loading = false
      })
    },
    deleteData(id) {
      this.$confirm('确定要删除该学生吗？').then(() => {
        httpDelete(`/students/deleteStudent/${id}`).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('删除成功')
            this.loadData()
          }
        })
      }).catch(() => {})
    },
    deleteAllData() {
      const queryIds = this.ids.join(',')
      this.$confirm('确定要删除所有的选中项？').then(() => {
        httpDelete(`/students/deleteAll/?ids=${queryIds}`).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('删除成功')
            this.loadData()
          }
        })
      }).catch(() => {})
    },
    handleSelectionChange(row) {
      this.ids = row.map(rowItem => rowItem.studentID)
      this.isDeleteAll = true
    },
    typeSearch() {
      if (!this.className && !this.professional) {
        this.$message.error('请选择任意一项')
        return
      }
      this.$router.push({
        path: '/students',
        query: {
          className: this.className,
          professional: this.professional,
        },
      })
      this.loading = true
      this.loadData()
    },
    clearQuery() {
      this.$router.push({
        path: '/students',
      })
      this.className = ''
      this.professional = ''
      this.loadData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadData()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.student-view {
  .el-card {
    margin-bottom: 20px;
  }
  .el-dialog {
    width: 80% !important;
  }
  .delete-all {
    margin: 10px 0 10px 0;
  }
  .check-students {
    margin: 30px 0 30px 0;
    .el-select {
      margin-right: 50px;
    }
    .el-select .el-input .el-select__caret {
      display: none;
    }
  }
  clear: both;
  .item {
    position: relative;
    right: 5px;
    bottom: 3px;
  }
}
</style>
