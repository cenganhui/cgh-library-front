<template>
  <div>
    <div>
      <el-row>
        <el-col :span="12">
          <div>
            <el-input
              v-model="searchInfo.name"
              clearable
              size="small"
              placeholder="输入书名搜索"
              style="width: 200px;"
              class="filter-item"
            />&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="primary" size="small" @click="getAllBooks">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="float: right; margin-right: 20px"></div>
        </el-col>
      </el-row>
    </div>
    <div style="height: 20px"></div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="name" label="书名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createBy" label="创建者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateBy" label="更新者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="currentPage" label="当前页数"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="totalPage" label="总页数"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteBook(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
import { getBookList, deleteBookById } from '@/api/admin.js'
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
      this.getAllBooks()
    },
    getAllBooks() {
      const params = {
        page: this.pageInfo.currentPage - 1,
        size: this.pageInfo.pageSize,
        name: this.searchInfo.name,
      }
      getBookList(params).then((res) => {
        if (res.code === '0000') {
          this.tableData = res.data.content
          this.pageInfo.total = res.data.totalElements
        }
      })
    },
    pageChange() {
      this.getAllBooks()
    },
    deleteBook(row) {
      this.$confirm('这将永久删除该图书，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteBookById(row.id).then((res) => {
            if (res.code === '0000') {
              this.getAllBooks()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style>
</style>