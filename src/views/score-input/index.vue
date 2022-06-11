<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="Title"
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
      </el-button>
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

    <el-dialog title="成绩录入" :visible.sync="dialogFormVisible" width="20%">
      <el-form :model="form" ref="dataForm" label-width="80px">
        <el-form-item label="题型">
          <el-select v-model="form.examinationType" placeholder="请选择">
            <el-option value="0">无</el-option>
            <el-option
              v-for="item in examinationTypes"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总题数">
          <el-input v-model="form.total" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正确题数">
          <el-input v-model="form.correct" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.inputDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题型" prop="typeName" align="center" />
      <el-table-column label="总数" prop="total" align="center" />
      <el-table-column label="正确数量" prop="correct" align="center" />
      <el-table-column label="错误数量" prop="wrong" align="center" />
      <el-table-column label="正确率" prop="correctRate" align="center" />
      <el-table-column label="日期" prop="inputDate" align="center" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageIndex"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getPage, add } from "@/api/score-input";
import { getList } from "@/api/examination-type";
import waves from "@/directive/waves"; // waves directive
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      examinationTypes: [],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      form: {
        id: "",
        typeName: "",
        typeCode: "",
      },
      dialogFormVisible: false,
      dialogPvVisible: false,
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
    this.getList();
  },
  methods: {
    /** 列表渲染 */
    getList() {
      this.listLoading = true;
      getPage(this.listQuery).then((res) => {
        console.log(res);
        this.list = res.data.records;
        this.total = res.data.total;
        this.listLoading = false;
      });
    },
    /** 题型下拉框数据 */
    getExaminationTypes() {
      getList().then((res) => {
        this.examinationTypes = res.data;
      });
    },
    /** 搜索 */
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    /** 新增按钮点击事件 */
    handleCreate() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        this.getExaminationTypes();
      });
    },
    /** 编辑按钮点击事件 */
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    /** 删除按钮点击事件 */
    handleDelete(row, index) {
      this.$notify({
        title: "Success",
        message: "Delete Successfully",
        type: "success",
        duration: 2000,
      });
      this.list.splice(index, 1);
    },
    /** 成绩录入 */
    add() {
      add(this.form).then((res) => {
        if (0 === res.code) {
          this.dialogFormVisible = false;
          this.$message.success("录入成功");
          this.getList();
        } else {
          this.$message.error("录入失败");
        }
      });
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
