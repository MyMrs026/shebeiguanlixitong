<template>
  <div class="noticeDetail">
    <div class="noticeTitle">
      <p>{{ notice.title }}</p>
    </div>
    <div class="noticeContent">
      <p>{{ notice.content }}</p>
    </div>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      notice: {},
    }
  }, 
  methods: {

  },
  mounted() {
    const notice_id = this.$route.params.id;
    console.log(notice_id);
    // 根据公告ID获取公告详情的代码逻辑...
    this.notice = this.$store.state.notices[notice_id]
    console.log(notice);
  },
 
}

</script>
<style scoped>
.noticeDetail{
  margin: 10px;
  border: 1px solid #000;
  border-radius: 8px;
  width: 80%;
  height: auto;
}
.noticeTitle{
  margin-top: 20px;
  border-bottom: 1px solid #000;
  text-align: center;
  align-items: center;
}
.noticeContent{
  margin: 20px;
}
</style>