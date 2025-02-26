<template>
    <view>
        <view class="custom-tab-bar">
            <view
                class="tab-bar-item"
                v-for="(item, index) in tabBarList"
                :key="index"
                :class="{ 'active': currentIndex === index }"
                @click="changeTab(index)"
                :style="{ 'padding-bottom': isPhoneX ? '44rpx' : '0rpx', 'height': isPhoneX ? '144rpx' : '100rpx' }"
            >
                <image :src="currentIndex === index ? item.selectedIconPath : item.iconPath"></image>
                <text :class="{ 'active': currentIndex === index }">{{ $t(item.textKey) }}</text>
            </view>
            <!-- 中间凸出的按钮 -->
            <view class="middle-button" @click="handleMiddleButtonClick" :style="{ bottom: isPhoneX ? '88rpx' : '44rpx' }">
                <image :src="currentIndex === 1 ? '/static/tabbar/jiutong-s.png' : '/static/tabbar/jiutong.png'"></image>
            </view>
        </view>
        <transition name="slide">
            <router-view></router-view> <!-- 添加过渡效果 -->
        </transition>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isPhoneX: getApp().globalData.isPhoneX,
            tabBarList: [
                {
                    "pagePath": "pages/Guqi/Guqi",
                    "textKey": "tabbar.Guqi",
                    "iconPath": "/static/tabbar/qi.png",
                    "selectedIconPath": "/static/tabbar/qi-s.png",
                    isRound: false
                },
                {
                    "pagePath": "pages/Customize/Customize",
                    "textKey": "tabbar.Customize",
                    "iconPath": "",
                    "selectedIconPath": "",
                    isRound: true
                },
                {
                    "pagePath": "pages/Mine/Mine",
                    "textKey": "tabbar.My",
                    "iconPath": "/static/tabbar/my.png",
                    "selectedIconPath": "/static/tabbar/my-s.png",
                    isRound: false
                }
            ]
        };
    },
    computed: {
        currentIndex() {
            return getApp().globalData.currentTabIndex;
        }
    },
    methods: {
        changeTab(index) {
            getApp().globalData.currentTabIndex = index;
            console.log("选中的下标++++：" + index);
            uni.switchTab({
                url: '/' + this.tabBarList[index].pagePath,
                success: () => {
                    this.$forceUpdate();
                }
            });
        },
        handleMiddleButtonClick() {
            getApp().globalData.currentTabIndex = 1;
            console.log("选中的下标++++：" + getApp().globalData.currentTabIndex);
            uni.switchTab({
                url: '/pages/Customize/Customize',
                success: () => {
                    this.$forceUpdate();
                }
            });
        }
    },
    watch: {
        currentIndex(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$nextTick(() => {
                    this.$forceUpdate();
                });
            }
        }
    },
    mounted() {
        // 监听语言切换事件
        this.$root.$on('languageChanged', () => {
            // 手动重置当前选中的 tab 索引
            const currentIndex = getApp().globalData.currentTabIndex;
            getApp().globalData.currentTabIndex = null;
            this.$nextTick(() => {
                getApp().globalData.currentTabIndex = currentIndex;
                // 语言切换后，更新 tabbar 显示
                this.$forceUpdate();
            });
        });
    },
    onLoad() {
        // 获取当前页面路径，设置选中的 tab
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const currentPath = currentPage.route;
        console.log("获取当前页面路径++++：" + currentPath);
        this.tabBarList.forEach((item, index) => {
            if (item.pagePath === currentPath) {
                getApp().globalData.currentTabIndex = index;
            }
        });
    },
    created() {
        console.log('tabbar~~~isPhoneX===》', this.isPhoneX);
    }
};
</script>

<style scoped lang="scss">
.custom-tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0e252d;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-top: 1rpx solid #143844;
    padding-bottom: 0rpx;
    z-index: 99999999;
}

.tab-bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
}

.tab-bar-item text {
    color: #fff; /* 确保文字颜色可见 */
    display: block; /* 确保文字显示 */
}

.active {
    color: #EDBA7A !important;
}

.tab-bar-item image {
    width: 48rpx;
    height: 48rpx;
    margin-bottom: 4rpx;
}

.middle-button {
    position: absolute;
    bottom: 44rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100rpx;
    height: 100rpx;
    background-color: #143844;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
}

.middle-button image {
    width: 64rpx;
    height: 64rpx;
}

/* 翻页效果 */
.slide-enter-active, .slide-leave-active {
    transition: transform .8s ease;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
    transform: translateX(100%);
}
.slide-leave, .slide-enter-to {
    transform: translateX(0);
}
</style>