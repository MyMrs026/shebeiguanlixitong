<template>
    <div>
      <el-table :data="currentPageData" v-loading="loading" style="width: 100%" :row-key="row => row.id" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 动态列的插槽 -->
        <slot name="columns"></slot>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]" :page-size="itemsPerPage" :total="data.length"></el-pagination>
    </div>
  </template>
  
<script>
export default {
    props: {
        data: Array,
        itemsPerPage: Number
    },
    data() {
        return {
            currentPageData: [],
            loading: false
        };
    },
    methods: {
        handleSelectionChange(selection) {
            // 处理选中的数据，可以将选中的数据传递给父组件
            this.$emit('selection-change', selection);
        },
        handleSizeChange(size) {
            // 处理每页显示的条数变化
            this.itemsPerPage = size;
        },
        handleCurrentChange(currentPage) {
            // 处理当前页数变化
            const start = (currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.currentPageData = this.data.slice(start, end);
        }
    },
    watch: {
        data: {
            handler() {
                // 数据变化时重新计算当前页数据
                this.handleCurrentChange(1);
            },
            immediate: true
        }
    }
};
</script>