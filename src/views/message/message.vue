<template>
  <div class="outer-container">
    <div class="bg-message">
      <div class="box-wrap">
        <div class="box-main">
          <el-tabs type="border-card">
            <!-- <h2 >设备预约</h2> -->
            <el-tab-pane
              label="设备预约"
              class="catalog_title"
            >
              <div id="wp_news_w7">
                <ul class="news">
                  <li
                    v-for="item in this.equpsBooks"
                    :key="item.equpsBook_id"
                    @click="gotoMessageDetail(item.equpsBook_id)"
                    style="cursor: pointer"
                  >
                    <p>
                      <font>{{ item.title }}</font>
                      <font>{{ item.date | formatDate }}</font>
                    </p>
                  </li>
                </ul>
              </div>

              <div id="wp_paging_w7">
                <ul class="wp_paging clearfix">
                  <li class="pages_count">
                    <span class="per_page">每页&nbsp;<em class="per_count">10</em>&nbsp;记录&nbsp;</span>
                    <span class="all_count">总共&nbsp;<em class="all_count">30</em>&nbsp;记录&nbsp;</span>
                  </li>
                  <li class="page_nav">
                    <a
                      class="first"
                      href="#"
                      target="_self"
                    ><span>第一页</span></a>
                    <a
                      class="prev"
                      href="#"
                      target="_self"
                    ><span>&lt;&lt;上一页</span></a>
                    <a
                      class="next"
                      href="#"
                      target="_self"
                    ><span>下一页&gt;&gt;</span></a>
                    <a
                      class="last"
                      href="#"
                      target="_self"
                    ><span>尾页</span></a>
                  </li>
                  <li class="page_jump">
                    <span class="pages">页码&nbsp;<em class="curr_page">1</em>/<em class="all_pages">2</em></span>
                    <span><input
                        class="pageNum"
                        type="text"
                      /><input
                        type="hidden"
                        class="currPageURL"
                        value=""
                      /></span>
                    <span><a
                        class="pagingJump"
                        href="#"
                        target="_self"
                      >跳转到&nbsp;</a></span>
                  </li>
                </ul>
              </div>

              <!-- <div class="list_page" id="list_page"> <a href="/c20968/catalog.html">第一页</a> 上一页 <a href="/c20968/catalog_1.html" > 下一页</a> <a href="/c20968/catalog_682.html"> 尾页</a> <span>当前：1/683 页</span> </div>
          -->
            </el-tab-pane>
            <el-tab-pane label="培训预约">
              <div id="wp_news_w7">
                <ul
                  class="news"
                  style="line-height: 30px"
                >
                  <li
                    v-for="item in this.trainBooks"
                    :key="item.trainBook_id"
                    @click="gotoTrainBooksDetail(item.trainBook_id)"
                    style="cursor: pointer"
                  >
                    <p>
                      <font>{{ item.title }}</font>
                      <font>{{ item.date | formatDate }}</font>
                    </p>
                  </li>
                </ul>
              </div>

              <div id="wp_paging_w7">
                <ul class="wp_paging clearfix">
                  <li class="pages_count">
                    <span class="per_page">每页&nbsp;<em class="per_count">10</em>&nbsp;记录&nbsp;</span>
                    <span class="all_count">总共&nbsp;<em class="all_count">30</em>&nbsp;记录&nbsp;</span>
                  </li>
                  <li class="page_nav">
                    <a
                      class="first"
                      href="#"
                      target="_self"
                    ><span>第一页</span></a>
                    <a
                      class="prev"
                      href="#"
                      target="_self"
                    ><span>&lt;&lt;上一页</span></a>
                    <a
                      class="next"
                      href="#"
                      target="_self"
                    ><span>下一页&gt;&gt;</span></a>
                    <a
                      class="last"
                      href="#"
                      target="_self"
                    ><span>尾页</span></a>
                  </li>
                  <li class="page_jump">
                    <span class="pages">页码&nbsp;<em class="curr_page">1</em>/<em class="all_pages">2</em></span>
                    <span><input
                        class="pageNum"
                        type="text"
                      /><input
                        type="hidden"
                        class="currPageURL"
                        value=""
                      /></span>
                    <span><a
                        class="pagingJump"
                        href="#"
                        target="_self"
                      >跳转到&nbsp;</a></span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import messageDetail from "./messageDetail.vue";
import trainBooksDetail from "./trainBooksDetail.vue";
export default {
  components: {
    messageDetail,
    trainBooksDetail,
  },
  data() {
    return {
      textarea: "",
      equpsBooks: [],
      trainBooks: [],
    };
  },
  mounted() {
    this.equpsBooks = this.$store.state.equpsBooks;
    this.trainBooks = this.$store.state.trainBooks;
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
    gotoMessageDetail(id) {
      if (this.$store.state.cu_role === "admin") {
        this.$router.push("/message/" + id);
      }
      // console.log(id);
    },
    gotoTrainBooksDetail(id) {
      if (this.$store.state.cu_role === "admin") {
        this.$router.push("/trainBook/" + id);
      }
      // console.log(id);
    },
  },
};
</script>
<style scoped>
.outer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto; 
  flex-direction: column;
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  width: 100%;
  background-size: 100% 100%;

}
.bg-message{
 
}
a {
  color: #262626;
  text-decoration: none;
}

.box-wrap {
  font-size: 12px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  padding-bottom: 4px;
  background: 0px bottom no-repeat;
  overflow: hidden;
}

.box-main {
  font-size: 12px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  background: repeat-y;
  padding-top: 1px;
  overflow: auto;
}

.right-box-main {
  font-size: 12px;
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
  font-size: 18px;
}

.right_content {
  font-size: 12px;
  font-family: "Microsoft Yahei", Arial, "Simsun";
  color: #262626;
  clear: both;
  overflow: hidden;
}

.news {
  font-size: 12px;
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
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  float: right;
}

.pages_count {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  float: left;
  margin-top: 5px;
}

.per_page {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  display: inline-block;
  float: left;
  margin-left: 10px;
}

.all_count {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  display: inline-block;
  float: left;
  margin-left: 10px;
}

.page_nav {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  float: left;
  margin-top: 5px;
}

.first {
  list-style: none;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  list-style-type: none;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  line-height: 25px;
  height: 25px;
}

.prev {
  list-style: none;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  list-style-type: none;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  line-height: 25px;
  height: 25px;
}

.next {
  list-style: none;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  list-style-type: none;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  line-height: 25px;
  height: 25px;
}

.last {
  list-style: none;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  list-style-type: none;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  line-height: 25px;
  height: 25px;
}

.page_jump {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  margin: 0px;
  padding: 0px;
  list-style-type: none;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  float: left;
  margin-top: 5px;
}

.pages {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  display: inline-block;
  float: left;
  margin-left: 10px;
}

.curr_page {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  font-style: normal;
}

.all_pages {
  list-style: none;
  font-size: 13px;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  font-style: normal;
}

.pageNum {
  list-style: none;
  list-style-type: none;
  font-size: 12px;
}

.currPageURL {
  list-style: none;
  list-style-type: none;
  font-size: 12px;
}
.publish_label {
  margin: 8px;
}

.publish_input {
  margin: 8px;
  width: 65%;
}

.publish_button {
  margin: 8px;
}

.pagingJump {
  list-style: none;
  font-family: "Microsoft Yahei", Verdana, Geneva, sans-serif;
  list-style-type: none;
  font-size: 12px;
  text-decoration: none;
  display: inline-block;
  float: left;
  margin-left: 10px;
  cursor: pointer;
  color: #666;
  line-height: 25px;
  height: 25px;
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
</style>