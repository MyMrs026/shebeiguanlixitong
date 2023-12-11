<template>
  <div class="outer-container">
    <div class="sidebar">
      <el-card class="box-card">
        <h3 class="catalog_title">通知公告</h3>
        <ul class="news">
          <li
            v-for="item in notices"
            :key="item.notice_id"
            style="cursor: pointer"
            @click="displayNotice(item)"
          >
            <div style="display: flex; flex-direction: row">
              <div class="notice_content">
                {{ item.title }}
                {{ item.createTime | formatDate }}
              </div>
            </div>
          </li>
        </ul>
      </el-card>
    </div>
    <div class="content-area">
      <el-card v-if="selectedNotice">
        <h3>{{ selectedNotice.title }}</h3>
        <p>{{ selectedNotice.createTime | formatDate }}</p>
        <p>{{ selectedNotice.content }}</p>
      </el-card>
      <el-card v-else>
         <!-- 分页显示所有公告信息 -->
         <div v-for="notice in paginatedNotices" :key="notice.notice_id">
          <p>{{ notice.title }}</p>
          <p>{{ notice.createTime | formatDate }}</p>

        </div>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="notices.length"
        ></el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getNoticeList } from "../../network/notice";
export default {
  data() {
    return {
      notices: [],
      selectedNotice: null, // 用于存储选中的公告
      pageSize: 5,         // 每页显示数量
      currentPage: 1       // 当前页码
    };
  },
  methods: {
    //在右侧显示公告详细的信息
    displayNotice(notice) {
      this.selectedNotice = notice; // 根据点击的公告更新 selectedNotice
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; // 当每页显示数量改变时，回到第一页
    },
    handleCurrentChange(val) {
      this.currentPage = val; // 当前页码改变时更新当前页码
    }
  },
  computed:{
    paginatedNotices() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.notices.slice(startIndex, endIndex);
    }
  },
  mounted() {
    getNoticeList().then((res) => {
      this.notices = res.data;
      console.log(this.notices);
    });
  },
  filters: {
    formatDate: function (value) {
      return new Date(value).toLocaleDateString();
    },
  },
 
};
</script>
<style scoped>
.outer-container {
  display: flex;
  flex-direction: row;
  margin: 0 0;
  width: 100%;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 90%;
  margin-top: 18px;
  margin-right: 20px;
  padding-left: 10px;
  /* border: 1px solid #000; */
}

.content-area {
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 90%;
  margin-top: 18px;
  margin-right: 20px;
  padding-left: 10px;
  /* border: 1px solid #000; */
}

.box-card {
  height: 100%;
}

.catalog_title {
  margin-top: 15px;
  padding: 0px;
  list-style-type: none;
  line-height: 30px;
  color: rgb(62, 62, 62);
  font-size: 1.5rem;
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
  font-size: 1rem;
}
</style>