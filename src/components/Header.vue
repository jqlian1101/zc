<template>
    <div :class="$style.root" class="clearfix">
        <!-- <div style="font-size:20px;color:#fff">header</div> -->

        <div :class="$style.logo" class="fll">
            <img :src="logoImg" alt />
        </div>
        <div :class="$style.title" class="fll">客运列车纵向动力学软件系统</div>
        <div :class="$style.user" class="flr">
            <el-dropdown
                :hide-on-click="false"
                :class="$style.dropdownWrap"
                @command="handleCommand"
            >
                <div>
                    <div :class="$style.avatar" class="fll">
                        <div :class="$style.imgWrap">
                            <div v-if="username">{{userAvatar}}</div>
                            <img v-else :src="userAvatar" alt />
                        </div>
                    </div>
                    <div :class="$style.username" class="flr">{{username}}</div>
                </div>
                <el-dropdown-menu slot="dropdown" :class="$style.dropdownMenu">
                    <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog
            title="修改密码"
            :visible.sync="updatePwdDialog"
            :modal="false"
            @close="updatePwdDialog = false"
            :append-to-body="true"
            width="550px"
        >
            <div :class="$style.pwdInp">
                请输入原始密码：
                <el-input type="password" v-model="pwd.oldPassWord"></el-input>
            </div>
            <div :class="$style.pwdInp">
                请输入新密码：
                <el-input type="password" v-model="pwd.newPassWord"></el-input>
            </div>
            <div :class="$style.pwdInp">
                请再次输入新密码：
                <el-input type="password" v-model="pwd.repPwd"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="updatePwdDialog = false">取 消</el-button>
                <el-button type="primary" @click="onUpdatePwd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import logoImg from "assets/images/logo.png";
import defaultUser from "assets/images/logo2.png";

import { getUserInfo } from "utils/util";

import { login } from "api";

export default {
    name: "Header",
    data() {
        return {
            logoImg,
            username: "",

            updatePwdDialog: false,
            pwd: { oldPassWord: "", newPassWord: "", repPwd: "" }
            // userAvatar: logoImg
        };
    },
    computed: {
        userAvatar() {
            let { username } = this;
            if (!username) return defaultUser;
            return username.substring(0, 1);
        }
    },
    props: {
        msg: String
    },
    mounted() {
        let userInfo = getUserInfo();
        let { name = "" } = userInfo;
        this.username = name;
    },
    methods: {
        handleCommand(command) {
            if (command === "logout") {
                this.$router.push("/login");
            } else if (command === "changePwd") {
                this.updatePwdDialog = true;
            }
        },

        onUpdatePwd() {
            console.log("changePwd", this.pwd);
            const { oldPassWord, newPassWord, repPwd } = this.pwd;

            if (!oldPassWord) {
                return this.$message.error("请输入原密码");
            }

            if (newPassWord && repPwd !== newPassWord) {
                return this.$message.error("两次输入的密码不相同");
            }

            if (newPassWord.length < 6) {
                return this.$message.error("新密码长度至少六位");
            }

            const params = {
                userName: this.username,
                oldPassWord,
                newPassWord
            };

            login.updatePwd(params).then(res => {
                if (!res || res.code !== "200") return;

                this.$message.success("操作成功，请重新登录");
                setTimeout(() => {
                    this.$router.push("/login");
                }, 1500);
            });
        }
    }
};
</script>

<style module lang="scss">
$user-img-h: 48px;
$font-color: #fff;

.root {
    width: 100%;
    height: $header-H;
    .logo {
        width: 144px;
        height: 44px;
        margin-top: 12px;
        margin-right: 12px;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .title {
        height: $header-H;
        line-height: $header-H;
        font-size: 24px;
        color: $font-color;
    }

    .user {
        margin-top: 10px;
        line-height: $user-img-h;
        div {
            display: inline-block;
        }
    }

    .avatar {
        width: $user-img-h;
        height: $user-img-h;
        border-radius: 50%;
        background-color: #3d94b6;
        margin-right: 10px;
        padding: 5px;
        .imgWrap {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            div {
                width: 100%;
                line-height: 38px;
                font-size: 26px;
                color: #fff;
                text-align: center;
            }
        }
    }

    .username {
        font-size: 18px;
        color: $font-color;
    }

    .dropdownWrap {
        height: 48px;
    }
}

.dropdownMenu {
    width: 150px;
    text-align: center;
}

.pwdInp {
    &:not(:last-child) {
        margin-bottom: 16px;
    }
}
</style>
