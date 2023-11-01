<template>
    <div class="container">
        <div class="button-group">
            <el-button class="btn-left" @click="push('/train/security')">安全培训</el-button>
            <el-button class="btn-right" @click="push('/train/equipment')">设备培训</el-button>
        </div>
        <router-view></router-view>


    </div>
</template>
  
<script>
export default {
    methods: {
        push(to) {
            this.$router.push(to)
        }
    }
}
</script>
<style scoped>
.button-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-group .btn-left {
    width: 33.33%;
}

.button-group .btn-right {
    width: 33.33%;
}
</style>