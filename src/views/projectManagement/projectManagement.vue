<template>
    <div class="outer-container">
        <div class="bg-pro">
            <div class="project">
                <!-- 上半区域 -->
                <div class="top_part">
                    <div class="pro_font">
                        <p>所有项目</p>
                    </div>
                    <!-- 选择器，选择列表为项目的类别 -->
                    <!-- <div class="pro_selector">
                        <el-select v-model="value" placeholder="请选择" style="width: 150px;">
                            <el-option v-for="item in pro_options" :key="item.value" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div> -->
                    <!-- 根据选择的项目类别，以表格显示该类别下所有的项目信息 -->
                    <div class="table_inform">
                        <el-table :data="projectList" style="width: 100%;margin:30px;border: 1px solid rgb(255, 255, 255);
border-radius: 6px;">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <!-- 表格中数据的详细信息在这展示 -->
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="项目名称:">
                                            <span>{{ props.row.name }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目类别:">
                                            <span>{{ props.row.category }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目编号:">
                                            <span>{{ props.row.id }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目描述:">
                                            <span>{{ props.row.desc }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目目的:">
                                            <span>{{ props.row.purpose }}</span>
                                        </el-form-item>
                                        <el-form-item label="使用设备:">
                                            <span>{{ props.row.equp }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目成员:">
                                            <span>{{ props.row.member }}</span>
                                        </el-form-item>
                                        <el-form-item label="项目组长:">
                                            <span>{{ props.row.leader }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label="编号" type="index">
                            </el-table-column>
                            <el-table-column label="项目名称" prop="projectName">
                            </el-table-column>
                            <el-table-column label="项目目的" prop="projectTarget">
                            </el-table-column>
                            <el-table-column label="项目组长" prop="leader">
                            </el-table-column>
                            <el-table-column label="电话" prop="tel">
                            </el-table-column>
                            <el-table-column label="创建时间" prop="createTime">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!-- 下半区域 -->
                <hr style="border: 1px solid white; margin-left: 10px; margin-right: 10px" />
                <div class="bottom_part">
                    <div class="pro_font">
                        <p>新建项目</p>
                    </div>
                    <!-- <form>
                        <tr>
                            <div style="width: 55%;display:fixed;margin:10px;top:0px;float:left">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                                    class="demo-ruleForm">
                                    <el-form-item label="项目名称" prop="name" style="margin-top: 10px;">
                                        <el-input v-model="ruleForm.name" style="width: 100%;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="项目类别" prop="category">
                                        <el-select v-model="ruleForm.category" placeholder="请选择项目的类别" style="width: 100%;">
                                            <el-option label="Ⅰ类" value="Ⅰ类"></el-option>
                                            <el-option label="Ⅱ类" value="Ⅱ类"></el-option>
                                            <el-option label="Ⅲ类" value="Ⅲ类"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="项目描述" prop="desc">
                                        <el-input v-model="ruleForm.desc" style="width: 100%;"></el-input>
                                    </el-form-item>

                                    <el-form-item label="实验设备" prop="equ_value">
                                        <el-select v-model="ruleForm.equ_value" multiple placeholder="请选择实验所需的设备"
                                            style="width: 100%;">
                                            <el-option v-for="item in pro_equps" :key="item.deviceName"
                                                :label="item.deviceName" :value="item.deviceName">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="实验目的" prop="purpose">
                                        <el-input v-model="ruleForm.purpose" style="width: 100%;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="成员" prop="member">
                                        <el-input v-model="ruleForm.member" style="width: 100%;"></el-input>
                                    </el-form-item>
                                    <el-form-item label="组长" prop="leader">
                                        <el-input v-model="ruleForm.leader" style="width: 100%;"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                    </el-form-item>
                                </el-form>
                            </div>

                            <div style="width:40%;float:right;">
                                <img src="../../assets/img/device.png"
                                    style="width:500px;margin-top:100px;text-align:center;margin-left:70px;">
                            </div>

                        </tr>
                    </form> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getEquList } from '../../network/equpment'
import { getProjectList, getProjectDetail, getProjectTypeList } from '../../network/project'
export default {
    data() {
        return {
            //项目列表
            projectList: []
        }
    },
    created() {
        getProjectList().then((res) => {
            this.projectList = res.data
        })
    },
    mounted() {
        //获取所有的设备信息
        getEquList().then(res => {
            this.pro_equps = res.data
        })
        //获取所有项目的信息
        this.proData = this.$store.state.proData;
    },
    computed: {
        //这里是上半部分通过选择项目类别筛选出所显示的项目
        filteredData() {
            return this.proData.filter((item) => item.category === this.value);
        },
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //成功提交
                    console.log("成功提交");
                    console.log(this.ruleForm);
                    this.$store.state.proData.push({ ...this.ruleForm });
                    console.log(this.proData);
                    this.ruleForm = {
                        name: '',
                        category: '',
                        desc: '',
                        equ_value: '',
                        purpose: '',
                        member: '',
                        leader: '',
                        selectedEquipments: [],
                    }
                } else {
                    alert("请填写完整")
                    return false;
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
}

</script>
<style scoped>
.outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    /* 居中 */
    height: 100%;
}

.bg-pro {
    display: flex;
    flex-direction: column;
    background-image: url("../../assets/img/qqq6.png");
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
}

.project {
    height: 100%;
    overflow-y: auto;
}

.demo-table-expand {
    margin-left: 70px;
    font-size: 0;
}

.demo-table-expand label {
    width: 90px;
    color: #ffffff;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.top_part {
    width: 91%;
    height: auto;
    margin-left: 20px;
}

.bottom_part {
    width: 90%;
    height: 850px;
    margin: 20px;
}

.pro_font {
    margin: 10px;
    width: 100%;
    margin-left: 30px;
    line-height: 55px;
    font-size: 20px;

}

.pro_selector {
    margin: 30px;
}

div /deep/ .el-form-item__label {
    color: rgb(108, 108, 108);
}

div /deep/ .el-button.el-button--primary {
    background-color: rgb(116, 149, 234);
    border-color: rgb(116, 149, 234);
}
</style>