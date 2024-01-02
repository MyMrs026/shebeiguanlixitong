<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">表征</h1>
        <!-- <p style="font-size: 20px;color: black;">介绍写在这里</p> -->
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
          equ:'台阶仪',
          gongneng: '属于接触式表面形貌测量仪器,常用来测试材料的台阶厚度',
          jishucanshu: '单次扫描长度≥150mm无拼接；\n台阶测量重复性≤4Å；\nZ方向线性度≤±0.5%@高度＞2000 Å，≤10 Å@高度≤2000 Å；\n具有2D 3D应力测量及分析功能',
        },{
          equ:'AFM原子力显微镜',
          gongneng: '表面形貌及粗糙度测量',
          jishucanshu: '最大扫描范围90 µm x 90 µm;',
        },{
          equ:'显微镜',
          gongneng: '光学结构检查',
          jishucanshu: '反射明场，暗场（后期可拓展偏光，DIC微分干涉，MIX明暗场混合功能） ；\n目镜倍率：10X两个（带屈光度调节功能） ；\n金相专用平场半复消色差物镜 10X,20X，50X,100X ；\n手动载物台：150×100mm机械载物台及黑色载物台板。',
        },{
          equ:'椭偏仪',
          gongneng: '薄膜厚度和折射率测量',
          jishucanshu: '光谱范围：193-1690nm\n光谱测试间隔：1nm @<1000nm；2.5nm @1000nm-1690nm。',
        },{
          equ:'SEM扫描电子显微镜',
          gongneng: '纳米结构测量',
          jishucanshu: '二次电子像分辨率：≤0.9 nm (15 kV)，≤1.3nm；\n能谱仪有效面积≥60mm2。',
        }]
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
  