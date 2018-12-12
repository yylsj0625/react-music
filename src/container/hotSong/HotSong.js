import React,{Component} from 'react'
import  TagComponent from '../../components/tagComponent/TagComponent'
import SongCell from  '../../components/songCell/SongCell'
import {getSongType,getSongTypeList} from "../../api/api";
import {connect} from 'react-redux'
import {getPlayList} from "../../reducers/playlist.reudx";
import { Pagination }from 'antd'

@connect(
    state=>state,{
        getPlayList
    }
)
class HotSong extends Component{
    constructor(props) {
        super(props);
        this.state={
            size:12,
            type:'new',
            page:0,
            total:500,
            child:''
    }
    }
    componentWillMount(){

    }
    onShowSizeChange(current, pageSize){
        this.setState({
            size:pageSize
        })
        this.childMethods()
    }
    onChange(page, pageSize){
        this.setState({
            page:pageSize * page
        })
        this.childMethods()
    }
    childMethods(){
       this.props.getPlayList(getSongTypeList(this.state.size,this.state.type,this.state.page),3)
    }
    render(){
        const pageSizeOption = []
        for(let i = 1;i < this.state.total;i++){
            let idx = String(i * 12)
            if(idx <= this.state.total)pageSizeOption.push(idx)
        }
        return(
           <div>
               <TagComponent axiosUrl={getSongType()}/>
               <SongCell ref='onHandleChange'
                         axiosUrl={getSongTypeList(this.state.size,this.state.type,this.state.page)}
                         title={this.state.type}
                         flagNum={3}
               />
               <Pagination
                   showSizeChanger
                   defaultPageSize={12}
                   pageSizeOptions={pageSizeOption}
                   onChange={(page, pageSize)=>this.onChange(page, pageSize)}
                   onShowSizeChange={(current, pageSize)=>this.onShowSizeChange(current, pageSize)}
                   defaultCurrent={1}
                   total={this.state.total} />
           </div>
        )
    }
}

export default HotSong