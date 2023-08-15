<template>
  <div>
    <!-- 上半部分为所有公告信息 -->
    <div class="box-wrap">
      <div class="box-main">
        <div class="right-box-main" frag="面板6">
          <div frag="窗口6" portletmode="simpleColumnAttri">
            <h3 class="catalog_title">公告</h3>
          </div>
          <div frag="窗口8"></div>
          <div class="right_content" frag="窗口7" portletmode="simpleList">
             <!-- 此处是公告信息列表的展示，此时数据来源vuex中，后续要使用数据库中的数据 -->
            <div id="wp_news_w7">
              <ul class="news">
                <li
                  v-for="item in paginatedData"
                  :key="item.notice_id"
                  @click="gotoNoticeDetail(item.notice_id)">
                  <a href="" target="" title="item.title">
                    <font style="font-weight: bold; color: #000000">{{
                      item.title
                    }}</font>
                    <!-- 日期的显示格式:xxxx年xx月xx日 -->
                    <font>{{ item.date | formatDate }}</font>
                  </a>
                </li>
              </ul>
            </div>
            <!-- 以下为分页逻辑，包括显示总页数、翻页等 -->
            <div class="pagination">
              <span>
                每页数量：
                <select v-model="perPage" @change="updatePagination">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </span>

              <span>总页数: {{ totalPages }}</span>

              <button @click="goToFirstPage" :disabled="currentPage === 1">
                第一页
              </button>
              <button @click="previousPage" :disabled="currentPage === 1">
                前一页
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages">
                下一页
              </button>
              <button
                @click="goToLastPage"
                :disabled="currentPage === totalPages">
                最后
              </button>

              <span>
                跳转到第：
                <input type="text" v-model.number="goToPageNumber" />
                <button @click="goToPage">确定</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部分为编辑公告内容，只有用户为管理员时才能显示 -->
    <div class="box-bottom" v-if="this.$store.state.cu_role === 'admin'">
      <div class="publish_label">
        <p>编辑公告内容</p>
      </div>
      <div class="publish_input">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div class="publish_button">
        <el-button plain>发布公告</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from "../../network/notice";
export default {
  data() {
    return {
      textarea: "",
      notices: [],
      currentPage: 1,
      perPage: 5,
      goToPageNumber: "",
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
      this.$router.push("/notice/" + id);
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
a {
  color: #262626;
  text-decoration: none;
}

.box-wrap {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  padding-bottom: 4px;
  background: 0px bottom no-repeat;
  overflow: hidden;
}

.box-main {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  background: repeat-y;
  padding-top: 1px;
  overflow: auto;
}

.right-box-main {
  font-size: 16px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  padding: 24px;
  color: #262626;
}

.catalog_title {
  font-family: "Microsoft Yahei", Arial, "Simsun";
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  line-height: 30px;
  color: #c00;
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
  color: #262626;
  padding: 0px;
  list-style-type: none;
  margin: 10px 0;
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
  margin-top: 10px;
  font-size: 16px;
}
.pagination button {
  margin-right: 5px;
  font-size: 16px;
}
</style>