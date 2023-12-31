<template>
  <section>
    <div class="border-style" style="height: 170px;">
      <h1 style="font-size: 40px;color: black;">掺杂</h1>
      <p style="font-size: 20px;color: black;">掺杂的方法主要有<span style="font-weight: bold;">扩散</span>和<span style="font-weight: bold;">离子注入</span>，两种方法在分立器件或集成电路中都有用得到，并且两者可以说是互补的，比如说，<span style="font-weight: bold;">扩散可应用于形成深结，离子注入可形成浅结。</span></p>
  </div>
  <div class="border-style">
      <h1 style="font-size: 20px;color: black;">比较掺杂工艺：</h1>
      <el-table
          :data="bijiaokeshifangfa"
          border
          style="width: 100%"
          
          :header-cell-style="headFirst"
          >
          <el-table-column
          fixed
          prop="gongyi"
          label="工艺"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="youlieduibi1"
          label="优劣对比"
          min-width="18%">
            <el-table-column
            prop="youlieduibi2"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="youlieduibi3"
            label="优劣对比"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="youlieduibi4"
            label="优劣对比"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="youlieduibi5"
            label="优劣对比"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="youlieduibi6"
            label="优劣对比"
            min-width="18%">
            </el-table-column>
          </el-table-column>
      </el-table>
  </div>
  <div class="border-style">
      <h1 style="font-size: 20px;color: black;">选择掺杂设备/方法</h1>
      <el-table
          :data="choosemethod"
          border
          style="width: 100%"
          
          :header-cell-style="headFirst"
          >
          <el-table-column
          fixed
          prop="gongyi"
          label="工艺"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="method1"
          label=""
          min-width="18%">
            <el-table-column
            prop="method2"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="method3"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="method4"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="method5"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="method6"
            label=""
            min-width="18%">
            </el-table-column>
          </el-table-column>
      </el-table>
  </div>
  <div class="border-style">
      <h1 style="font-size: 20px;color: black;">选择掺杂材料</h1>
      <el-table
          :data="choosecailiao"
          border
          style="width: 100%"
          
          :header-cell-style="headFirst"
          >
          <el-table-column
          fixed
          prop="gongyi"
          label="工艺"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="cailiao1"
          label=""
          min-width="18%">
            <el-table-column
            prop="cailiao2"
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="cailiao3"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="cailiao4"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="cailiao5"
            label=""
            min-width="18%">
            </el-table-column>
            <el-table-column
            prop="cailiao6"
            label=""
            min-width="18%">
            </el-table-column>
          </el-table-column>
      </el-table>
  </div>
  </section>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    headFirst({row, colunm, rowIndex, columnIndex}) {
            if (rowIndex === 1) {
            //这里为了是将第二列的表头隐藏，就形成了合并表头的效果
                return {display: 'none'}

            }
            return "background:#f5f7fa;text-align: center;"
        },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 7 === 0) {
            return {
              rowspan: 7,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
  },

  data() {
    return {
      bijiaokeshifangfa: [{
        gongyi:'热扩散',
        youlieduibi1: '掺杂量、结深和均匀性较差',
        youlieduibi2: '掺杂量受固溶度限制',
        youlieduibi3:'横向扩散较大',
        youlieduibi4:'设备简单，成本低',
        youlieduibi5:'双面扩散可实现两面吸杂',
        youlieduibi6:'对硅片损伤小，一次完成扩散',
      },{
        gongyi:'离子注入',
        youlieduibi1: '注入剂量和结深可控、掺杂均匀性好',
        youlieduibi2: '掺杂量不受固溶度限制',
        youlieduibi3:'横向扩散小',
        youlieduibi4:'设备复杂，成本高',
        youlieduibi5:'基本无吸杂',
        youlieduibi6:'损伤大，形成非晶层，掺杂原子未激活，需要退火过程',
      },],
      choosemethod: [{
        gongyi:'热扩散',
        method1: '',
        method2: '',
        method3:'',
        method4:'',
        method5:'',
        method6:'',
      },{
        gongyi:'离子注入',
        method1: '',
        method2: '',
        method3:'',
        method4:'',
        method5:'',
        method6:'',
      },],
      choosecailiao: [{
        gongyi:'热扩散',
        cailiao1: '',
        cailiao2: '',
        cailiao3:'',
        cailiao4:'',
        cailiao5:'',
        cailiao6:'',
      },{
        gongyi:'离子注入',
        cailiao1: '',
        cailiao2: '',
        cailiao3:'',
        cailiao4:'',
        cailiao5:'',
        cailiao6:'',
      },],
    }
  }
}
</script>
<style scoped>
.border-style{
  width: 80%;
  margin: 0 0 0 10% ;
  display: block;
}
.el-table{
  .cell {
      white-space: pre-wrap;
  }
}

</style>
