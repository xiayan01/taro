import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button,Image } from '@tarojs/components'
import './example.less'


import AddQuestion from './addQuestion/addQuestion.jsx'
import utils from '../../utils/utils.js'

// /**
//  * 暂存的数据
//  */
// function getStore(key) {
//   let str = Taro.getStorageSync(key)
//   if (!str) {
//       return []
//   } else if (str) {
//       return JSON.parse(str)
//   }
// }
// /**
// * 取数据
// */
// function setStore(key, obj) {
//   let str;
//   if (typeof obj === "object") {
//       str = JSON.stringify(obj)
//   }
//   Taro.setStorageSync(key, str)
// }

export default class Example extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '案例'
  }
  state={
    showQuestion:false,//默认不显示提问框
    questionList:utils.getStore("questions"),//存放提问的数据

  }

  //1.组件挂载之前
  componentWillMount () {

   }

  //3.组件挂载之后
  componentDidMount () {

  }

  //组件被销毁的时候
  componentWillUnmount () {

  }

  //4.页面显示的时候触发
  componentDidShow () {

  }

  //页面隐藏的时候触发
  componentDidHide () {

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

  }
  //state数据更新之后触发
  componentDidUpdate(){

  }

  //检查this.setState({})是否进行render()的调用，
  shouldComponentUpdate(){
    return true
  }

  /**
   * 提问
   */
  addQUestion(){
    this.setState({showQuestion:true})
  }
  /**
   * 取消:父组件写一个方法，通过属性的方式将数据传递给子组件
   */
  cancleQuestion(){
    this.setState({showQuestion:false})
  }
  /**
   * 接收提问列表 && 关闭弹框
   */
  reciveQuestion(options){
    console.log("父组件接收子组件传递过来的值：",options)
    let {questionList} = this.state
    questionList.push({id:parseInt(Math.random()*100),...options})
    this.setState({
      questionList
    },()=>{
      utils.setStore("questions",questionList)
      console.log("setState是异步：",this.state.questionList)


    })
    this.cancleQuestion()
  }
  /**
   * 点赞++
   */
  addVote(item){
    let { questionList } = this.state
    if(item){
      item.vote = item.vote?item.vote+1:1
    }
    let newList = questionList.map(itemQustion=>{
      if(itemQustion.id === item.id){
        itemQustion = {...item}
      }
      return itemQustion
    })
    this.setState({
      questionList:newList
    },()=>{
      utils.setStore("questions",newList)
    })

  }
  /**
   * 点赞--
   */
  cutVote(item){
    let { questionList } = this.state
    if(item){
      item.vote = item.vote?((item.vote-1)>0?item.vote-1:0):0
    }
    let newList = questionList.map(itemQustion=>{
      if(itemQustion.id === item.id){
        itemQustion = {...item}
      }
      return itemQustion
    })
    this.setState({
      questionList:newList
    },()=>{
      utils.setStore("questions",newList)
    })

  }



  //2.组件渲染DOM结构
  render () {
    let {showQuestion,questionList} = this.state
    let sortList = questionList.sort((a,b)=>b.vote-a.vote) //排序

    return (
      <View className='example'>
        <View className="title"> 消息列表</View>
        <View className="list">
          {
            sortList.map((item,index)=>{
              return (
                <View className="list-item" key={index}>
                  <View className="left">
                    <View >问题：{item.title}</View>
                    <View >描述：{item.des}</View>
                  </View>
                  <View className="right">
                    <Image className="img" onClick={this.addVote.bind(this,item)} src={require("../../../asset/images/add.svg")}></Image>
                    <Text>{item.vote?item.vote:0}</Text>
                    <Image className="img" onClick={this.cutVote.bind(this,item)} src={require("../../../asset/images/dec.svg")}></Image>
                  </View>
                </View>
              )
            })
          }
        </View>
        { showQuestion ? <AddQuestion recive={this.reciveQuestion.bind(this)} cancle={this.cancleQuestion.bind(this)} ></AddQuestion> : null }
        <Button className="qustion"   onClick={this.addQUestion.bind(this)} >提问</Button>
      </View>
    )
  }
}
