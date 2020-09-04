<template>
  <div>
    <div>
      <el-input
        v-model="searchInfo.name"
        clearable
        size="small"
        placeholder="输入昵称搜索"
        style="width: 200px;"
        class="filter-item"
      />&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" size="small" @click="getAllTieBaInfo" icon="el-icon-search">搜索</el-button>
    </div>
    <div style="height: 20px"></div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column align="center" :show-overflow-tooltip="true" label="贴吧">
          <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="url" label="地址"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="等级">
          <template slot-scope="scope">
          <el-tag type="success">{{ scope.row.levelId }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="levelName" label="等级名称"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="curExp" label="当前经验"></el-table-column>
      <!-- <el-table-column align="center" :show-overflow-tooltip="true" prop="signExp" label="签到经验"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="signTime" label="签到时间"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="signCount" label="签到次数"></el-table-column> -->
      <!-- <el-table-column align="center" :show-overflow-tooltip="true" prop="errorMsg" label="错误信息"></el-table-column> -->
    </el-table>
    <div style="height: 20px"></div>
    <div>
      <el-pagination
        style="padding-top: 15px; background-color: #fff; padding-bottom: 15px;"
        layout="prev, pager, next, total"
        :current-page.sync="pageInfo.currentPage"
        :page-size.sync="pageInfo.pageSize"
        :total="pageInfo.total"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getAllTieBaInfoList } from '@/api/tieba.js'
export default {
  data() {
    return {
      searchInfo: {
        name: '',
      },
      tableData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getAllTieBaInfo()
    },
    getAllTieBaInfo() {
      const params = {
        page: this.pageInfo.currentPage - 1,
        size: this.pageInfo.pageSize,
        name: this.searchInfo.name,
      }
      getAllTieBaInfoList(params).then((res) => {
        if (res.code === '0000') {
          this.tableData = res.data.tieBaDTOList
          this.pageInfo.total = res.data.total
        }
      })
    },
    pageChange() {
      this.getAllTieBaInfo()
    },
  },
}
</script>


<style scoped>
.nick-name {
  background-color: white;
  color: black;
}
</style>
