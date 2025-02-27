<template>
    <view class="language-switcher">
        <text @click="switchLanguage($t('lang'))" class="language-text">{{$t('lang')}}</text>
    </view>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        switchLanguage(currentLang) {
            if (currentLang === '中文') {
                this.$i18n.locale = 'en';
                uni.setLocale('en')//z-paging 需要设置  
            } else {
                this.$i18n.locale = 'zh';
                uni.setLocale('zh')
            }
            // 触发事件通知 tabbar 更新
            this.$emit('languageChanged');

            // 获取当前页面路径
            const pages = getCurrentPages();
            const currentPage = pages[pages.length - 1];
            const currentPath = currentPage.route;

            // 根据当前页面路径和语言设置页面标题
            let pageTitleKey;
            if (currentPath.includes('Guqi')) {
                pageTitleKey = 'pageTitles.Guqi';
            } else if (currentPath.includes('Customize')) {
                pageTitleKey = 'pageTitles.Customize';
            } else if (currentPath.includes('Mine')) {
                pageTitleKey = 'pageTitles.My';
            }

            if (pageTitleKey) {
                const title = this.$t(pageTitleKey);
                uni.setNavigationBarTitle({
                    title: title
                });
            }
        }
    }
};
</script>

<style scoped>
.language-switcher {
    position: absolute;
    top: 30rpx;
    right: 0;
    background-color: rgba(255, 255, 255, .5); /* 按钮背景色 */
    border-radius: 40rpx 0 0 40rpx; /* 圆角 */
    padding: 14rpx 0; /* 内边距 */
    display: inline-flex; /* 使内容居中 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    z-index: 999999999999;
}

.language-text {
    color: #000; /* 文字颜色 */
    font-size: 30rpx; /* 字体大小 */
    width: 110rpx;
    text-align: center;
}
</style>