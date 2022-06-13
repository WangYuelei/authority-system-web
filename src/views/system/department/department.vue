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
        <el-button icon="el-icon-plus" type="success" @click="openAddWindow">新增</el-button>
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
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete-solid"
            @click="handleDelete( scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加和修改窗口 -->
    <system-dialog
      :title="deepDialog.title"
      :visible="deepDialog.visible"
      :height="deepDialog.height"
      :width="deepDialog.width"
      @onClose="onClose()"
      @onConfirm="onConfirm()"
    >
      <div slot="content">
        <el-form :model="dept" :ref="deptFrom" :rules="rules" label-width="88px" :inline="true" size="small">
          <el-form-item label="所属部门" prop="parentName">
            <el-input v-model="dept.parentName" placeholder="所属部门"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="departmentName">
            <el-input v-model="dept.departmentName" placeholder="部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门电话">
            <el-input v-model="dept.phone" placeholder="部门电话"></el-input>
          </el-form-item>
          <el-form-item label="部门地址">
            <el-input v-model="dept.address" placeholder="部门地址"></el-input>
          </el-form-item>
          <el-form-item label="序号">
            <el-input v-model="dept.orderNum" placeholder="序号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </system-dialog>
  </el-main>
</template>
<script>
//导入department脚本文件
import DepartmentApi from "@/api/departement";
//导入SystemDialog组件
import SystemDialog from "@/components/System/SystemDialog.vue";

export default {
  name: "department",
  //注册组件
  components: {
    SystemDialog
  },
  data() {
    return {
      searchModel: {
        //部门名称
        departmentName: ""
      },
      //表格数据
      tableData: [],
      deepDialog: {
        //窗口标题
        title: "",
        //窗口宽度
        width: 560,
        //窗口高度
        height: 170,
        //是否显示窗口
        visible: false
      },
      dept: {
        id:"",
        departmentName:"",
        pid:"",
        parentName:"",
        phone: "",
        address: "",
        orderNum:""
      },
      //表单验证规则
      rules: {
        parentName: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
        departmentName:[{ required: true, message: '请输入部门名称', trigger: 'blur' }],
      }
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
    async search() {
      //发送查询请求
      let res = await DepartmentApi.getDepartmentList(this.searchModel);
      //判断是否成功
      if (res.success) {
        this.tableData = res.data;
      }
    },
    /**
     * 打开添加窗口
     */
    openAddWindow() {
      //设置窗口的属性
      this.deepDialog.title = "新增部门";
      this.deepDialog.visible = true;
    },
    /**
     * 窗口关闭时间
     */
    onClose() {
      //关闭窗口
      this.deepDialog.visible = false
    },
    /**
     * 窗口确认事件
     */
    onConfirm() {
      this.deepDialog.visible = false
    }
  }
}
</script>

<style scoped>

</style>
