import { SESSION_USERINFO_KEY, SESSION_USER_MENULIST, MODEL_TREE_TYPE } from 'common/constants';

export const getDomRect = (dom) => {
    if (!dom) return {};
    return dom.getBoundingClientRect();
}

export const isNumZhEn = (value) => {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
    return reg.test(value);
}
export const isNumber = (value) => {
    let reg = /^[0-9]+([.][0-9]+)?$/;
    return reg.test(value);
}

/**
 * 验证数字是否符合规范
 * @param {str | num} value
 * @param {obj} rule { max：最大值, min：最小值, isInt：是否要求输入整数，maxLen：最大长度，minLen：最小长度 }
 */
export const validateNum = (value, rule = {}) => {
    let { max, min, isInt = false, maxLen, minLen } = rule;

    if (!isNumber(value)) return '请输入数字';

    value = Number(value);
    if (max && value > max) return `数值不能大于${max}`;
    if (min && value < min) return `数值不能小于${min}`;
    if (isInt && !Number.isInteger(value)) return `请输入整数`;
    if (maxLen && value.length > maxLen) return `数值长度不能大于${maxLen}`;
    if (minLen && value.length < minLen) return `数值长度不能小于于${maxLen};`
}

export const validateField = (rules) => (rule, value, cb) => {
    let result = validateNum(value, rules[rule.field]);

    if (result) {
        cb(new Error(result));
    }
    cb();
};

export const isNull = (value) => {
    if (!value && typeof (value) !== 'undefined' && value !== 0) return true;
    return false;
}

export const isUndefined = (value) => {
    if (typeof (value) === "undefined") return true;
    return false;
}


export const isNil = (value) => {
    if (isNull(value) || isUndefined(value)) return true;
    return false;
}

export const IEVersion = () => {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion === 7) {
            return 7;
        } else if (fIEVersion === 8) {
            return 8;
        } else if (fIEVersion === 9) {
            return 9;
        } else if (fIEVersion === 10) {
            return 10;
        } else {
            return 6;   // IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';  // edge
    } else if (isIE11) {
        return 11; // IE11
    } else {
        return -1;// 不是ie浏览器
    }
}


export const handleTreeData = (dataList = []) => {
    let items = [];
    let item = null;
    let idMap = {}; // key:id,value:item

    const veIdx = dataList.findIndex(item => item.type === MODEL_TREE_TYPE.basic && item.pid === MODEL_TREE_TYPE.train);
    if (veIdx !== -1) {
        const veItem = dataList.splice(veIdx, 1)[0];
        dataList.unshift(veItem)
    }

    // 车辆按 列 辆 排序
    dataList.sort((a, b) => {
        if (a.row === b.row) {
            return a.cal - b.cal;
        }
        return a.row - b.row;
    })

    // 将所有的菜单保存到idMap,如果是一级菜单，还要存放到items数组
    for (let i = 0; i < dataList.length; i++) {
        let row = dataList[i];
        item = { ...row };
        // item.data = Object.assign({}, row);

        if (row.id === row.pid || !row.pid) {
            items.push(item);
        }
        idMap[row.id] = item;
    }

    // 遍历所有的非一级菜单，找到它们的父节点，并存放到父节点的items属性下
    for (let i = 0; i < dataList.length; i++) {
        let row = dataList[i];
        if (row.id === row.pid || !row.pid) {
            continue;
        }
        let pitem = idMap[row.pid];
        item = idMap[row.id];
        if (pitem.id === item.id) continue;
        if (pitem) {
            if (!pitem.children) {
                pitem.children = [];
            }
            pitem.children.push(item);
        }
    }

    return items;
}

export const getUserInfo = () => {
    let userInfoStr = window.sessionStorage.getItem(SESSION_USERINFO_KEY);
    if (!userInfoStr) return {};
    return JSON.parse(userInfoStr);
}

export const userTypeCodeDict = {
    corpAdmin: { type: 'corpAdmin', code: '1' },
    user: { type: 'user', code: '2' }
}

export const getUserIdAndType = () => {
    let userInfo = getUserInfo();
    let { id = "", roleCode = "" } = userInfo;
    let userTypeCode = "";
    if (!isNil(roleCode) && userTypeCodeDict[roleCode]) userTypeCode = userTypeCodeDict[roleCode].code;
    return { userId: id, userType: roleCode, userTypeCode }
}

export const getObjFromStr = (str) => {
    // eslint-disable-next-line no-eval
    return eval('(' + str + ')')
}

export const filterJson = (json) => {
    let result = {};
    for (let i in json) {
        json[i] && (result[i] = json[i])
    }
    return result;
}

export const getMenuList = () => {
    let menuList = window.sessionStorage.getItem(SESSION_USER_MENULIST);
    if (!menuList) return [];
    return JSON.parse(menuList);
}

/**
 * 生成随机字符串
 * @param {str} id
 * @param {num} len
 */
export const randomString = (id, len = 5) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return `${id}${pwd}`;
}

export const arrSortAndUnique = (arr = []) => {
    arr = Array.from(new Set([...arr]));
    arr.sort((a, b) => a - b)
    return [...arr];
}

export default {
    isNumber,
    isNumZhEn,
    validateNum,
    isNull,
    isUndefined,
    isNil,
    validateField,
    IEVersion,
    getUserInfo,
    handleTreeData,
    getUserIdAndType,
    getObjFromStr,
    filterJson,
    randomString,
    getMenuList,
    arrSortAndUnique
}


