<template>
  <div class="trainBooksDetail">
    <div class="trainBookTitle">
      <p>{{ trainBook.title }}</p>
    </div>
    <!-- <div class="trainBookContent">
      <p>{{ trainBook.content }}</p>
    </div> -->
    <div>申请人：
      <p>{{trainBook.user_id}}</p>
    </div>
    <div>使用时间：
      <p>{{trainBook.date | formatDate}}</p>
    </div>
    <button>通过</button>
    <button>驳回</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      trainBook: {},
    }
  },
  methods: {

  },
  mounted() {
    const trainBook_id = this.$route.params.id;
    console.log(trainBook_id);
    // 根据公告ID获取公告详情的代码逻辑...
    this.trainBook = this.$store.state.trainBooks[trainBook_id - 1];
    // console.log(trainBook);
  },
  filters:{
    formatDate: function(value) {
      if (!value) return ''
      const year = value.getFullYear()
      const month = String(value.getMonth() + 1).padStart(2, '0')
      const day = String(value.getDate()).padStart(2, '0')
      return `${year}年${month}月${day}日`
    }
  },
};
</script>
<style scoped>
.noticeDetail {
  margin: 10px;
  border: 1px solid #000;
  border-radius: 8px;
  width: 80%;
  height: auto;
}
.noticeTitle {
  margin-top: 20px;
  border-bottom: 1px solid #000;
  text-align: center;
  align-items: center;
}
.noticeContent {
  margin: 20px;
}
</style>