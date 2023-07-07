<template>
  <div class="book-container">
    <div class="top-div">
      <!-- 第一个 div 的内容 -->
      <div>
        <p>Equipment Booking. Day View</p>
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
      <div><button>update</button></div>
      <div><button>Month</button><button>Week</button><button>Day</button></div>
      <div><button>Equipment</button><button>User</button></div>
      <div><button>Make New Booking</button></div>
    </div>
    <div class="bottom-div">
      <!-- 第二个 div 的内容 -->
        <el-row>
          <el-col :span="8">
            <button>隐藏</button>
            <div><p>使用用户</p></div>
            <div class="block">
              <el-time-picker
              is-range
              v-model="value2"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div >
              <button>隐藏</button>
              <p>设备名</p>
            </div>
            
            <div class="block">
              <el-time-picker
              is-range
              v-model="value3"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <button>隐藏</button>
            <div><p>选择新设备</p></div>
            <div class="block">
              <el-time-picker
              is-range
              v-model="value4"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
            </div>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
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
</style>