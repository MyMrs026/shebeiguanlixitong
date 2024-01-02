<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">键合</h1>
        <p style="font-size: 20px;color: black;">键合技术是半导体封装互连中必不可少的一个环节,键合的目的是将芯片的输入输出端与管脚进行连接,之后再将管脚与应用器件相连接,进而实现芯片的输入输出端与应用器件相连接。</p>
    </div>
    <div class="border-style">
        <!-- <h1 style="font-size: 20px;color: black;">表格标题写在这里</h1> -->
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="equ"
            label="设备"
            align="center"
            min-width="20%">
            </el-table-column>
            <el-table-column
            prop="gongneng"
            label="功能"
            align="center"
            min-width="45%">
            </el-table-column>
            <el-table-column
            prop="jishucanshu"
            label="技术参数"
            min-width="45%">
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
      }
    },

    data() {
      return {
        tableData: [{
          equ:'金属引线键合机',
          gongneng: '芯片金属连接',
          jishucanshu: '键合力：0-150g；\n超声功率：数值化控制，1000倍细分；\n键合头：Z行程19mm,X-Y行程15mm;\n升降台：Z行程：0~19mm，X-Y范围：268mm*273mm。',
        },{
          equ:'晶圆键合机',
          gongneng: '多材料晶圆键合',
          jishucanshu: '6吋向下兼容；\n压力20kN-0.3kN；\n最大温度500ºC，腔体最小气压5 x 10-3 Pa (5 x 10-8 bar);\n阳极、粘合剂、熔融、共晶和玻璃粉等键合方式；\n阳极键合可采用高电压。',
        },{
          equ:'高精度倒装键合机',
          gongneng: '亚微米自动键合、装片',
          jishucanshu: '双面透镜；\n对准精度± 0.5 μm',
        },]
      }
    }
  }
  </script>
  <style scoped>
  .border-style{
    width: 80%;
    margin: 0 0 0 10% ;
  }
.el-table{
    .cell {
        white-space: pre-wrap;
    }
}
  </style>
  