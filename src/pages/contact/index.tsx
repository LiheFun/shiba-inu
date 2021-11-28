import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

type Props = {}

type State = {
  pageData: any
}

export default class Index extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      pageData: {
        imgList: [
          "https://img1.baidu.com/it/u=1042793532,2510148081&fm=253&fmt=auto&app=120&f=JPEG?w=864&h=486",
          "https://img1.baidu.com/it/u=3703176927,151776412&fm=26&fmt=auto&gp=0.jpg",
          "https://img1.baidu.com/it/u=1995961165,1984790691&fm=26&fmt=auto&gp=0.jpg",
          "https://img2.baidu.com/it/u=2219454799,1552276309&fm=26&fmt=auto&gp=0.jpg",
        ],
        address: "北京市通州区",
        contactList: [
          {
            name: "小李",
            type: "微信",
            value: "xl092922",
          },
          {
            name: "小刚",
            type: "电话",
            value: "17887828999",
          },
          {
            name: "小周",
            type: "微信",
            value: "zlhsjo111",
          },
          {
            name: "小王",
            type: "电话",
            value: "12287828999",
          },
        ],
      }
    }
  }

  componentWillMount() { }

  componentDidMount() {}

  componentWillUnmount() { }

  componentDidShow() {}

  componentDidHide() { }

  // 复制
  copy(item) {
    Taro.setClipboardData({
      data: item.value
    });
  }

  render() {
    const { pageData = {} } = this.state
    const { imgList = [], address, contactList = [] } = pageData

    return (
      <View className='contact'>
        {/* 图片 */}
        <View className='img-list'>
          {
            imgList.length && imgList.map(item => (
              <Image src={item} />
            ))
          }
        </View>
        {/* 地址 */}
        <View className='address'>
          地址：{address}
        </View>
        {/* 联系方式 */}
        <View className="contact-list">
          {
            contactList.length && contactList.map(item => (
              <View className="info">
                <Text className="name">{item.name}</Text>
                <Text className="value">{item.type}：{item.value}</Text>
                <Text className="btn" onClick={this.copy.bind(this, item)}>复制</Text>
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}
