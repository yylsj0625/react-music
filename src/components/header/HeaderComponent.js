import React ,{Component} from 'react'
import { Layout, Menu} from 'antd';


const { Header} = Layout;

class HeaderComponent extends Component{
    render(){
        return(
            <Header style={{position:'fixed',top:0,left:0,right:0,zIndex:50}} className="header">
                <div className="logo" />
            </Header>
        )
    }
}

export default HeaderComponent