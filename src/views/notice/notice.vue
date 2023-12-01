<template>
  <div class="outer-container">
    <div class="sidebar">
      <el-card class="box-card">
        <h3 class="catalog_title">通知公告</h3>
        <div id="wp_news_w7">
          <ul class="news">
            <li v-for="item in paginatedData" :key="item.notice_id" style="cursor: pointer">
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
      </el-card>

    </div>
    <div class="box-wrap">
      <div class="box-main">
        <div class="right-box-main" frag="面板6">
          <div frag="窗口6" portletmode="simpleColumnAttri">
            <h3 class="catalog_title">公告列表</h3>
          </div>
          <div frag="窗口8" class="frog">
            <div class="right_content" frag="窗口7" portletmode="simpleList">
              <div id="wp_news_w7">
                <ul class="news">
                  <li v-for="item in paginatedData" :key="item.notice_id" style="cursor: pointer">
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
                  <el-select v-model="perPage" @change="updatePagination" style="width: 63px;">
                    <el-option value="5">5</el-option>
                    <el-option value="10">10</el-option>
                    <el-option value="15">15</el-option>
                  </el-select>
                  总页数: {{ totalPages }}
                </span>
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
                  <el-input type="text" v-model.number="goToPageNumber" style="width: 80px;" />
                  <el-button type="success" @click="goToPage" round style="margin-left: 10px;">确定</el-button>
                </span>
              </div>
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
      publish_date: "",
    };
  },
  created() {

  },
  mounted() {
    getNoticeList().then(res => {
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
      return new Date(value).toLocaleDateString();
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
  },
};
</script>
<style scoped>
.outer-container {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 80%;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 75%;
  margin-top: 18px;
  margin-right: 20px;
  padding-left: 10px;
  /* border: 1px solid #000; */
}

.box-card {
  height: 100%;
}

.box-wrap {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  padding-bottom: 4px;
  width: 70%;
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
  border: 1px solid rgb(255, 252, 252);
  border-radius: 8px;
  background-color: white;
  z-index: 0;
  padding: 20px;
}

.news {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #4d4d4d;
  padding: 0px;
  list-style-type: none;
  margin: 10px 0;
}

.notice_content {
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

.pagination span {
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

div /deep/ .el-button--success {
  background-color: #7498db;
  border-color: #7498db;
}

div /deep/ .el-button--success.is-plain {
  background-color: #7498db;
  border-color: #7498db;
  color: rgb(255, 255, 255);
}
</style>