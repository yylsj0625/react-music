import React ,{Component} from 'react'
import {Route,Router,Switch,Redirect} from 'react-router-dom'
import { Layout,BackTop} from 'antd';
import View from '../../container/view/View'
import HotSong from '../../container/hotSong/HotSong'
import SongDetail from '../../container/songDetail/SongDetail'
const { Content} = Layout;

class ContentComponent extends Component{
    render(){
        return(
            <Content style={{paddingLeft:178,paddingTop:60,background:'#f8f8f8'}}>
                <Switch>
                    <Route path='/view' component={View}></Route>
                    <Route path='/hotSong' component={HotSong}></Route>
                    <Route path='/songDetail/:id' component={SongDetail}></Route>
                    <Redirect exact from='/' to='/view'/>
                </Switch>
                <BackTop/>
            </Content>
        )
    }
}

export default ContentComponent