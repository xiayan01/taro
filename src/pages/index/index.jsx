import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text ,Button,Image} from '@tarojs/components'

import Child from './child/child.jsx'
import img from '../../../asset/images/driver.jpg'
import './index.less'
import utils from '../../utils/utils.js'

const env = process.env.TARO_ENV;

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  state={
    des:"zhangsan",
    obj:{
      name:"xiayan",
      age:25
    },
    list:[
      {id:1,name:"xiayan01",age:1},
      {id:2,name:"xiayan02",age:2},
      {id:3,name:"xiayan03",age:3},
    ]
  }

  //1.组件挂载之前
  componentWillMount () {
    console.log("输出componentWillMount--1")
    if(env === 'h5'){
      console.log("当前环境--h5")
      // require("../h5.less")
    }else{
      console.log("当前环境--小程序")
      // require("../wxapp.less")
    }
  }
  //3.组件挂载之后
  componentDidMount () {
    console.log("输出componentDidMount--3")
    this.setState({
      des:"lisi",
      obj:{name:"xiayan01",age:26}
    },()=>{
      console.log("this.setState({})是异步的，在回调函数可获取最新值",this.state.des)
    })
  }
  //4.页面显示的时候触发
  componentDidShow () { 
    console.log("输出componentDidShow--4")
  }
  //组件被销毁的时候
  componentWillUnmount () {
    console.log("输出componentWillUnmount")
   }
  //页面隐藏的时候触发
  componentDidHide () { 
    console.log("输出componentDidHide")
  }
  /**
   * 当数据state发生改变的时候:
   *  在第一次渲染时不会被调用，this.setState({})是一个异步的过程
   * （1）componentWillUpdate()
   * （2）render()
   *  (3)componentDidUpdate()
   */
  //state数据要更新的时候触发
  componentWillUpdate(){
    console.log("输出componentWillUpdate--state--1")
  }
  //state数据更新之后触发
  componentDidUpdate(){
    console.log("输出componentDidUpdate--state--2")
  }
  //检查this.setState({})是否进行render()的调用，
  shouldComponentUpdate(){
    return true
  }
 
 /**
  * 页面跳转
  * Taro.redirectTo({url:"../index2/index2?id=123"}}：重定向跳转，不被浏览器的记录栈记录  <==>$router.replace
  * Taro.navigateTo({url:"/pages/index2/index2?id=123"})：可以被浏览器记录栈记录  <==>$router.push
  * Taro.switchTab：跳转到tab页面
  * Taro.navigateBack：
  * Taro.reLaunch：跳转到指定页面
  * Taro.getCurrentPages：获取当前的页面栈，决定需要返回几层
  */
 example(){
    Taro.redirectTo({
      url:"/pages/example/example"
    })
  }
 
  /**
   * 事件处理（参数1，参数2）
   * 
   * e.stopPropagation()//阻止默认事件冒泡
   * 
   */
  handleEvent(parames,e){
    //e.stopPropagation()//阻止默认事件冒泡
    console.log("事件",parames,e)
  }



  handle(e){
    console.log("????",e)
    utils.add(1,2)
    console.log("结果",utils.add(1,2))
  }
  //2.组件渲染DOM结构
  render () {
    console.log("输出render--2")
    return (
      <View className='index'>
         <Button onClick={this.handle} >函数调用</Button>
        <View>页面渲染： {this.state.des}</View>
        {
          this.state.list.map((item,index)=>{
          return (<View key={item.id}>数组{index}:{item.name} </View>)

          })
        }
        <Child obj={this.state.obj}></Child>
        <Image src={require("../../../asset/images/driver.jpg")}>返回上一级记录</Image>
        <Image src={img}></Image>
        <Button onClick={this.handleEvent.bind(this,this.state.obj)} >事件处理</Button>
        <Button onClick={this.example} >案例</Button>
      </View>
    )
  }
}
