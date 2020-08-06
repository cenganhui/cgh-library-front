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
          <div style="float: right; margin-right: 20px">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="url"
              :headers="headers"
              :on-success="handleSuccess"
              :file-list="fileList"
              :auto-upload="false"
              :multiple="false"
            >
              <span slot="tip" class="el-upload__tip">只能上传 pdf 文件</span>
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传到服务器</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>

      <!-- <el-button type="primary" size="small" @click="uploadBook">上传图书</el-button> -->
    </div>
    <div style="height: 20px"></div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="name" label="书名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="currentPage" label="当前页数"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="totalPage" label="总页数"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleClick(scope.row)">阅读</el-button>
          <el-button size="mini" type="danger" @click="deleteBook(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <div>
      <el-pagination
        style="padding-top:15px;background-color: #fff;padding-bottom: 15px;"
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
import { getBookList, deleteBookById } from '@/api/book.js'
import { getLoginInfo } from '@/utils/auth.js'
import { base } from '@/api/base.js'
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
      fileList: [],
      headers: { Authorization: getLoginInfo().token },
      url: base + '/books/upload',
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
    handleClick(row) {
      console.log(row)
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
    uploadFile(file) {
      console.log(file)
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(res) {
      if (res.code === '0000') {
        this.lib.notificationSuccess(this, '上传成功')
      } else {
        this.lib.notificationWarning(this, res.msg || '上传失败')
      }
      this.$refs.upload.clearFiles()
    },
  },
}
</script>

<style>
.upload-demo {
  width: auto;
}

.el-upload__tip {
  margin-left: 10px;
}
</style>