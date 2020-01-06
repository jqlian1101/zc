// import { Loading } from 'element-ui';

class CustomLoading {
    num = 0;
    loading = null;

    show = () => {
        this.num++;
        this.loading = ELEMENT.Loading.service({
            customClass: 'globalLoading',
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.1)'
        });
    };

    hide = () => {
        this.num--;
        if (this.num > 0) {
            return;
        }
        this.num = 0;
        // setTimeout(() => {
        this.loading && this.loading.close();
        this.loading = null;
        // }, 100);
    };
}

export default new CustomLoading();
