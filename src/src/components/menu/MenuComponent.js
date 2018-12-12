import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon, Button,Layout } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

@withRouter
class MenuComponent extends Component{
    state = {
        collapsed: false,
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render(){
        console.log(this.props)
        return (
            <div style={styles.container}>
                {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>*/}
                    {/*<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />*/}
                {/*</Button>*/}
                <Menu
                    defaultSelectedKeys={['/view']}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.props.location.pathname]}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="/view">
                        <Link to='/view'>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/hotSong">
                        <Link to='/hotSong'>
                            <Icon type="desktop" />
                            <span>热门</span>
                        </Link>
                    </Menu.Item>
                    {/*<Menu.Item key="/songDetail">*/}
                        {/*<Link to='/songDetail/:id'>*/}
                            {/*<Icon type="inbox" />*/}
                            {/*<span>播放器</span>*/}
                        {/*</Link>*/}
                    {/*</Menu.Item>*/}
                </Menu>
            </div>
        )
    }

}
const styles={
    container:{
        position:'fixed',
        bottom:0,
        top:60,
        background:'#001529',
        zIndex:50
    }
}
export default MenuComponent