import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ifPlay,getLyricTime,playSongDatas,getLyric} from "../../reducers/songDetail.redux";
import { Icon, Slider ,message } from 'antd'
import './index.css'

@connect(
    state=>state.songDetail,
    {ifPlay,getLyricTime,playSongDatas,getLyric}
)
class PlayBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            playTime:0
        }
    }
    componentDidMount(){

    }
    changePlay(value){
        this.audio.currentTime = value
    }
    songPause(){
        this.props.ifPlay(!this.props.isPlay)
        if(!this.props.isPlay){
            this.audio.pause()
        }else{
            this.audio.play()
        }
    }
    prevSong(){
       const {prev,prevIdx} = this.props.playSongData
        if(prev){
            let data={}
            let len = this.props.songlist.length
            data.imgSrc = prev.al.picUrl
            data.name = prev.name
            data.id = prev.id
            data.dt = prev.dt
            data.percent = 0
            data.prev = prevIdx == 0 ? false : this.props.songlist[prevIdx-1]
            data.prevIdx = prevIdx == 0 ? false : prevIdx-1
            data.next = prevIdx == len-1 ? false : this.props.songlist[prevIdx+1]
            data.nextIdx = prevIdx == len-1 ? false : prevIdx+1
            this.props.playSongDatas(data)
            this.props.getLyric(data.id)
        }else{
            message.warning('已经是第一首啦！',1);
        }
    }
    nextSong(){
        const {next,nextIdx} = this.props.playSongData
        if(next){
            let data={}
            let len = this.props.songlist.length
            data.imgSrc = next.al.picUrl
            data.name = next.name
            data.id = next.id
            data.dt = next.dt
            data.percent = 0
            data.prev = nextIdx == 0 ? false : this.props.songlist[nextIdx-1]
            data.prevIdx = nextIdx == 0 ? false : nextIdx-1
            data.next = nextIdx == len-1 ? false : this.props.songlist[nextIdx+1]
            data.nextIdx = nextIdx == len-1 ? false : nextIdx+1
            this.props.playSongDatas(data)
            this.props.getLyric(data.id)
        }else{
            message.warning('已经是最后一首啦！',1);
        }
    }
    upDateTime(){
        let time = this.audio.currentTime
        this.props.getLyricTime(time)
        this.setState({
            playTime:this.audio.currentTime
        })
        if(this.audio.ended){
            this.nextSong()
            // this.props.ifPlay(true)
        }
    }
    render() {
        const src = require('../../img/react.png')
        const {imgSrc,name,dt,pause,id,musicUrl} = this.props.playSongData
        const {playTime} = this.state
        const {isPlay,autoPlay} = this.props
        return (
            <div className={'play-bar'}>
                <audio src={musicUrl}
                       ref={(node)=>this.audio = node}
                       autoPlay={autoPlay}
                       onTimeUpdate={()=>this.upDateTime()}
                       controls={false}>
                </audio>
                <div className={'avatar'}>
                      <img src={imgSrc ? imgSrc: src} alt=""/>
                </div>
                <div className={'play-control'}>
                    <Icon onClick={this.prevSong.bind(this)} type="backward"   theme="outlined" style={{color:'#1890ff',fontSize:26}} />
                    {
                        <Icon onClick={()=>this.songPause()} type={ !isPlay ? "pause" : "play-circle"} theme="outlined" style={{color:'#1890ff',fontSize:26}}/>

                    }
                    <Icon onClick={this.nextSong.bind(this)} type="forward" theme="outlined" style={{color:'#1890ff',fontSize:26}}/>
                </div>
                <div className={'progress'}>
                    <div className={'progress-title'}>
                        <h3>{name ? name : '请选择音乐'}</h3>
                        <span>{ dt  ?  (dt/60000).toFixed(2) : '0.00'}</span>
                    </div>
                    <Slider
                        tipFormatter={null}
                        min={0}
                        value={playTime}
                        max={parseFloat((dt/1000).toFixed(0))}
                        onChange={(v)=>this.changePlay(v)}
                    />
                </div>
            </div>
        )
    }
}

export default PlayBar