import  React ,{Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import  PlaySong from '../playSong/playSong'
import {List, Avatar, Button, Skeleton,Input } from 'antd'
import {getDetail,playSongDatas,ifPlay,getLyric,search} from "../../reducers/songDetail.redux";
import './index.css'


const Search = Input.Search;
@connect(
    state=>state.songDetail,
    {getDetail,playSongDatas,ifPlay,getLyric,search}
)
@withRouter
class SongDetail extends Component{
    constructor(props) {
        super(props);
        this.state={
            initLoading: true,
            idx:10
        }
    }
    componentWillMount(){
        this.props.getDetail(this.props.match.params.id)
    }
    componentDidMount(){

    }
    onLoadMore(){
      if(this.state.idx >= this.props.songlist.length){
          this.setState({
              initLoading:false
          })
      }
      this.setState({
          idx:this.state.idx+10
      })
    }
    playSong(val,idx){
        let data={}
        let len = this.props.songlist.length
        data.imgSrc = val.al.picUrl
        data.name = val.name
        data.id = val.id
        data.dt = val.dt
        data.percent = 0
        data.prev = idx == 0 ? false : this.props.songlist[idx-1]
        data.prevIdx = idx == 0 ? false : idx-1
        data.next = idx == len-1 ? false : this.props.songlist[idx+1]
        data.nextIdx = idx == len-1 ? false : idx+1
        this.props.playSongDatas(data)
        this.props.ifPlay(true)
        this.props.getLyric(val.id)
    }
    render(){
        const { initLoading,idx } = this.state;
        const loadMore = initLoading ?  (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                <Button onClick={this.onLoadMore.bind(this)}>加载更多</Button>
            </div>
        ) : null;

        return(
            <div className={'song-detail'} style={{padding:25 }}>


                <List
                    header={<div>
                        <Search
                            placeholder="请输入歌曲名称"
                            onSearch={value => this.props.search(value)}
                            enterButton
                        />
                    </div>}
                    footer={initLoading ? null : <div style={{textAlign:'center'}}>歌曲已全部加载完毕</div>}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={this.props.songlist.slice(0,idx)}
                    renderItem={(item ,index)=> (
                        <List.Item
                            className={this.props.playSongData.id == item.id ? 'active' : ''}
                            actions={[]}
                            onClick={()=>this.playSong(item,index)}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.al.picUrl} />}
                                    title={<a href="javaScript:;">{item.name}</a>}
                                    description={item.ar.map((res,index)=>{
                                       if(index==item.ar.length-1){
                                           return res.name
                                       }
                                       return res.name+'   /   '
                                    })}
                                />
                            </Skeleton>
                            {item.al.name}
                        </List.Item>
                    )}
                />
                <div style={{flex:1}}>
                    <PlaySong/>
                </div>
            </div>
        )
    }
}

export default SongDetail