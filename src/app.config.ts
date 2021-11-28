export default {
  pages: [
    'pages/index/index',
    'pages/my/index',
    'pages/contact/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    backgroundColor: "#ffffff",
  },
  tabBar: {
    color: "#666",
    selectedColor: "#b4282d",
    backgroundColor: "#fff",
    list: [{
      pagePath: "pages/index/index",
      text: "首页"
    }, {
      pagePath: "pages/my/index",
      text: "我"
    }, {
      pagePath: "pages/contact/index",
      text: "联系部落"
    }]
  }
}
