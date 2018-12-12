import React, {Component} from 'react'
import {connect } from 'react-redux'
import './index.css'

@connect(
    state=>state.songDetail
)
class Lyric extends Component {
    constructor(props){
        super(props)
        this.state={
            activeLines:[],
            moveTop:100
        }
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({
            activeLines:[],
            moveTop:100
        })
    }
    componentWillReceiveProps(nextProps) {
        const {lyricTime} = nextProps
        if (this.lyricData) {
            let len = this.lyricData.length
            for (let i = 0; i < len; i++) {
                if (lyricTime > this.lyricData[i][0] -1) {
                    this.setState(
                        {
                            activeLines: new Array(len)
                                .join()
                                .split('')
                                .map(() => 0),
                        },
                        () => {
                            const copyLines = this.state.activeLines.slice()
                            copyLines[i] = 1
                            this.setState({
                                activeLines: [...copyLines],
                                moveTop:i*(-15)+100
                            })
                        }
                    )
                }
            }
        }
    }
    getLyricList=(lyric)=>{
        if(!lyric) return
        // let reg = /\[(\d{2}):(\d{2})\.(\d{1,3})\]/g
        let lyricArr = []
        // console.log(lyric)
         for(let i = 0,len = lyric.length;i<len;i++){
             if(lyric[i]){
                 let arr = lyric[i].split(']')
                 if(arr[1] !== ''){
                     let a = arr[0].replace(/\[/,'').split(':')
                     arr[0] = parseInt(a[0],10)*60 + parseFloat(a[1])
                     lyricArr.push(arr)
                 }
             }else{
                 // console.log(lyric[i])
             }
        }
        // lyric.map((res,index)=>{
        //      if(reg.test(res)){
        //          // console.log(res)
        //          let arr = res.split(']')
        //              if(arr[1] !== ''){
        //                  let a = arr[0].replace(/\[/,'').split(':')
        //                  arr[0] = parseInt(a[0],10)*60 + parseFloat(a[1])
        //                  lyricArr.push(arr)
        //              }
        //      }else{
        //
        //      }
        // })

        return lyricArr
    }
    renderLyricItem=(lyric)=>{
        if (!lyric) return null
        this.lyricData = this.getLyricList(lyric)
        const {activeLines,moveTop} = this.state
        return (<ul className='lyricList' style={{top:`${moveTop}px`}}>
            { this.lyricData.map((res,index)=>{
              return  <li key={index} className={activeLines[index] === 1 ? 'line active' : 'line'} >
                    {res[1]}
                </li>
            })}
        </ul>)
    }
    render() {
        const lyric = this.props.lyric.version ? this.props.lyric.lyric.split('\n') : null
        const {imgSrc} = this.props.playSongData
        return (
            <div className={'lyric'}>
                {
                    lyric ?
                    <div>
                        <div className={'filter'} style={{background:`url(${imgSrc})  center center`}}/>
                        <div className={'lyricBg'} >
                            <div className={'avatarImg'}>
                                <img src={imgSrc} alt=""/>
                            </div>
                            {lyric ?  this.renderLyricItem(lyric) : <p>暂无歌词</p>}
                        </div>
                    </div>
                    : <p>暂无歌词</p>
                }
            </div>
        )
    }
}

export default Lyric