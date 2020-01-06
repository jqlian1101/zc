<template>
    <div :class="$style.root" class="clearfix">
        <ul :class="$style.menuWrap">
            <li
                :class="[$style.menuItem, getMenuItemStatus(item,'active')]"
                class="cursor-p"
                v-for="item in menuList"
                :key="item.menuId"
                @click="onClickMenuItem(item)"
            >
                <!-- src 临时方案，优化 -->
                <img
                    :src="active===item.menuId ? menuIcon[item.activeIcon] : menuIcon[item.icon]"
                    alt
                />
                <span :class="getMenuItemStatus(item, 'active')">{{ item.menuName }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getMenuList } from "utils/util";
import Icon from "assets/icon";

export default {
    name: "LeftMenu",
    data() {
        return {
            menuList: [],
            active: "",
            menuIcon: Icon
        };
    },
    methods: {
        getMenuItemStatus: function(item = {}, y = "", n = "") {
            return this.active === item.menuId ? y : n;
        },

        // 点击跳转
        onClickMenuItem: function(item) {
            if (item.menuId === this.active) return;
            this.active = item.menuId;
            this.$router.push(item.key);
        },

        // 初始化页面，默认选中
        initActive: function() {
            const { path } = this.$route;

            const curMenuItem = this.menuList.find(item => {
                return path.indexOf(item.key) !== -1;
            });

            curMenuItem && (this.active = curMenuItem.menuId);
        }
    },
    computed: {},
    mounted() {
        this.menuList = getMenuList();
        this.initActive();
    }
};
</script>

<style module lang="scss">
$user-img-h: 60px;
$font-color: #fff;
$active-color: #4baed0;

.root {
    width: 100%;
    height: 100%;
    overflow: auto;

    .menuWrap {
        margin-top: 4px;
        margin-bottom: $header-H;
        .menuItem {
            height: 56px;
            line-height: 56px;
            color: #fff;
            font-size: 16px;
            padding-left: 52px;
            position: relative;
            &.active {
                background: #fff;
            }
            img {
                width: 20px;
                height: 20px;
                vertical-align: sub;
                margin-right: 18px;
            }
            span {
                display: inline-block;
            }

            :global {
                span.active {
                    color: $active-color;
                }
            }
        }
        :global {
            li.active {
                background-color: #222632;
                &:before {
                    content: "";
                    display: inline-block;
                    width: 6px;
                    height: 100%;
                    background-color: $active-color;
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
}
</style>
