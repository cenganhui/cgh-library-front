<template>
  <div>
    <div>
      <el-input
        v-model="searchInfo.nickName"
        clearable
        size="small"
        placeholder="输入昵称搜索"
        style="width: 200px;"
        class="filter-item"
      />&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" size="small" @click="getAllTieBaUsers" icon="el-icon-search">搜索</el-button>
    </div>
    <div style="height: 20px"></div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column align="center" :show-overflow-tooltip="true" label="用户">
        <template slot-scope="scope">
          <div>
            <el-avatar shape="square" :size="40" :src="scope.row.avatar"></el-avatar>
            <el-avatar class="nick-name" shape="square" :size="40">{{ scope.row.nickName }}</el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="signedTb" label="已签到贴吧数"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="errorTb" label="失败签到贴吧数"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="totalTb" label="总贴吧数"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="签到状态">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.signStatus ? 'success' : 'danger'"
            :icon="scope.row.signStatus ? 'el-icon-check' : 'el-icon-close'"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" label="登录状态">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.login ? 'success' : 'danger'"
            :icon="scope.row.login ? 'el-icon-check' : 'el-icon-close'"
            circle
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="signTime" label="签到时间"></el-table-column>
      <el-table-column align="center" :show-overflow-tooltip="true" prop="cost" label="耗时"></el-table-column>
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
import { getAllTieBaUserList } from '@/api/tieba.js'
export default {
  data() {
    return {
      searchInfo: {
        nickName: '',
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
      this.getAllTieBaUsers()
    },
    getAllTieBaUsers() {
      const params = {
        page: this.pageInfo.currentPage - 1,
        size: this.pageInfo.pageSize,
        nickName: this.searchInfo.nickName,
      }
      getAllTieBaUserList(params).then((res) => {
        if (res.code === '0000') {
          this.tableData = res.data.content
          this.pageInfo.total = res.data.totalElements
        }
      })
    },
    pageChange() {
      this.getAllTieBaUsers()
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
