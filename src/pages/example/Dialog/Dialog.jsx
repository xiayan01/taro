import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'

import './Dialog.less'

export default class Dialog extends Component {
  render () {
    return (
      <View className='dialog'>你好{this.props.children}
     </View>
    )
  }
}
