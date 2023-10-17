<template>
  <div class="noticeDetail">
    <div class="noticeTitle">
      <el-row>
        <el-col :span="1"><i class="el-icon-back" @click="backClick"></i></el-col>
        <el-col :span="23"><p>{{ notice.title }}<br>日期:{{this.notice.createTime | formatDate}}</p></el-col>
      </el-row>
    </div>
    <div class="contentContainer">
      <div class="noticeContent">
        <p>{{ notice.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from "../../network/notice";
export default {
  data() {
    return {
      notice: {},
    };
  },
  methods: {
    backClick() {
      console.log("back is underClick");
      this.$router.back()
    }
  },
  mounted() {
    // 通过传递的路由参数与公告信息的id相匹配
    const notice_id = this.$route.params.id;
    console.log(notice_id);
    // 根据公告ID获取公告详情的代码逻辑...
    // this.notice = this.$store.state.notices[notice_id - 1]
    getNoticeList().then(res=>{
      const data = res.data;
      const sortedData = data.sort((a,b)=>a.noticeId - b.noticeId);
      // console.log(sortedData);
      this.notice = sortedData[ notice_id - 1];
      this.notice.publishDate = new Date((this.notice.publishDate).substring(0,10));
      console.log(this.notice);
    })
  },
  filters: {
    //处理日期的显示格式问题，使日期以xxxx年xx月xx日的形式显示
    formatDate: function (value) {
      // if (!value) return "";
      // const year = value.getFullYear();
      // const month = String(value.getMonth() + 1).padStart(2, "0");
      // const day = String(value.getDate()).padStart(2, "0");
      // return `${year}年${month}月${day}日`;
      return new Date(value).toLocaleDateString();
    },
  },
};
</script>
<style scoped>

.el-icon-back{
  display: flex;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}
.contentContainer{
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100vh; /* 可根据需要调整高度 */
}
.noticeDetail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 将背景容器放置在最底层 */
  overflow: hidden; /* 隐藏溢出的内容 */
  background-image: url("../../assets/img/qqq6.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.noticeTitle {
  margin-top: 20px;
  border-bottom: 1px solid #000;
  text-align: center;
  align-items: center;
}
.noticeContent {
  text-align: left;
  width: 80%;
  text-indent: 2em;
  line-height: 250%;
}
</style>