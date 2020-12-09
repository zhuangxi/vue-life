<template>
  <div class="statistics-container">
    <div class="add-container">
      <el-button type="primary" @click="add()">新增记录</el-button>
    </div>
    <el-table :data="spendList" border style="width: 100%;font-size: 16px;margin-bottom: 20px;">
      <el-table-column align="center" prop="title" label="标题" width="150"></el-table-column>
      <el-table-column align="center" prop="bRemaining" label="本月剩余" width="120"> </el-table-column>
      <el-table-column align="center" prop="expenditure" label="支出" width="130"> </el-table-column>
      <el-table-column align="center" prop="total" label="当月总计" width="120"> </el-table-column>
      <el-table-column align="center" prop="income" label="当月收入" width="120"> </el-table-column>
      <el-table-column align="center" prop="incomeSource" label="当月收入明细" width="120"> </el-table-column>
      <el-table-column align="center" prop="sRemaining" label="上月剩余" width="120"> </el-table-column>
      <el-table-column align="center" prop="bankCard" label="招商" width="120"> </el-table-column>
      <el-table-column align="center" prop="alipay" label="支付宝" width="120"> </el-table-column>
      <el-table-column align="center" prop="wxpay" label="微信" width="120"> </el-table-column>
      <el-table-column align="center" prop="mainExpenditure" label="大头支出" width="200"> </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="curPage" :page-sizes="[10, 20, 30, 50]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    <div class="dialog">
      <el-dialog :visible.sync="visible" width="50%" center top="8vh">
        <el-form ref="spendForm" :model="spendRecord" label-position="right" label-width="120px" style="width: 70%; margin-left:50px;">
          <el-form-item label="标题" prop="title">
            <el-input v-model="spendRecord.title" placeholder="请输入标题" type="text" />
          </el-form-item>
          <el-form-item label="上月剩余" prop="sRemaining">
            <el-input v-model="spendRecord.sRemaining" placeholder="请输入标题" type="number" />
          </el-form-item>
          <el-form-item label="招商" prop="bankCard">
            <el-input v-model="spendRecord.bankCard" placeholder="请输入标题" type="number" />
          </el-form-item>
          <el-form-item label="支付宝" prop="alipay">
            <el-input v-model="spendRecord.alipay" placeholder="请输入标题" type="number" />
          </el-form-item>
          <el-form-item label="微信" prop="wxpay">
            <el-input v-model="spendRecord.wxpay" placeholder="请输入标题" type="number" />
          </el-form-item>
          <el-form-item label="当月收入" prop="income">
            <el-input v-model="spendRecord.income" placeholder="请输入标题" type="number" />
          </el-form-item>
          <el-form-item label="当月收入明细" prop="incomeSource">
            <el-input v-model="spendRecord.incomeSource" placeholder="请输入标题" type="text" />
          </el-form-item>
          <el-form-item label="大头支出" prop="mainExpenditure">
            <el-input v-model="spendRecord.mainExpenditure" placeholder="请输入标题" type="text" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="actionFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as spend from '@/api/spend'
export default {
  name: 'Statistics',
  data() {
    return {
      spendList: [],
      page: 1,
      size: 10,
      curPage: 1,
      total: 0,
      actionType: 'add',
      visible: false,
      spendRecord: {
        title: '',
        bRemaining: 0,
        sRemaining: 0,
        bankCard: 0,
        alipay: 0,
        wxpay: 0,
        income: 0,
        incomeSource: '',
        total: 0,
        mainExpenditure: 0
      }
    }
  },
  created() {
    this.getSpendInfo()
  },
  methods: {
    getSpendInfo() {
      let params = {
        size: this.size,
        page: this.page
      }
      spend
        .getSpendList(params)
        .then(res => {
          this.spendList = res.spendList
          this.total = res.total
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    handleSizeChange(val) {
      this.size = val
      this.getSpendInfo()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSpendInfo()
    },
    edit(row) {
      this.actionType = 'editRecord'
      this.spendRecord = row
      this.visible = true
    },
    remove(row) {
      spend
        .deleteSpend({ id: row.id })
        .then(res => {
          this.$message.success(res)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.getSpendInfo()
        })
    },
    add() {
      this.actionType = 'addRecord'
      this.spendRecord = {
        title: '',
        bRemaining: 0,
        sRemaining: 0,
        bankCard: 0,
        alipay: 0,
        wxpay: 0,
        income: 0,
        incomeSource: '',
        total: 0,
        mainExpenditure: 0
      }
      this.visible = true
    },
    actionFn() {
      this[this.actionType]()
    },
    addRecord() {
      spend
        .createSpend(this.spendRecord)
        .then(res => {
          this.$message.success(res)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.getSpendInfo()
          this.visible = false
        })
    },
    editRecord() {
      spend
        .modifySpend(this.spendRecord)
        .then(res => {
          this.$message.success(res)
        })
        .catch(err => {
          this.$message.error(err.message)
        })
        .finally(() => {
          this.getSpendInfo()
          this.visible = false
        })
    }
  }
}
</script>

<style lang="scss">
.statistics-container {
  margin: 20px;
  .add-container {
    margin-bottom: 20px;
    text-align: left;
  }
}
</style>
