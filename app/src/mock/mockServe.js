// 先引入 mockjs模块
import Mock from 'mockjs'
// 引入json数据格式引入进来[json数据格式根本没有对象暴露，但是可以引入]
// webpock默认对外暴露：图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'

// 这个文件至少要在main.js入口文件下执行一次才能使用

// Mock对象上有一个mock方法
// mock数据：第一个参数请求地址，第二个参数：请求数据
// 首页轮播图数据
Mock.mock('/mock/banner', { code: 200, data: banner })
// 家用电器数据
Mock.mock('/mock/floor', { code: 200, data: floor })
