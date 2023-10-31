<template>
<div class="outer-container">
  <div class="background-container">
    <div class="container">
    <!-- 上半部分为所有公告信息 -->
    <div class="box-wrap">
      <div class="box-main">
        <div class="right-box-main" frag="面板6">
          <div frag="窗口6" portletmode="simpleColumnAttri">
            <h3 class="catalog_title">公告列表</h3>
          </div>
          <div frag="窗口8" class="frog">
          <div class="right_content" frag="窗口7" portletmode="simpleList">
            <!-- 此处是公告信息列表的展示，此时数据来源vuex中，后续要使用数据库中的数据 -->
            <div id="wp_news_w7" v-if="this.$store.state.cu_role === 'admin'">
              <ul class="news">
                <li
                  v-for="item in paginatedData"
                  :key="item.notice_id"
                  style="cursor: pointer">
                  <div style="display: flex; flex-direction: row;">
                    <div class="notice_content" @click="gotoNoticeDetail(item.noticeId)">
                      <font>{{ item.title }}</font>
                      <!-- 日期的显示格式:xxxx年xx月xx日 -->
                      <font>{{ item.createTime | formatDate }}</font>
                    </div>
                    <div class="notice_delete">
                      <el-button @click="noticeDel" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div id="wp_news_w7" v-if="this.$store.state.cu_role === 'staff'">
              <ul class="news">
                <li
                  v-for="item in paginatedData"
                  :key="item.notice_id"
                  style="cursor: pointer">
                  <div style="display: flex; flex-direction: row;">
                    <div class="notice_content" @click="gotoNoticeDetail(item.noticeId)">
                      <font>{{ item.title }}</font>
                      <!-- 日期的显示格式:xxxx年xx月xx日 -->
                      <font>{{ item.createTime | formatDate }}</font>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 以下为分页逻辑，包括显示总页数、翻页等 -->
            <div class="pagination">
              <span>
                每页数量：
                <el-select v-model="perPage" @change="updatePagination" style="width: 100px;">
                  <el-option value="5">5</el-option>
                  <el-option value="10">10</el-option>
                  <el-option value="15">15</el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;&nbsp;总页数: {{ totalPages }}&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <!-- <span>
                &nbsp;&nbsp;&nbsp;&nbsp;总页数: {{ totalPages }}&nbsp;&nbsp;&nbsp;&nbsp;
              </span> -->
              <span>
                <el-button round @click="goToFirstPage" :disabled="currentPage === 1">
                  第一页
                </el-button>
              </span>
              <span>
                <el-button round @click="previousPage" :disabled="currentPage === 1">
                前一页
                </el-button>
              </span>
              <span>
                <el-button round @click="nextPage" :disabled="currentPage === totalPages">
                下一页
                </el-button>
              </span>
              <span>
                <el-button round @click="goToLastPage" :disabled="currentPage === totalPages">
                最后
                </el-button>
              </span>
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;跳转到第：
                <el-input type="text" v-model.number="goToPageNumber" style="width: 80px;"/>
                <el-button type="success" @click="goToPage" round style="margin-left: 10px;">确定</el-button>
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部分为编辑公告内容，只有用户为管理员时才能显示 -->
    <div class="box-wrap" v-if="this.$store.state.cu_role === 'admin'">
      
      <div class="box-main">
        <div class="right-box-main">
          <div class="catalog_title">
            <p>编辑公告内容</p>
          </div>
          <div class="publish_notice_title">
            <el-input 
              placeholder="在此输入公告标题" 
              v-model="notice_title" 
              clearable
              style="width: 50%;"
              >
            </el-input>
          </div>
          <div class="publish_notice_date">
            <div class="block">
              <el-date-picker
                v-model="publish_date"
                value-format="yyyy-MM-dd"
                @input = "handleInput"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                style="width: 50%;">
              </el-date-picker>
            </div>
          </div>
          <div class="publish_notice_content">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="在此输入公告内容"
              v-model="notice_content"
              style="width: 100%;"
            >
            </el-input>
          </div>
          <div class="publish_button">
            <el-button plain type="success" @click="publishButton">发布公告</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getNoticeList,publishNotice } from "../../network/notice";
export default {
  data() {
    return {
      noticesCount: 0,
      notice_title: "",
      notice_content: "",
      notices: [],
      currentPage: 1,
      perPage: 5,
      goToPageNumber: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      publish_date:"",
    };
  },
  created() {
  
  },
  mounted() {
    getNoticeList().then(res=>{
      this.notices = res.data;
      console.log(this.notices);
    })
  },
  computed: {
    paginatedData() {
      const data = this.notices;
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return data.slice(startIndex, endIndex);
    },
    totalPages() {
      const data = this.notices;
      return Math.ceil(data.length / this.perPage);
    },
  },
  filters: {
    formatDate: function (value) {
      // if (!value) return "";
      // const year = value.getFullYear();
      // const month = String(value.getMonth() + 1).padStart(2, "0");
      // const day = String(value.getDate()).padStart(2, "0");
      // return `${year}年${month}月${day}日`;
      return new Date(value).toLocaleDateString();
    },
  },
  methods: {
    //跳转到公告信息详细的页面
    gotoNoticeDetail(id) {
      // console.log(id)
      this.$router.push({ path: `/notice/${id}` });
    },
    handleInput(value){
      const inputDate = new Date(value);
      if(isNaN(inputDate.getTime())){
        // 输入的不是有效日期，进行处理，例如重置日期选择器的值
      this.date = null;
      // 或者给出相应的提示
      // this.$message.error('请输入有效的日期');
      }
    },
    updatePagination() {
      this.currentPage = 1;
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    previousPage() {
      this.currentPage--;
    },
    nextPage() {
      this.currentPage++;
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
    goToPage() {
      const pageNumber = parseInt(this.goToPageNumber);
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
      this.goToPageNumber = "";
    },
    noticeDel() {
      //管理员删除公告逻辑
      this.$confirm('此操作将永久删除该条公告信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //发布公告的逻辑请求
    publishButton() {
      if(this.notice_content == '' || this.publish_date == '' || this.notice_title== ''){
        this.$alert('请输入完整', '填写不全', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `信息填写完整才能上传公告: ${ action }`
            });
          }
        })
      }else{
      // console.log(this.noticesCount);
      this.noticesCount = this.notices.length + 1;
      // console.log(this.noticesCount);
      publishNotice(this.notice_content,this.noticesCount,this.publish_date,this.notice_title)
        .then(res => {
        //处理返回的响应数据
        const data = res.data
        console.log(data);
        alert("发布成功");
        location.reload();
      }).catch(error=> {
        console.error(error);
      })
      this.noticesCount ++;
      }
    }
  },
};
</script>
<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; /* 居中 */
  height: 100%;
}
.background-container{
  display: flex;
  flex-direction: column;
  left: 0;
  width: 100%;
  /* overflow: hidden; 隐藏溢出的内容 */
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
}


.box-wrap {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  padding-bottom: 4px;
  background: 0px bottom no-repeat;
  overflow: hidden;
  /* border: 1px solid rgb(0, 0, 0);
  border-radius: 8px; */
}

.box-main {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  background: repeat-y;
  padding-top: 4px;
  overflow: auto;
  
}

.right-box-main {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  
  color: #444444;
}

.catalog_title {
  /* font-family: "Microsoft Yahei", Arial, "Simsun"; */
  margin-top: 15px;
  padding: 0px;
  list-style-type: none;
  line-height: 30px;
  color: rgb(62, 62, 62);
  font-size: 20px;
}

.right_content {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  clear: both;
  overflow: hidden;
  border:1px solid rgb(255, 252, 252);
  border-radius: 8px;
  background-color: white;
  z-index: 0;
  padding:20px;
}

.news {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #4d4d4d;
  padding: 0px;
  list-style-type: none;
  margin: 10px 0;
}

.notice_content{
  margin-right: 20px;
}

.wp_paging clearfix {
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 16px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  float: right;
}

#wp_news_w7 {
  font-size: 12px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
}

#wp_paging_w7 {
  font-size: 12px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
}

.pagination {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  font-size: 16px;
  color: #4f4f4f;
}

.pagination span{
  vertical-align: middle;
  display: inline-block;
}

.pagination button {
  margin-right: 5px;
  font-size: 16px;
}

.publish_notice_title {
  margin-top: 10px;
  margin-bottom: 10px;
}

.publish_notice_date {
  margin-top: 10px;
  margin-bottom: 10px;
}

.publish_notice_content {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

.publish_button {
  margin-top: 10px;
  margin-bottom: 10px;
}
div /deep/ .el-button--danger {
  background-color: #969696;
  border-color: #969696;
}
div /deep/ .el-button--success{
  background-color: #7498db;
  border-color: #7498db;
}
div /deep/ .el-button--success.is-plain{
  background-color: #7498db;
  border-color: #7498db;
  color:rgb(255, 255, 255);
}
</style>