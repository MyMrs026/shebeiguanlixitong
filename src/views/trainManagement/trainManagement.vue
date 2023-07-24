<template>
  <div class="card">
    <el-tabs type="border-card">
  <el-tab-pane label="培训项目">
    <!-- <el-table
      ref="filterTable"
      :data="trainProject"
      style="width: 100%">
      <el-table-column
        prop="number"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="category"
        label="设备类别"
        width="140"
        :filters="[{ text: '箱体设备', value: '箱体设备' }, 
                   { text: '食品检测设备', value: '食品检测设备' },
                   { text: '环境检测设备', value: '环境检测设备' }, 
                   { text: '药品检测设备', value: '药品检测设备' },
                   { text: '安全存储设备', value: '安全存储设备' }, 
                   { text: '样品制备设备', value: '样品制备设备' },
                   { text: '光谱仪器', value: '光谱仪器' }, 
                   { text: '色谱仪器', value: '色谱仪器' },
                   { text: '洁净区设备', value: '洁净区设备' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="'primary'"
            disable-transitions>{{scope.row.tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="introduce"
        label="介绍"
        width="600">
      </el-table-column>
      <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button  type="text" size="small" @click="dialogVisible = true">申请</el-button>
        <el-dialog
          title="申请邮件发送"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div>  
            <el-form ref="form" :model="form" label-width="80px">    
              <el-form-item  label="收件人">
                <input v-model="form.recipient" id="recipient" type="email">
              </el-form-item>   
              <el-form-item  label="发件人">
                <input v-model="form.subject" id="subject" type="text">
              </el-form-item>  
              <el-form-item  label="申请培训项目">
                <textarea v-model="form.content" id="content"></textarea>
              </el-form-item> 
            </el-form>  
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="sendEmail">发送邮件</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </template>
    </el-table-column>
    </el-table> -->
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
  </el-tab-pane>

  <el-tab-pane label="培训记录">
    <el-table
    :data="trainRecords"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="130">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="130">
    </el-table-column>
    <el-table-column
      prop="projectName"
      label="项目名称">
    </el-table-column>
    <el-table-column
      prop="evaluate"
      label="考核评定"
      width="130">
    </el-table-column>
  </el-table>
  </el-tab-pane>

  <el-tab-pane label="已申请培训">
    <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="培训内容" name="1">
      <div>
    <h2>文档:</h2>
    <ul>
      <li v-for="file in files" :key="file.name">
        <a :href="file.url" :download="file.name">{{ file.name }}</a>
      </li>
    </ul>
      </div>
      <div>
    <h2>视频列表：</h2>
    <ul>
      <li v-for="video in videos" :key="video.id">
        <a :href="video.url" target="_blank" rel="noopener">{{ video.name }}</a>
      </li>
    </ul>
      </div>
    </el-collapse-item>
    <el-collapse-item title="考核指标" name="2">
    <div>活着就好【双手合十】</div>
    </el-collapse-item>
    </el-collapse>
    
  </el-tab-pane>
</el-tabs>
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
        // trainProject: [{
        //   number: '1',
        //   name: '专业知识培训1',
        //   introduce: '包括各种设备的结构原理，如基础架构、工作原理、控制系统、监测办法等',
        //   tag: '箱体设备'
        // }, {
        //   number: '2',
        //   name: '作业规程培训1',
        //   introduce: '包括设备操作、运行管理、安装维修、维护保养的标准作业规程等',
        //   tag: '食品检测设备'
        // }, {
        //   number: '3',
        //   name: '作业规程培训2',
        //   introduce: '包括设备操作、运行管理、安装维修、维护保养的标准作业规程等',
        //   tag: '环境检测设备'
        // }, {
        //   number: '4',
        //   name: '技能培训1',
        //   introduce: '技能培训包括检测技能、故障解决能力、维修技能、创新改进能力等',
        //   tag: '环境检测设备'
        // }],
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
        value4: 'new Date(2016, 9, 10, 18, 40)',
        files: [
      { name: 'File 1', url: 'https://example.com/file1.pdf' },
      { name: 'File 2', url: 'https://example.com/file2.doc' },
      { name: 'File 3', url: 'https://example.com/file3.txt' },
        ],
        activeNames: ['1'],
        trainRecords: [{
          date: '2016-05-03',
          name: '王小虎',
          projectName: '作业规程培训2',
          evaluate:'优秀'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          projectName: '专业知识培训1',
          evaluate:'优秀'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          projectName: '作业规程培训3',
          evaluate:'优秀'
        }, ],
        dialogVisible: false,
        form:
        {
          recipient: '',
          subject: '',
          content: ''
        },
        videos: [
      { id: 1, name: 'Video 1', url: 'https://example.com/video1.mp4' },
      { id: 2, name: 'Video 2', url: 'https://example.com/video2.mp4' },
      { id: 3, name: 'Video 3', url: 'https://example.com/video3.mp4' }
        ],
      }
    },
    methods: {
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleChange(val) {
        console.log(val);
      },
      sendEmail() {
        const mailtoLink = `mailto:${this.recipient}?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(this.content)}`;
        window.location.href = mailtoLink;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
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