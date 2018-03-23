<template>
  <div class="dashboard-view">
    <el-row :gutter="30">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <icon-svg
              class="icon--header"
              iconID="icon-xuesheng">
            </icon-svg>
            <span>学生统计</span>
            <a
              style="float: right; padding: 7px 0"
              href="javascript:;"
              @click="$router.push({ path: '/students' })">
              总数：{{ studentCount }} 人
            </a>
          </div>
          <el-row>
            <el-col :span="8">
              <e-learn-pie
                chartID="studentOnline"
                title="学生状态"
                :data="studentOnlineData">
              </e-learn-pie>
            </el-col>
            <el-col :span="4" style="margin-top:10%;">
              <p>在线人数：{{ this.studentOnlineData[0].value }}</p>
              <p>离线人数：{{ this.studentOnlineData[1].value }}</p>
            </el-col>
            <el-col :span="12">
              <e-learn-chart
                chartID="genderRatio"
                title="专业分布"
                name="人数"
                :dataName="professionalName"
                :dataValue="professionalData">
              </e-learn-chart>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <icon-svg
              class="icon--header"
              iconID="icon-shipin">
            </icon-svg>
            <span style="padding-left: 5px;">视频统计</span>
            <a
              style="float: right; padding: 7px 0"
              href="javascript:;"
              @click="$router.push({ path: '/videos' })">
              总数：{{ videoCount }} 部
            </a>
          </div>
          <el-row>
            <el-col :span="24">
              <e-learn-pie
                chartID="videosType"
                title="视频分类"
                :data="videosData"
                :isRose="true">
              </e-learn-pie>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <icon-svg
              class="icon--header"
              iconID="icon-doc">
            </icon-svg>
            <span style="padding-left: 5px;">文档统计</span>
            <a
              style="float: right; padding: 7px 0"
              href="javascript:;"
              @click="$router.push({ path: '/videos' })">
              总数：{{ docsCount }} 份
            </a>
          </div>
          <el-row>
            <el-col :span="24">
              <e-learn-line
                chartID="docsType"
                title="文档分类"
                name="数量"
                :dataName="docsName"
                :dataValue="docsData">
              </e-learn-line>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>


<script>
import IconSvg from '@/components/common/IconSvg'
import ELearnPie from '@/components/charts/ELearnPie'
import ELearnChart from '@/components/charts/ELearnChart'
import ELearnLine from '@/components/charts/ELearnLine'

import { mapState } from 'vuex'
import { httpGet } from '@/utils/api'

export default {
  name: 'dashboard-view',
  components: {
    IconSvg,
    ELearnPie,
    ELearnChart,
    ELearnLine,
  },
  data() {
    return {
      docsCount: 0,
      videoCount: 0,
      studentCount: 0,
      studentOnlineData: [
        { value: 0, name: '在线人数' },
        { value: 0, name: '离线人数' },
      ],
      videosData: [],
      professionalData: [],
      professionalName: [],
      docsData: [],
      docsName: [],
    }
  },
  computed: {
    ...mapState({
      id: state => state.account.teacher.id,
    }),
  },
  methods: {
    loadStudentData() {
      httpGet('/statistics/studentsCount').then((response) => {
        this.studentCount = response.data.meta.count
        this.studentOnlineData[0].value = response.data.meta.isLogin
        this.studentOnlineData[1].value = response.data.meta.isNotLogin
        this.professionalName = response.data.items.professionalName
        this.professionalData = response.data.items.professionalData
      })
    },
    loadVideoData() {
      httpGet(`/statistics/videosCount/${this.id}`).then((response) => {
        this.videoCount = response.data.meta.count
        this.videosData = response.data.items.videosData
      })
    },
    loadDocsData() {
      httpGet(`/statistics/docsCount/${this.id}`).then((response) => {
        this.docsCount = response.data.meta.count
        this.docsData = response.data.items.docsData
        this.docsName = response.data.items.docsName
      })
    },
  },
  created() {
    this.loadDocsData()
    this.loadVideoData()
    this.loadStudentData()
  },
}
</script>


<style lang="scss">
.dashboard-view {
  #studentOnline {
    width: 100%;
    height: 250px;
  }
  #genderRatio {
    width: 100%;
    height: 250px;
  }
  #videosType {
    width: 100%;
    height: 250px;
  }
  #docsType {
    width: 100%;
    height: 250px;
  }
  .el-card {
    margin-bottom: 40px;
    .icon--header {
      position: relative;
      top: 5px;
      width: 1.5rem;
      height: 1.5rem;
    }
    color: #606266;
  }
}
</style>
