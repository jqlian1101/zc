import { request } from 'utils/request';
import config from './config';

// 登录
const signIn = (params) => request(`${config.baseUrl}/userLoginController/userLogin`, { ...params }, {
    method: 'post'
});

export default {
    signIn
}
