<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-input
        v-model="listQuery.title"
        placeholder=""
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="form" label-width="80px">
        <el-input type="hidden" v-model="form.id"></el-input>
        <el-form-item label="名称">
          <el-input v-model="form.typeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="form.typeCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级题型">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option value="0">无</el-option>
            <el-option
              v-for="item in parents"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="model == 'add'" type="primary" @click="add"
          >确 定</el-button
        >
        <el-button v-if="model == 'edit'" type="primary" @click="edit"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="treeData"
      row-key="id"
      border
      highlight-current-row
      style="width: 100%"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="序号" type="index" align="center" width="80">
      </el-table-column>
      <el-table-column label="名称" prop="typeName" align="center" />
      <el-table-column label="编码" prop="typeCode" align="center" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getList,
  getTree,
  getPage,
  getInfo,
  add,
  edit,
  del,
} from "@/api/examination-type";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      title: "",
      model: "add",
      list: null,
      treeData: [],
      total: 0,
      listLoading: true,
      parents: [],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      form: {
        id: "",
        typeName: "",
        typeCode: "",
        parentId: "",
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getTree();
  },
  methods: {
    getTree() {
      this.listLoading = true;
      getTree().then((res) => {
        if (res.code === 0) {
          this.treeData = res.data;
          this.listLoading = false;
        }
      });
    },
    getOptions() {
      getList().then((res) => {
        this.parents = res.data;
      });
    },
    handleFilter() {
      this.getTree();
    },
    //新增按钮点击事件
    handleCreate() {
      this.model = "add";
      this.title = "添加题型";
      this.form = {};
      this.dialogFormVisible = true;
      this.parents = [];
      this.getOptions();
    },
    //编辑按钮点击事件
    handleEdit(row) {
      getInfo(row.id).then((res) => {
        this.model = "edit";
        this.title = "修改题型";
        this.form = {};
        this.getOptions();
        this.dialogFormVisible = true;

        this.form = res.data;
      });
    },
    //删除按钮点击事件
    handleDelete(row, index) {
      this.$confirm("此操作将永久删除，是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    add() {
      add(this.form).then((res) => {
        if (0 === res.code) {
          this.dialogFormVisible = false;
          this.getTree();
        } else {
        }
      });
    },
    edit() {
      edit(this.form).then((res) => {
        if (0 === res.code) {
          this.dialogFormVisible = false;
          this.getTree();
        } else {
        }
      });
    },

    del(id) {
      del(id).then((res) => {
        if (res.code === 0) {
          if ((res.data = true)) {
            this.$message.success("删除成功");
            this.getTree();
            return;
          }
        }
        this.$message.success("删除失败");
      });
    },
  },
};
</script>
