<template>
  <div class="book-container">
    <div class="top-div">
      <!-- 第一个 div 的内容 -->
      <div>
        <p>设备预约日视图</p>
      </div>
      <div class="block">
        <el-date-picker
          v-model="value1"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div><button>更新</button></div>
      <div><button>月份</button><button>周数</button><button>日期</button></div>
      <div><button>设备</button><button>用户</button></div>
      <div><button>创建新的预约</button></div>
    </div>
    <div class="bottom-div">
      <!-- 第二个 div 的内容 -->
        <el-row style="height: 100%;">
          <el-col :span="8" style="height: 100%;">
            <button>隐藏</button>
            <div><p>使用用户</p></div>
            <div class="schedular-area"> 
              <Schedular/>
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;">
            <div >
              <button>隐藏</button>
              <p>设备名</p>
            </div>
            <div class="schedular-area"> 
              <Schedular/>
            </div>
          </el-col>
          <el-col :span="8" style="height: 100%;">
            <button>隐藏</button>
            <div><p>选择新设备</p></div>
            <div class="schedular-area"> 
              <Schedular/>
            </div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import Schedular from '../../components/common/schedular/Schedular.vue'
export default {
    components:{
      Schedular,
    },
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: 'new Date(2016, 9, 10, 18, 40)',
        value3: 'new Date(2016, 9, 10, 18, 40)',
        value4: 'new Date(2016, 9, 10, 18, 40)'
      };
    }
  };

</script>
<style scoped>
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin-left: 10px;
}

.top-div {
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 8%;
  border: 1px solid #000;
  border-radius: 8px;
  margin-bottom: 25px;
  background-color: rgb(230, 230, 230);
  /* 可以根据需要进行其他样式设置 */
}

.bottom-div {
  width: 90%;
  height: 800px;
  border: 1px solid #000;
  border-radius: 8px;
}
.schedular-area {
  width: 90%;
  height: 90%;
  overflow: hidden;
}
</style>