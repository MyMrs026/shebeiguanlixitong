<template>
  <div>
    <div class="box-wrap">
      <div class="box-main">
        <div class="right-box-main" frag="面板6">
          <div frag="窗口6" portletmode="simpleColumnAttri">
            <h2 class="catalog_title">公告</h2>
          </div>
          <div frag="窗口8">

          </div>
          <div class="right_content" frag="窗口7" portletmode="simpleList">
            <div id="wp_news_w7">
              <ul class="news">
                <li v-for="item in notices">
                  <a href="#" target="_blank" title="item.content">
                    <font style="font-weight:bold;color:#000000;">{{item.content}}</font>
                    <font>{{item.date | formatDate}}</font>
                  </a>
                </li>
                <!-- <li><a href="#" target="_blank" title="2023年浙江大学全球人才招聘，欢迎加盟!">
                    <font style="font-weight:bold;color:#000000;">2023年浙江大学全球人才招聘，欢迎加盟!</font>
                  </a>[2023-07-05]</li>
                <li><a href="#" target="_blank" title="浙江大学2023年行政专员、技术专员公开招聘公告">
                    <font style="font-weight:bold;">浙江大学2023年行政专员、技术专员公开招聘公告</font>
                  </a>[2023-04-10]</li>
                <li><a href="#" target="_blank" title="浙江大学全球人才招聘，欢迎加盟!">浙江大学全球人才招聘，欢迎加盟!</a>[2022-12-20]</li>
                <li><a href="#" target="_blank" title="浙江大学计划财务处公开招聘技术专员启事">浙江大学计划财务处公开招聘技术专员启事</a>[2023-04-28]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学超重力研究中心2023年上半年实验技术岗位公开招聘公告">浙江大学超重力研究中心2023年上半年实验技术岗位公开招聘公...</a>[2023-04-10]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学图书资料报废处置招标公告（20230404）">浙江大学图书资料报废处置招标公告（20230404）</a>[2023-04-06]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学2023年技术专员岗位公开招聘拟录用人员公示（三）">浙江大学2023年技术专员岗位公开招聘拟录用人员公示（三）</a>[2023-03-23]</li>
                <li><a href="#" target="_blank" title="浙江大学2023年拟录用人员名单公示（四）">浙江大学2023年拟录用人员名单公示（四）</a>[2023-03-23]</li>
                <li><a href="#" target="_blank"
                    title="关于浙江大学2023年党政管理人员招聘拟录用名单的公示">关于浙江大学2023年党政管理人员招聘拟录用名单的公示</a>[2023-03-06]</li>
                <li><a href="#" target="_blank"
                    title="关于浙江大学2023年专职辅导员招聘拟录用名单的公示">关于浙江大学2023年专职辅导员招聘拟录用名单的公示</a>[2023-03-06]</li>
                <li><a href="#" target="_blank" title="浙江大学2022年拟录用人员名单公示（二十一）">浙江大学2022年拟录用人员名单公示（二十一）</a>[2022-12-22]
                </li>
                <li><a href="#" target="_blank" title="国际教育学院面向海内外招聘英才">国际教育学院面向海内外招聘英才</a>[2022-12-16]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学国际化雇员全球招聘启事 Zhejiang University International Job Opportunities">浙江大学国际化雇员全球招聘启事 Zhejiang
                    University Inter...</a>[2022-12-15]</li>
                <li><a href="#" target="_blank" title="浙江大学2022年拟录用人员名单公示（二十）">浙江大学2022年拟录用人员名单公示（二十）</a>[2022-12-07]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学建筑设计研究院公开招聘高级专业技术人员启事">浙江大学建筑设计研究院公开招聘高级专业技术人员启事</a>[2022-12-06]</li>
                <li><a href="#" target="_blank"
                    title="浙江大学2023年党政管理人员和专职辅导员招聘启事">浙江大学2023年党政管理人员和专职辅导员招聘启事</a>[2022-11-17]</li> -->
              </ul>
            </div>

            <div id="wp_paging_w7">
              <ul class="wp_paging clearfix">
                <li class="pages_count">
                  <span class="per_page">每页&nbsp;<em class="per_count">10</em>&nbsp;记录&nbsp;</span>
                  <span class="all_count">总共&nbsp;<em class="all_count">30</em>&nbsp;记录&nbsp;</span>
                </li>
                <li class="page_nav">
                  <a class="first" href="#" target="_self"><span>第一页</span></a>
                  <a class="prev" href="#" target="_self"><span>&lt;&lt;上一页</span></a>
                  <a class="next" href="#" target="_self"><span>下一页&gt;&gt;</span></a>
                  <a class="last" href="#" target="_self"><span>尾页</span></a>
                </li>
                <li class="page_jump">
                  <span class="pages">页码&nbsp;<em class="curr_page">1</em>/<em class="all_pages">2</em></span>
                  <span><input class="pageNum" type="text"><input type="hidden" class="currPageURL" value=""></span>
                  <span><a class="pagingJump" href="#" target="_self">跳转到&nbsp;</a></span>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="list_page" id="list_page"> <a href="/c20968/catalog.html">第一页</a> 上一页 <a href="/c20968/catalog_1.html" > 下一页</a> <a href="/c20968/catalog_682.html"> 尾页</a> <span>当前：1/683 页</span> </div>
          -->
        </div>
      </div>


    </div>

    <div class="box-bottom">
      <div class="publish_label">
        <p> 编辑公告内容 </p>
      </div>
      <div class="publish_input">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
        </el-input>
      </div>
      <div class="publish_button">
        <el-button plain>发布公告</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      textarea: '',
      notices:[],
    }
  },
  mounted() {
    this.notices = this.$store.state.notices;
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
}

</script>
<style scoped>
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
  color: #C00;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
  color: #494949;
  float: right;
}

.pages_count {
  list-style: none;
  font-size: 13px;
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
  color: #494949;
  list-style-type: none;
  line-height: 25px;
  font-style: normal;
}

.all_pages {
  list-style: none;
  font-size: 13px;
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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
.publish_label{
  margin:8px ;
}

.publish_input{
  margin: 8px;
  width: 65%;
}

.publish_button{
  margin: 8px;
}

.pagingJump {
  list-style: none;
  font-family: 'Microsoft Yahei', Verdana, Geneva, sans-serif;
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