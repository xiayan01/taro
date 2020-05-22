import Taro, { Component, Config } from '@tarojs/taro'
/**
 * 暂存的数据
 */
function getStore(key) {
    let str = Taro.getStorageSync(key)
    if (!str) {
        return []
    } else if (str) {
        return JSON.parse(str)
    }
}
/**
 * 取数据
 */
function setStore(key, obj) {
    let str;
    if (typeof obj === "object") {
        str = JSON.stringify(obj)
    }
    Taro.setStorageSync(key, str)
}


function add(a, b) {
    console.log("调用add方法：")
    return a + b

}

/**
 * 函数导出的返回式1：export default { setData }
 * 引入：import util from '../../../utils/utils.js'
 * 调用：util.setData();
 */

/**
 * 函数导出的返回式2:module.exports = { setData }
 * 引入：import {setData} from '../../../utils/utils.js'
 * 调用：  setData();
 */
export default {
    getStore,
    setStore,
    add

}