import Taro, { Component, Config } from '@tarojs/taro'
import { View, Textarea ,Input,Button} from '@tarojs/components'
import './addQuestion.less'

import Dialog from '../Dialog/Dialog.jsx'

export default class AddQuestion extends Component {  

  state={
    title:"",//输入框默认为空
    des:"",//输入框默认为空
  }

  /**
   * 输入的值
   */
  title(e){
    this.setState({ title:e.target.value})
  }
  des(e){
    this.setState({ des:e.target.value})
  }
  /**
    * 确认：接收提问列表 && 关闭弹框:子组件调用父组件传递的方法将子组件的数据传递给父组件
    */
  ok(){
    if(this.state.title && this.state.des){
      this.props.recive(this.state)
    }else{
      Taro.showToast({
        title:"请输入标题/描述。。。",
        icon:"none"
      })
    }

  }
  /**
    * 取消:子组件用this.props调用父组件传递来的方法
    */
  cancle(){
   this.props.cancle()
  }

  //组件渲染DOM结构
  render () {
    return (
      <Dialog>
        <View className='addQuestion'>
          <View className="body">
              <Input placeholder="请输入内容" className="title" onInput={this.title.bind(this)} ></Input>
              <Textarea placeholder="请输入描述" className="des" onInput={this.des.bind(this)} ></Textarea>
              <View className="btnGroup">
                <Button className="btn ok" onClick={this.ok.bind(this)} >确认</Button>
                <Button className="btn cancle" onClick={this.cancle.bind(this)}>取消</Button>
              </View>
          </View>
        </View>
      </Dialog>
      
    )
  }
}
