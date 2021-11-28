import { Component } from 'react'
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

type Props = {

}

type State = {
  bannerList: any,
  dynamicInfoList: any
}


export default class Index extends Component<Props, State> {
  constructor(prop) {
    super(prop)
    this.state = {
      bannerList: [
        "https://img1.baidu.com/it/u=1042793532,2510148081&fm=253&fmt=auto&app=120&f=JPEG?w=864&h=486",
        "https://img1.baidu.com/it/u=3703176927,151776412&fm=26&fmt=auto&gp=0.jpg",
        "https://img1.baidu.com/it/u=1995961165,1984790691&fm=26&fmt=auto&gp=0.jpg",
        "https://img2.baidu.com/it/u=2219454799,1552276309&fm=26&fmt=auto&gp=0.jpg",
      ],
      dynamicInfoList: [{
        name: '辛巴',
        time: '2021-09-21',
        msg: '我们总是听着别人的故事流眼泪',
        imgList: [
          "https://img1.baidu.com/it/u=1042793532,2510148081&fm=253&fmt=auto&app=120&f=JPEG?w=864&h=486",
          "https://img1.baidu.com/it/u=3703176927,151776412&fm=26&fmt=auto&gp=0.jpg",
          "https://img1.baidu.com/it/u=1995961165,1984790691&fm=26&fmt=auto&gp=0.jpg",
          "https://img2.baidu.com/it/u=2219454799,1552276309&fm=26&fmt=auto&gp=0.jpg",
        ],
        commentNum: 34,
        loved: 108
      }, {
        name: '辛巴',
        time: '2021-09-21',
        msg: '我们总是听着别人的故事流眼泪',
        imgList: [
          "https://img1.baidu.com/it/u=1042793532,2510148081&fm=253&fmt=auto&app=120&f=JPEG?w=864&h=486",
          "https://img1.baidu.com/it/u=3703176927,151776412&fm=26&fmt=auto&gp=0.jpg",
          "https://img1.baidu.com/it/u=1995961165,1984790691&fm=26&fmt=auto&gp=0.jpg",
          "https://img2.baidu.com/it/u=2219454799,1552276309&fm=26&fmt=auto&gp=0.jpg",
        ],
        commentNum: 34,
        loved: 108
      }]
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const { bannerList = [], dynamicInfoList = [] } = this.state
    return (
      <View className='index'>
        {/* 轮播图 */}
        <Swiper
          className='banner-list'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          interval={2000}
          circular
          indicatorDots
          autoplay>
          {
            bannerList.length && bannerList.map((item, index) => (
              <SwiperItem>
                <Image className="img" src={item} />
              </SwiperItem>
            ))
          }
        </Swiper>
        {/* 列表信息 */}
        <View className="dynamic-info-list">
          {
            dynamicInfoList.length && dynamicInfoList.map(item => (
              <View className="item">
                <View className="top">
                  <View className="name">{item.name}</View>
                  <View className="time">{item.time}</View>
                </View>
                <View className="msg">{item.msg}</View>
                <View className="img-list">
                  {
                    item.imgList.length && item.imgList.slice(0, 6).map((img, index) => (
                      <Image className="info-img" src={img} />
                    ))
                  }
                </View>
              </View>
            ))
          }
        </View>

      </View>
    )
  }
}
