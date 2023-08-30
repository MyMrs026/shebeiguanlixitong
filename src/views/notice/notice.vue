<template>
  <div class="background-container">
    <div class="container">
    <!-- 上半部分为所有公告信息 -->
    <div class="box-wrap">
      <div class="box-main">
        <div class="right-box-main" frag="面板6">
          <div frag="窗口6" portletmode="simpleColumnAttri">
            <h3 class="catalog_title">公&nbsp;告&nbsp;列&nbsp;表</h3>
          </div>
          <div frag="窗口8"></div>
          <div class="right_content" frag="窗口7" portletmode="simpleList">
            <!-- 此处是公告信息列表的展示，此时数据来源vuex中，后续要使用数据库中的数据 -->
            <div id="wp_news_w7" v-if="this.$store.state.cu_role === 'admin'">
              <ul class="news">
                <li
                  v-for="item in paginatedData"
                  :key="item.notice_id"
                  style="cursor: pointer">
                  <div style="display: flex; flex-direction: row;">
                    <div class="notice_content" @click="gotoNoticeDetail(item.notice_id)">
                      <font>{{ item.title }}</font>
                      <!-- 日期的显示格式:xxxx年xx月xx日 -->
                      <font>{{ item.date | formatDate }}</font>
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
                    <div class="notice_content" @click="gotoNoticeDetail(item.notice_id)">
                      <font>{{ item.title }}</font>
                      <!-- 日期的显示格式:xxxx年xx月xx日 -->
                      <font>{{ item.date | formatDate }}</font>
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
              style="width: 400px;"
              >
            </el-input>
          </div>
          <div class="publish_notice_date">
            <div class="block">
              <el-date-picker
                v-model="publish_date"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
          </div>
          <div class="publish_notice_content">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="在此输入公告内容"
              v-model="notice_content"
              style="width: 400px;"
            >
            </el-input>
          </div>
          <div class="publish_button">
            <el-button plain type="success">发布公告</el-button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from "../../network/notice";
export default {
  data() {
    return {
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
      publish_date:'',
    };
  },
  // created() {
  //   getNoticeList().then(res=>{
  //     console.log(res.data);
  //     this.notices = res.data;
  //     console.log(this.notices);
  //   })
  // },
  mounted() {
    this.notices = this.$store.state.notices;
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
      if (!value) return "";
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}年${month}月${day}日`;
    },
  },
  methods: {
    //跳转到公告信息详细的页面
    gotoNoticeDetail(id) {
      // console.log(id)
      this.$router.push({ path: `/notice/${id}` });
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
    }
  },
};
</script>
<style scoped>
.background-container{
  /* position: fixed; */
  /* top: 120px; */
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* 将背景容器放置在最底层 */
  overflow: hidden; /* 隐藏溢出的内容 */
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}

.box-wrap {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  padding-bottom: 4px;
  background: 0px bottom no-repeat;
  overflow: hidden;
  border: 1px solid black;
  border-radius: 8px;
}

.box-main {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  background: repeat-y;
  padding-top: 4px;
  overflow: auto;
  align-content: center;
}

.right-box-main {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  padding: 24px;
  color: #fff;
}

.catalog_title {
  font-family: "Microsoft Yahei", Arial, "Simsun";
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  line-height: 30px;
  color: rgb(255, 255, 255);
  font-size: 20px;
}

.right_content {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  clear: both;
  overflow: hidden;
}

.news {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #fff;
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
  color: #fff;
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
}

.publish_button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>