import React ,{Component} from 'react'
import {Layout} from 'antd'
import HeaderComponent from '../../components/header/HeaderComponent'
import MenuComponent  from '../../components/menu/MenuComponent'
import ContentComponent  from '../../components/content/contentComponent'
class Home extends Component{
      render(){
          return(
              <Layout>
                  <HeaderComponent/>
                  <Layout>
                      <MenuComponent/>
                  </Layout>
                  <Layout>
                      <ContentComponent/>
                  </Layout>
              </Layout>
          )
      }
}

export default Home