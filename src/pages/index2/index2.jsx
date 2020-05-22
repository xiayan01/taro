import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index2.less'


export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '测试'
  }
  state={
    
  }

  //1.组件挂载之前
  componentWillMount () {
    console.log("获取页面传递的参数",this.$router.params)
  
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
 

  //2.组件渲染DOM结构
  render () {
   
    return (
      <View className='index2'>
        <Text>测试页面</Text>
      </View>
    )
  }
}
