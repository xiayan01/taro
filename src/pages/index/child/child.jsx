import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class Child extends Component{
  //父组件传值给子组件的属性发生变化的时候:
  //注意：this.props.obj.name不能获取到componentDidMount更新之后的属性，nexProps.obj.name可以获取到最新数据
  componentWillReceiveProps(nexProps,nextState){
    console.log("输出componentWillReceiveProps----",nexProps.obj.name)
  }

  render(){
    let { obj } = this.props
    return(
      <View> 我是子组件: {obj.name },{obj.age} </View>
    )
  }

}
//设置子组件的默认属性
Child.defaultProps={
  obj:{
    name:"默认name",
    age:0
  }
}

export default Child;