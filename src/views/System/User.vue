<template>
  <div>
    <div>
      <el-input
        v-model="searchInfo.username"
        clearable
        size="small"
        placeholder="输入用户名搜索"
        style="width: 200px;"
        class="filter-item"
      />&nbsp;&nbsp;&nbsp;&nbsp;
      <el-button type="primary" size="small" @click="getAllUsers" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" @click="showDialog('add', null)" icon="el-icon-plus">添加</el-button>
    </div>
    <div style="height: 20px"></div>
    <el-table :data="tableData" :border="true" style="width: 100%">
      <el-table-column :show-overflow-tooltip="true" prop="username" label="用户名"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="nickName" label="昵称"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createBy" label="创建者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateBy" label="更新者"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="updateTime" label="更新时间"></el-table-column>
      <el-table-column label="管理员" align="center" prop="admin">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.admin"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeAdmin(scope.row.id, scope.row.admin)"
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showDialog('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
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
    <el-dialog
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form
        label-width="120px"
        :model="createInfo"
        :rules="rules"
        :validate-on-rule-change="false"
      >
        <el-form-item v-if="dialogType === 'add'" label="用户名" prop="username">
          <el-input v-model="createInfo.username" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="createInfo.nickName" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="createInfo.password" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item v-if="dialogType === 'add'" label="管理员">
          <el-switch v-model="createInfo.admin" active-color="#409EFF" inactive-color="#F56C6C" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  deleteUserById,
  createOrUpdateUser,
  updateAdmin,
} from '@/api/admin.js'
export default {
  data() {
    return {
      searchInfo: {
        username: '',
      },
      tableData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      dialogType: '',
      dialogVisible: false,
      createInfo: {
        id: '',
        username: '',
        nickName: '',
        password: '',
        admin: false,
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getAllUsers()
    },
    getAllUsers() {
      const params = {
        page: this.pageInfo.currentPage - 1,
        size: this.pageInfo.pageSize,
        username: this.searchInfo.username,
      }
      getUserList(params).then((res) => {
        if (res.code === '0000') {
          this.tableData = res.data.content
          this.pageInfo.total = res.data.totalElements
        }
      })
    },
    pageChange() {
      this.getAllBooks()
    },
    deleteUser(row) {
      this.$confirm('是否删除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          deleteUserById(row.id).then((res) => {
            if (res.code === '0000') {
              this.getAllUsers()
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
    showDialog(type, data) {
      this.dialogType = type
      if (type === 'add') {
        this.createInfo.id = ''
        this.createInfo.username = ''
        this.createInfo.nickName = ''
        this.createInfo.password = ''
        this.createInfo.admin = false
        if (this.$refs.createForm) {
          this.$refs.createForm.resetFields()
        }
      } else {
        this.createInfo.id = data.id
        this.createInfo.username = data.username
        this.createInfo.nickName = data.nickName
        this.createInfo.password = ''
        this.createInfo.admin = data.admin
      }
      this.dialogVisible = true
    },
    createUser() {
      const params = {
        id: this.createInfo.id === '' ? undefined : this.createInfo.id,
        username: this.createInfo.username,
        nickName: this.createInfo.nickName,
        password: this.createInfo.password,
        admin: this.createInfo.admin,
      }
      createOrUpdateUser(
        this.dialogType === 'add' ? 'post' : 'put',
        params
      ).then((res) => {
        if (res.code === '0000') {
          this.lib.notificationSuccess(this, '操作成功')
          this.dialogVisible = false
          this.getAllUsers()
        } else {
          this.lib.notificationWarning(this, res.msg || '操作失败,请重试')
        }
      })
    },
    changeAdmin(id, admin) {
      const data = {
        id: id,
        admin: admin,
      }
      updateAdmin(data).then((res) => {
        if (res.code === '0000') {
          this.lib.notificationSuccess(this, '更改权限成功')
          this.getAllUsers()
        } else {
          this.lib.notificationWarning(this, res.msg || '更改权限失败失败')
          this.getAllUsers()
        }
      })
    },
  },
}
</script>
