<template>
  <div class="equpsBooksDetail">
    <div class="equpsBookTitle">
      <p>{{ equpsBook.title }}</p>
    </div>
    <div class="equpsBookContent">
      <p>{{ equpsBook.content }}</p>
    </div>
    <div>申请人：
      <p>{{equpsBook.user_id}}</p>
    </div>
    <div>使用时间：
      <p>{{equpsBook.date | formatDate}}</p>
    </div>
    <button>通过</button>
    <button>驳回</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      equpsBook: {},
    }
  },
  methods: {

  },
  mounted() {
    const equpsBook_id = this.$route.params.id;
    console.log(equpsBook_id);
    // 根据公告ID获取公告详情的代码逻辑...
    this.equpsBook = this.$store.state.equpsBooks[equpsBook_id - 1];
    // console.log(equpsBook);
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