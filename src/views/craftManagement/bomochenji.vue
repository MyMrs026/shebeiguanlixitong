<template>
    <section>
      <div class="border-style">
        <h1 style="font-size: 40px;color: black;">薄膜沉积</h1>
        <!-- <p style="font-size: 20px;color: black;"></p>   介绍信息写在这里-->
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">镀膜方法比较：</h1>
        <el-table
            :data="methodCom"
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
            fixed
            prop="chenjiyuanli"
            label="沉积原理"
            align="center"
            min-width="20%">
            </el-table-column>
            <el-table-column
            fixed
            prop="chenjiguocheng"
            label="沉积过程"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="taijiefugailv"
            label="台阶覆盖率"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="chenjisulv"
            label="沉积速率"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="chenjiwendu"
            label="沉积温度"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="junyunxing"
            label="均匀性"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="houdukongzhi"
            label="厚度控制"
            align="center"
            min-width="10%">
            </el-table-column>
            <el-table-column
            fixed
            prop="chengfen"
            label="成分"
            align="center"
            min-width="10%">
            </el-table-column>
        </el-table>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">镀膜方法比较：</h1>
        <el-table
            :data="chooseequ"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="xiangmu"
            label="项目"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            fixed
            prop="gongneng"
            label="功能"
            min-width="42%">
            </el-table-column>
            <el-table-column
            fixed
            prop="jishucanshu"
            label="技术参数"
            min-width="42%">
            </el-table-column>
        </el-table>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">薄膜种类：</h1>
        <el-table
            :data="bomoclss"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="bomo"
            label="薄膜"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            fixed
            prop="fenlei"
            label="分类"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            fixed
            prop="bomochenjicailiao"
            label="薄膜沉积材料"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            fixed
            prop="yingyong"
            label="应用"
            align="center"
            min-width="16%">
            </el-table-column>
        </el-table>
    </div>
    <div class="border-style">
        <h1 style="font-size: 20px;color: black;">选择镀膜材料：</h1>
        <el-table
            :data="choosemat"
            border
            style="width: 100%"
            :header-cell-style="{ 'text-align':'center' }"
            >
            <el-table-column
            fixed
            prop="bandaoti"
            label="半导体"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            prop="yanghuawumo"
            label="氧化物膜"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            prop="jinshu"
            label="金属"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            prop="hejin"
            label="合金"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            prop="danhuawu"
            label="氮化物"
            align="center"
            min-width="16%">
            </el-table-column>
            <el-table-column
            prop="juhewu"
            label="聚合物"
            align="center"
            min-width="16%">
            </el-table-column>
        </el-table>
    </div>
    </section>
  </template>
  <script>
import { method } from 'lodash';

  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      },
    },

    data() {
      return {
        methodCom: [{
          gongyi:'PVD技术',
          chenjiyuanli: '蒸发-凝固',
          chenjiguocheng: '形核长大',
          taijiefugailv:'一般',
          chenjisulv:'快',
          chenjiwendu:'低',
          junyunxing:'一般\n5nm左右',
          houdukongzhi:'沉积时间',
          chengfen:'无杂质',
        },{
          gongyi:'CVD技术',
          chenjiyuanli: '气相反应-沉积',
          chenjiguocheng: '形核长大',
          taijiefugailv:'好',
          chenjisulv:'快',
          chenjiwendu:'高',
          junyunxing:'较好\n0.5-2nm',
          houdukongzhi:'沉积时间\n气相分压',
          chengfen:'易含杂质',
        },{
          gongyi:'ALD技术',
          chenjiyuanli: '化学表面饱和反应-沉积',
          chenjiguocheng: '层状生长',
          taijiefugailv:'优秀',
          chenjisulv:'慢',
          chenjiwendu:'低(＜500℃)',
          junyunxing:'优秀\n0.07 – 0.1nm',
          houdukongzhi:'反应循环次数',
          chengfen:'均匀杂质少',
        },],
        chooseequ: [{
          xiangmu:'等离子增强化学气相沉积\n（带TEOS）',
          gongneng: '1、氮化硅/非晶硅生长/TEOS氧化硅沉积。\n2、高纯及掺杂二氧化硅生长（SiO2，BSG，PSG，BPSG，Ge：SiO2）',
          jishucanshu: '1、反应腔上电极带加热功能，最高温度≥200℃；\n2、下电极加热≥400℃，控温精度±1℃；\n3、兼容8英寸及以下尺寸晶圆，可支持碎片实验。',
        },{
          xiangmu:'等离子增强化学气相沉积\n（各种SiO2专用）',
          gongneng: '1、氮化硅/非晶硅生长/TEOS氧化硅沉积。\n2、高纯及掺杂二氧化硅生长（SiO2，BSG，PSG，BPSG，Ge：SiO2）',
          jishucanshu: '1、反应腔上电极带加热功能，最高温度≥200℃；\n2、下电极加热≥400℃，控温精度±1℃；\n3、兼容8英寸及以下尺寸晶圆，可支持碎片实验。',
        },{
          xiangmu:'双离子束溅射镀膜机',
          gongneng: '透镜镀膜（Si，SiO2，Ti，TiO2）',
          jishucanshu: '1、主源—聚焦束溅射离子源：Ф150mm，辅源—准直束离子源：Ф150mm；\n2、主源技术参数，离子能量可调范围：Ei = 0～1000 eV；束流可调范围：Jb = 0～150 mA；\n3、典型材料(Cu)薄膜沉积速率：DR≥ 15 nm/min；\n4、薄膜厚度均匀度：150mm直径范围内≤5%;\n5、辅源技术参数，能量可调范围：Ei = 0～1000 eV；',
        },{
          xiangmu:'电子束蒸发系统',
          gongneng: '1、金属镀膜(Al，Pt，Au，Al，Ag，Cr，Cu，Ti，Sn等)\n2、能镀制用于剥离工艺（lift-off）工艺的金属薄膜。',
          jishucanshu: '1、极限真空优于8E-8Torr，从大气抽到5E-6Torr的时间少于30分钟，真空室真空度自然下降10分钟，计算真空室整体漏率，优于5E-5Torr.L/s；\n2、基片旋转速度检测：转速0～20转/分钟连续可调；\n3、薄膜膜厚不均匀性：≤3%；\n4、样品薄膜膜厚重复性≤2%；\n5、蒸镀材料：纯Ti、Cr、Zr、Fe、Ni、Mn、Co、Cu、Ag(99.999%)、Si、 SiO2， ITO等；还可蒸镀其它金属、氧化物等；',
        },{
          xiangmu:'ALD原子层沉积',
          gongneng: '原子层沉积',
          jishucanshu: '1、8吋向下兼容；\n2、最大深宽比2500：1；\n3、50 – 500°C；\n4、可镀Al2O3, TiO2, SiO2, Ta2O5, HfO2, ZnO, ZrO2, TiN, AlN, metals such as Pt or Ir；\n5、最多6源4路。',
        },],
        bomoclss: [{
            bomo:'半导体',
            fenlei:'多晶硅',
            bomochenjicailiao:'SiH4（硅烷）\nSiH₂Cl₂（二氯硅烷; DCS)',
            yingyong:'MOS的栅极、高值电阻等',
        },{
            bomo:'半导体',
            fenlei:'单晶硅',
            bomochenjicailiao:'SiHCl3（三氯硅烷；TCS）\nSiCl4 （氯化硅; Siltet）',
            yingyong:'功率器件的单晶外延层等',
        },{
            bomo:'半导体',
            fenlei:'非晶硅',
            bomochenjicailiao:'SiH4（硅烷）',
            yingyong:'α-Si太阳能电池、源极/漏极沟道区等',
        },{
            bomo:'电介质',
            fenlei:'Si02（二氧化硅）',
            bomochenjicailiao:'SiH4，O2\nSiH4，N2O\nSi(OC2H5)4（四乙氧基硅烷）、O2/O3',
            yingyong:'应用最广泛的电介质薄膜，STI、栅氧化层、侧墙、PMD、IMD、阻挡层、硬掩膜等',
        },{
            bomo:'电介质',
            fenlei:'Si3N4/SiN（氮化硅）',
            bomochenjicailiao:'SiH4、N2O、N2、NH3、\nC8H22N2Si [ 双(叔丁基氨基)硅烷 ]',
            yingyong:'刻蚀停止层 、硬掩膜 、钝化层等',
        },{
            bomo:'电介质',
            fenlei:'SiON（氮氧化硅）',
            bomochenjicailiao:'SiH4、N2O、N2、NH3',
            yingyong:'抗反射层、栅氧化层、硬掩膜等',
        },{
            bomo:'电介质',
            fenlei:'PSG/BPSG（ 磷硅/硼磷硅玻璃）',
            bomochenjicailiao:'硅烷 、 硼烷 、 磷烷等',
            yingyong:'PMD、钝化层等',
        },{
            bomo:'电介质',
            fenlei:'Low- K（低介电）材料',
            bomochenjicailiao:'聚酰亚胺 （ PI ） 等',
            yingyong:'在PMD中替代 SiO2',
        },{
            bomo:'电介质',
            fenlei:'High-K（高介电）材料',
            bomochenjicailiao:'Hf、O2 、 SiO2 等',
            yingyong:'在栅介质层中替代 SiO2',
        },{
            bomo:'金属及金属化合物',
            fenlei:'W （钨）',
            bomochenjicailiao:'WF6 （六氟化钨）、SiH4 、H2',
            yingyong:'电学薄膜、光学薄膜、硬质膜、耐蚀膜、接触孔、通孔、栅极等',
        },{
            bomo:'金属及金属化合物',
            fenlei:'WSi2/TiSi2/CoSix/NiSi',
            bomochenjicailiao:'WF6、硅烷等',
            yingyong:'源/漏/栅极上的硅化物层',
        },{
            bomo:'金属及金属化合物',
            fenlei:'TiN',
            bomochenjicailiao:'Ti[N(CH3)2]4 [ 四(二甲氨基)钛 ]',
            yingyong:'阻挡层、金属栅等',
        },{
            bomo:'金属及金属化合物',
            fenlei:'Ti',
            bomochenjicailiao:'TiCl4 （氯化钛）',
            yingyong:'阻挡层、金属栅等',
        },{
            bomo:'金属及金属化合物',
            fenlei:'Ta/TaN',
            bomochenjicailiao:'',
            yingyong:'金属层、金属栅等',
        },{
            bomo:'金属及金属化合物',
            fenlei:'Au/Al/Cu',
            bomochenjicailiao:'',
            yingyong:'金属层、金属栅等',
        },],
        choosemat: [{
            bandaoti:'多晶硅',
            yanghuawumo:'氧化硅',
            jinshu:'Al',
            hejin:'铜铝合金',
            danhuawu:'氮化硅',
            juhewu:'SU-8',
        },{
            bandaoti:'非晶硅',
            yanghuawumo:'氧化钛',
            jinshu:'Cr',
            hejin:'钛铜合金',
            danhuawu:'氮氧化硅',
            juhewu:'PMMA',
        },{
            bandaoti:'多晶锗',
            yanghuawumo:'氧化锆',
            jinshu:'Ni',
            hejin:'铁钴合金',
            danhuawu:'氮化铝',
            juhewu:'增反膜',
        },{
            bandaoti:'钻石',
            yanghuawumo:'氧化铝',
            jinshu:'Cu',
            hejin:'锰铁合金',
            danhuawu:'氮化钛',
            juhewu:'增粘剂',
        },{
            bandaoti:'',
            yanghuawumo:'氧化镁',
            jinshu:'Au',
            hejin:'钛铌合金',
            danhuawu:'',
            juhewu:'光刻胶',
        },{
            bandaoti:'',
            yanghuawumo:'氧化镍',
            jinshu:'Ti',
            hejin:'钴镍合金',
            danhuawu:'',
            juhewu:'电子敏感胶',
        },{
            bandaoti:'',
            yanghuawumo:'氧化锌',
            jinshu:'W',
            hejin:'铁镍合金',
            danhuawu:'',
            juhewu:'',
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