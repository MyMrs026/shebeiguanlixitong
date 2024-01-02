<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">光刻</h1>
        <p style="font-size: 20px;color: black;">光刻就是把芯片制作所需要的线路与功能区做出来。利用光刻机发出的光通过具有图形的掩模版对涂有光刻胶的薄片曝光，光刻胶见光后会发生性质变化，从而使掩模版的图形复印到薄片上。</p>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">选择曝光方法/设备：</h1>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="project"
            label="项目"
            align="center"
            min-width="30%">
            </el-table-column>
            <el-table-column
            prop="gongneng"
            label="功能"
            align="center"
            min-width="30%">
            </el-table-column>
            <el-table-column
            prop="jishucanshu"
            label="技术参数"
            min-width="40%">
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
          project:'接触式紫外光刻机',
          gongneng: '紫外曝光',
          jishucanshu: 'I线365nm，G线436nm\n6吋向下兼容\n曝光精度1um，对准精度500nm；\n正反两面对准。',
        },{
          project:'激光直写光刻机',
          gongneng: '微米尺度图形直接曝光，不使用掩模版。',
          jishucanshu: '最小分辨率：300nm；\n线宽均匀性：≤60nm；\n支持多种光刻精度自动切换（300nm、600nm、900nm，无需手动更换光学镜头，软件控制自动切换）；\n灰度直写等级：4096级;',
        },{
          project:'EBL电子束曝光机',
          gongneng: '超精细图案曝光。',
          jishucanshu: '电子束能量：50KeV、100KeV;\n电流：50pA~350nA；\n图形发生器频率：50MHz\n最小曝光线宽：8nm；\n套刻精度：<5nm；\n最大写场：1mm x 1mm',
        },{
          project:'深紫外批量曝光；',
          gongneng: '紫外曝光',
          jishucanshu: '支持8路气体。\n高密度等离子发生器，功率≥3000W，可控功率范围150~1200W;\nSi刻蚀速率≥300nm/min，Profile＞85°，均一性≤5%；SiO2刻蚀速率≥100nm/min。',
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
  