<template>
  <div class="card">
    <el-tabs type="border-card">
  <el-tab-pane label="培训项目">
    <el-table
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
              <el-form-item for="recipient" label="收件人">
                <input v-model="recipient" id="recipient" type="email">
              </el-form-item>   
              <el-form-item for="subject" label="主题">
                <input v-model="subject" id="subject" type="text">
              </el-form-item>  
              <el-form-item for="content" label="内容">
                <textarea v-model="content" id="content"></textarea>
              </el-form-item> 
            </el-form>  
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="sendEmail">发送邮件</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
          </span>
        </el-dialog>
      </template>
    </el-table-column>
    </el-table>
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
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="projectName"
      label="项目名称">
    </el-table-column>
  </el-table>
  </el-tab-pane>

  <el-tab-pane label="已申请培训">
    <el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="培训内容" name="1">
      <div>
    <h2>Files:</h2>
    <ul>
      <li v-for="file in files" :key="file.name">
        <a :href="file.url" :download="file.name">{{ file.name }}</a>
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
  export default {
    data() {
      return {
        trainProject: [{
          number: '1',
          name: '专业知识培训1',
          introduce: '包括各种设备的结构原理，如基础架构、工作原理、控制系统、监测办法等',
          tag: '箱体设备'
        }, {
          number: '2',
          name: '作业规程培训1',
          introduce: '包括设备操作、运行管理、安装维修、维护保养的标准作业规程等',
          tag: '食品检测设备'
        }, {
          number: '3',
          name: '作业规程培训2',
          introduce: '包括设备操作、运行管理、安装维修、维护保养的标准作业规程等',
          tag: '环境检测设备'
        }, {
          number: '4',
          name: '技能培训1',
          introduce: '技能培训包括检测技能、故障解决能力、维修技能、创新改进能力等',
          tag: '环境检测设备'
        }],
        files: [
      { name: 'File 1', url: 'https://example.com/file1.pdf' },
      { name: 'File 2', url: 'https://example.com/file2.doc' },
      { name: 'File 3', url: 'https://example.com/file3.txt' },
        ],
        activeNames: ['1'],
        trainRecords: [{
          date: '2016-05-03',
          name: '王小虎',
          projectName: '作业规程培训2'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          projectName: '专业知识培训1'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          projectName: '作业规程培训3'
        }, ],
        dialogVisible: false,
        recipient: '',
        subject: '',
        content: ''
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

</style>