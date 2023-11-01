<template>
    <div>
        <el-table ref="multipleTable" :data="currentPageData" v-loading="loading" style="width: 100%" :row-key="getRowKey"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
            <!-- 动态列的插槽 -->
            <slot name="columns"></slot>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 50]"
            :page-size="itemsPerPage" :total="data.length"></el-pagination>
    </div>
</template>
  
<script>
export default {
    props: {
        data: Array,
        itemsPerPage: Number,
        rowKeyField: String, // 接受字段名作为 prop
    },
    data() {
        return {
            currentPageData: [],
            loading: false,
        };
    },
    computed: {
        getRowKey() {
            // 使用动态字段名作为 row-key
            return (row) => row[this.rowKeyField];
        },
    },
    methods: {
        handleSelectionChange(selection) {
            this.$emit('selection-change', selection);
        },
        handleSizeChange(size) {
            this.itemsPerPage = size;
        },
        handleCurrentChange(currentPage) {
            const start = (currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            this.currentPageData = this.data.slice(start, end);
        },
        clearSelection() {
            this.$refs.multipleTable.clearSelection();
        },
    },
    watch: {
        data: {
            handler() {
                this.handleCurrentChange(1);
            },
            immediate: true,
        },
    },
};
</script>
  