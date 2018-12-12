import React ,{Component} from 'react'
import { Card ,Skeleton } from 'antd';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getSongTypeList} from "../../api/api";
import {getPlayList} from "../../reducers/playlist.reudx";

const { Meta } = Card;

@connect(
    state=>state.playList,
    {getPlayList}
)
@withRouter
class SongCell extends Component{
    componentDidMount(){
        this.props.getPlayList(this.props.axiosUrl,this.props.flagNum)
    }
    cardClick(val){
        this.props.history.push(`/songDetail/${val.id}`)
    }
    render(){
        // console.log(this.props)
        let dataList =[]
        switch (this.props.flagNum) {
            case 0:
                 dataList =this.props.playlist
                break
            case 1:
                 dataList =this.props.hotlist
                break
            case 2:
                 dataList = this.props.djlist
                break
            case 3:
                dataList = this.props.songtypelist
                break
        }
         const CardComponent = [] = dataList.length >0  ?  <Card
             title={this.props.title}
             extra={<a href="#">More</a>}
         >
             {dataList.map((res,index)=>{
                 return   <Card
                     key={index}
                     onClick={()=>this.cardClick(res)}
                     hoverable
                     style={{ width: 240,display:'inline-block',margin:15 }}
                     cover={<img alt="example"  src={res.picUrl || res.coverUrl || res.coverImgUrl} />}
                 >
                     <Meta
                         title={res.copywriter}
                         description={res.name}
                     />
                 </Card>
             })}
         </Card> : <Skeleton/>
        return(
            <div>
                { CardComponent}
            </div>

        )
    }
}

export default SongCell