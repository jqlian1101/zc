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
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import logoImg from "assets/images/logo.png";
import defaultUser from "assets/images/logo2.png";

import { getUserInfo } from "utils/util";

export default {
    name: "Header",
    data() {
        return {
            logoImg,
            username: ""
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
            }
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
</style>
