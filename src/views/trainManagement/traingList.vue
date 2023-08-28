<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="培训内容" name="1">
        <div>
          <h2>文档:</h2>
          <ul>
            <li v-for="file in files" :key="file.name">
              <a :href="file.url" :download="file.name">{{ file.name }}</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>视频列表：</h2>
          <ul>
            <li v-for="video in videos" :key="video.id">
              <a :href="video.url" target="_blank" rel="noopener">{{
                video.name
              }}</a>
            </li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item title="考核指标" name="2">
        <div>活着就好【双手合十】</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeNames: ["1"],
      files: [
        { name: "File 1", url: "https://example.com/file1.pdf" },
        { name: "File 2", url: "https://example.com/file2.doc" },
        { name: "File 3", url: "https://example.com/file3.txt" },
      ],
      videos: [
        { id: 1, name: "Video 1", url: "https://example.com/video1.mp4" },
        { id: 2, name: "Video 2", url: "https://example.com/video2.mp4" },
        { id: 3, name: "Video 3", url: "https://example.com/video3.mp4" },
      ],
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  computed:{

  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>
<style scope>
</style>