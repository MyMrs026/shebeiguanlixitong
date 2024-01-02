<template>
  <section>
    <div class="border-style" style="height: 170px;">
      <h1 style="font-size: 40px;color: black;">刻蚀</h1>
      <p style="font-size: 20px;color: black;">刻蚀工艺就是利用光刻胶或其它材料作掩蔽层，对没有保护的区域进行腐蚀，最终实现掩膜版图形变成硅片上图形的图形转移。</p>
  </div>
  <div class="border-style">
      <h1 style="font-size: 20px;color: black;">比较刻蚀方法：</h1>
      <el-table
          :data="bijiaokeshifangfa"
          border
          style="width: 100%"
          :header-cell-style="{ 'text-align':'center' }"
          >
          <el-table-column
          fixed
          prop="gongyi"
          label="工艺"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="youdian"
          label="优点"
          min-width="45%">
          </el-table-column>
          <el-table-column
          prop="quedian"
          label="缺点"
          min-width="45%">
          </el-table-column>
      </el-table>
  </div>
  <div class="border-style">
      <h1 style="font-size: 20px;color: black;">比较刻蚀设备：</h1>
      <el-table
          :data="bijiaokeshishebei"
          border
          style="width: 100%"
          :header-cell-style="{ 'text-align':'center' }"
          >
          <el-table-column
          fixed
          prop="xiangmu"
          label="项目"
          align="center"
          min-width="10%">
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
  <div class="border-style">
    <section style="width: 48%; float:left">
      <h1 style="font-size: 20px;color: black;">选择蚀刻材料</h1>
      <el-table
          :data="choosecailiao"
          :span-method="objectSpanMethod"
          border
          style="width: 100%"
          :header-cell-style="{ 'text-align':'center' }"
          >
          <el-table-column
          fixed
          prop="fenlei"
          label="分类"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          fixed
          prop="yanghuawu"
          label="氧化物"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          fixed
          prop="bandaotijinshu"
          label="半导体金属"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="hejin"
          label="合金"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          prop="danhuawu"
          label="氮化物"
          align="center"
          min-width="10%">
          </el-table-column>
      </el-table>
    </section>

    <section style="width: 48%;float: left;margin-left: 4%;">
      <h1 style="font-size: 20px;color: black;">选择刻蚀方法/设备：</h1>
      <el-table
          :data="chooseequ"
          border
          style="width: 100%"
          :header-cell-style="{ 'text-align':'center' }"
          >
          <el-table-column
          fixed
          prop="ganfakeshishebei"
          label="干法刻蚀"
          align="center"
          min-width="10%">
          </el-table-column>
          <el-table-column
          fixed
          prop="shifakeshishebei"
          label="湿法刻蚀"
          align="center"
          min-width="10%">
          </el-table-column>
      </el-table>
    </section>
  </div>
  </section>
</template>
<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
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
        gongyi:'干法刻蚀',
        youdian: '可以实现高方向性，从而获得垂直的侧壁和高纵深比。\n选择性，可以通过选择特定的刻蚀气体和参数优化刻蚀选择性。\n高分辨率，适用于细微的特征尺寸和深腔室刻蚀。',
        quedian: '造价高，用于微流控芯片制备的较少',
      },{
        gongyi:'湿法刻蚀',
        youdian: '设备简单\n刻蚀速率高，表面均匀性好\n对硅片损伤少，几乎适用于所有的金属、玻璃、塑料等材料',
        quedian: '图形刻蚀保真想过不理想，刻蚀图形的最小线难以掌控;',
      }],

      bijiaokeshishebei: [{
        xiangmu:'ICP等离子刻蚀机',
        gongneng: '硅、氧化硅、氮化硅、铌酸锂等材料干法刻蚀',
        jishucanshu: '支持8路气体：Ar/O2/N2/SF6/BCl3/HBr/CHF3/Cl2;\n高密度等离子发生器，功率≥3000W，可控功率范围150~1200W;\nSi刻蚀速率≥300nm/min，Profile＞85°，均一性≤5%；SiO2刻蚀速率≥100nm/min。',
      },{
        xiangmu:'反应离子束刻蚀机',
        gongneng: '各种硬材料（如金属）和倾角刻蚀',
        jishucanshu: 'LKJ-系列型离子源口径：Ф200mm，以阳极筒内径标定；\n离子能量可调范围：0～1.000 eV，束流可调范围： 0～200mA；离子能量和束流可实现自动匹配；\n离子束有效束径Фb≥150mm；150mm范围内均匀性≤±5%；\n离子能量稳定度：RMS值≤±2%/h，束流稳定度：RMS值≤±2%/h;',
      }],

      choosecailiao: [{
        fenlei:'材料',
        yanghuawu: '氧化硅',
        bandaotijinshu: 'Al',
        hejin:'铜铝合金',
        danhuawu:'氮化硅'
      },{
        fenlei:'材料',
        yanghuawu: '氧化钛',
        bandaotijinshu: 'Cr',
        hejin:'钛铜合金',
        danhuawu:'氮氧化硅'
      },
      {
        fenlei:'材料',
        yanghuawu: '氧化锆',
        bandaotijinshu: 'Ni',
        hejin:'铁钴合金',
        danhuawu:'氮化铝'
      },
      {
        fenlei:'材料',
        yanghuawu: '氧化铝',
        bandaotijinshu: 'Cu',
        hejin:'锰铁合金',
        danhuawu:'氮化钛'
      },
      {
        fenlei:'材料',
        yanghuawu: '氧化镁',
        bandaotijinshu: 'Au',
        hejin:'钛铌合金',
        danhuawu:''
      },
      {
        fenlei:'材料',
        yanghuawu: '氧化镍',
        bandaotijinshu: 'Ti',
        hejin:'钴镍合金',
        danhuawu:''
      },
      {
        fenlei:'材料',
        yanghuawu: '氧化锌',
        bandaotijinshu: 'W',
        hejin:'铁镍合金',
        danhuawu:''
      },
    ],

    chooseequ: [{
        ganfakeshishebei:'硅刻蚀',
        shifakeshishebei: '氮化硅刻蚀',
      },{
        ganfakeshishebei:'氧化物刻蚀',
        shifakeshishebei: '氧化硅刻蚀',
      },{
        ganfakeshishebei:'金属刻蚀',
        shifakeshishebei: '铝刻蚀',
      },{
        ganfakeshishebei:'铌酸锂刻蚀',
        shifakeshishebei: '铬刻蚀',
      },{
        ganfakeshishebei:'',
        shifakeshishebei: '钛刻蚀',
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
