import { Component } from 'react'
import MyHttp from '@utils/MyHttp'
import './app.scss'

class App extends Component {
  public MyHttp = MyHttp

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}

export default App
