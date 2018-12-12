import React,{Component} from 'react'
import {getBanner,getSongList,getDjprogram,getProgramRecommend,getNewSong} from '../../api/api'
import { Carousel ,Skeleton  } from 'antd';
import  SongCell from '../../components/songCell/SongCell'
import './view.css'

class View extends Component{
    constructor(){
        super()
        this.state={
            bannerList:[],
        }
    }
    componentWillMount(){
        getBanner().then(res=>{
            setTimeout(()=>{
                if(res.status==200 && res.data.code ==200){
                    this.setState({
                        bannerList:res.data.banners
                    })
                }
            },3000)
        })
    }
    render(){
        const renderBanner = this.state.bannerList.length>0 ?
            <Carousel
                autoplay={true}
                >
                {this.state.bannerList.map((res,index)=>{
                   return <div key={index}  >
                               <div style={{background:`url(${res.backgroundUrl})`,textAlign:'center'}}>
                                   <img
                                       src={res.picUrl}
                                       style={{margin:'auto'}}
                                       alt=""/>
                               </div>
                          </div>
                })}
            </Carousel>
            :
            <Skeleton
                avatar
                active
                paragraph={{ rows: 8 }}
            />
        return(
           <div>
               <div className={'banner'}>
                       {renderBanner}
               </div>
               <SongCell
                   axiosUrl={getSongList()}
                   title={'热门歌单推荐'}
                   flagNum={0}
               />
               <SongCell
                   axiosUrl={getDjprogram()}
                   title={'热门电台推荐'}
                   flagNum={1}
               />
               <SongCell
                   axiosUrl={getProgramRecommend()}
                   title={'热门节目推荐'}
                   flagNum={2}
               />
           </div>
        )
    }
}

export default View