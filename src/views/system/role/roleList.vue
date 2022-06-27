<template>
  <el-main>
    <!-- 查询条件 -->
    <el-form :model="searchModel" ref="searchForm" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="searchModel.roleName" placeholder="请输入角色名称"></el-input>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search(pageNo,pageSize)">查询</el-button>
          <el-button icon="el-icon-refresh-right" @click="resetValue">重置</el-button>
          <el-button type="success" icon="el-icon-plus">新增</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
    <!-- 数据表格 -->
    <el-table
      :data="roleList"
      :height="tableHeight"
      border
      stripe
      style="width: 100%; margin-bottom: 10px"
    >
      <el-table-column
        prop="id"
        label="角色编号"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column prop="roleCode" label="角色编码"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="290">
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            size="small"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button
          >
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
          >删除
          </el-button
          >
          <el-button
            icon="el-icon-setting"
            type="primary"
            size="small"
            @click="assignRole(scope.row)"
          >分配权限
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页工具栏 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNo"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-main>
</template>

<script>
//导入role.js脚本
import roleApi from "@/api/role"

export default {
  name: "roleList",
  data() {
    return {
      //查询条件
      searchModel: {
        roleName: "",
        pageNo: 1,
        pageSize: 10,
        userId: this.$store.getters.userId //用户ID
      },
      roleList: [], //数据列表
      tableHeight: 0, //表格高度
      pageNo: 1, //当前页码
      pageSize: 10, //每页显示数量
      total: 0, //总数量
    }
  },
  methods: {
    /**
     * 查询
     */
    async search(pageNo = 1, pageSize = 10) {
      this.searchModel.pageNo = pageNo;//当前页码
      this.searchModel.pageSize = pageSize;//每页显示数量
      //发送查询请求
      let res = await roleApi.getRoleListApi(this.searchModel);
      //执行成功
      if (res.success) {
        //角色列表
        this.roleList = res.data.records;
        //总数量
        this.total = res.data.total;
      }
    },
    /**
     * 重置查询条件
     */
    resetValue() {
      //清空查询条件
      this.searchModel.roleName="";
      //重新查询
      this.search();
    },
    /**
     * 当每页数量发生变化时触发该事件
     */
    handleSizeChange(size) {
      this.pageSize = size; //将每页显示的数量交给成员变量
      this.search(this.pageNo, size);
    },
    /**
     * 当页码发生变化时触发该事件
     */
    handleCurrentChange(page) {
      this.pageNo = page;
      //调用查询方法
      this.search(page, this.pageSize);
    },
    /**
     * 打开编辑窗口
     */
    handleEdit(row) {
    },
    /**
     * 删除
     */
    handleDelete(row) {
    }
  },
  //初始化时调用
  created() {
    //调用查询角色列表的方法
    this.search();
  },
//挂载后调用
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 220
    })
  }
}
</script>

<style scoped>

</style>
