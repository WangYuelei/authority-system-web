<template>
  <el-main>
    <!--条件查询-->
    <el-form ref="searchForm" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-input v-model="searchModel.departmentName" placeholder="请输入部门名称"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
        <el-button icon="el-icon-refresh-right">重置</el-button>
        <el-button icon="el-icon-plus" type="success">新增</el-button>
      </el-form-item>
    </el-form>
    <!--数据表格-->
    <!--
    data属性:表格数据
    border属性:表格边框
    stripe属性:表格斑马线
    row-key属性:行数据的key,用来优化Table的渲染
    default-expand-all属性:默认展开树状表格数据
    tree-props属性:实行表格配置属性造型
    -->
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      stripe
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <!--    prop属性:填写数据的属性名称  -->
      <!--    label属性:表格表头属性  -->
      <el-table-column prop="departmentName" label="部门名称"></el-table-column>
      <el-table-column prop="parentName" label="所属部门"></el-table-column>
      <el-table-column prop="phone" label="部门电话"></el-table-column>
      <el-table-column prop="address" label="部门地址"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit-outline"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete-solid"
            @click="handleDelete( scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
import DepartementApi from "@/api/departement";
export default {
  name: "department",
  data() {
    return {
      searchModel:{
        //部门名称
        departmentName:""
      },
      //表格数据
      tableData:[]
    }
  },
  //初始化时调用
  created() {
    //调用查询部门列表
    this.search();
  },
  methods: {
    /**
     * 查询部门列表
     * @returns {Promise<void>}
     */
    async search(){
      //发送查询请求
      let res = await DepartementApi.getDepartmentList(this.searchModel);
      //判断是否成功
      if (res.success){
        this.tableData=res.data;
      }
    }
  }
}
//导入department脚本文件
</script>

<style scoped>

</style>
