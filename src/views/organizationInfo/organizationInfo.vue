<template>
    <el-descriptions class="margin-top" title="组织信息" :column="3" :size="size" border>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        机构名
      </template>
      kooriookami
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        联系方式
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        地区
      </template>
      苏州市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">公司</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
      江苏省苏州市吴中区吴中大道 1188 号
    </el-descriptions-item>
</el-descriptions>
</template>
<script>
  export default {
    data () {
      return {
        size: ''
      };
    }
  }
</script>
<style scoped>
</style>
