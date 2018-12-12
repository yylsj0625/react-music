
import {getSongDetail,getMusicUrl,getMusicLyric,searchMusic} from "../api/api";

const SONG_LIST = 'SONG_LIST'
const PLAY_SONG_DATA = 'PLAY_SONG_DATA'
const LYRIC = 'LYRIC'
const IS_PLAY = 'IS_PLAY'
const LYRIC_TIME = 'LYRIC_TIME'

const initState={
    songlist:[],
    playSongData:{},
    playTime:0,
    isPlay:false,
    lyric:{},
    lyricTime:0,
    autoPlay:false
}

export const songDetail=(state=initState,action)=>{
    switch (action.type) {
        case SONG_LIST:
            return {...state,songlist:action.payload,isPlay:true,autoPlay:false}
        case PLAY_SONG_DATA:
            return {...state,playSongData:action.payload,isPlay:false,autoPlay:true}
        case IS_PLAY:
            return {...state,isPlay:action.payload}
        case LYRIC:
            return {...state,lyric:action.payload}
        case LYRIC_TIME:
            return {...state,lyricTime:action.payload}
        default:
            return state
    }
}
const priviList =(data)=>{
    return {type:SONG_LIST,payload:data}
}
const songData =(data)=>{
    return {type:PLAY_SONG_DATA,payload:data}
}
export const ifPlay=(val)=>{
    return {type:IS_PLAY,payload:val}
}
const lyricBox = (data)=>{
    return {type:LYRIC,payload:data}
}
export const getLyricTime=(time)=>{
    return {type:LYRIC_TIME,payload:time}
}

export const getLyric=(id)=>{
    return dispatch=>{
        getMusicLyric(id).then(res=>{
            console.log(res)
            if(res.status ==200){
                let lrc;
                if(res.data.nolyric || res.data.lrc==undefined){
                    lrc = {
                        version:null
                    }
                } else{
                    lrc =  res.data.lrc
                }
               dispatch(lyricBox(lrc))
            }
        })
    }
}
export const playSongDatas=(data)=>{
    return dispatch=>{
        getMusicUrl(data.id).then(res=>{
            if(res.status == 200){
               data.size = res.data.data[0].size
               data.musicUrl = res.data.data[0].url
            }
            dispatch(songData(data))
        })
    }
}

export const getDetail=(id)=>{
    return dispatch=>{
        getSongDetail(id).then(res=>{
            console.log(res)
            if(res.status == 200){
                dispatch(priviList(res.data.playlist.tracks))
            }
        })
    }
}

export const search=(val)=>{
    return dispatch=>{
        searchMusic(val).then(res=>{
            if(res.status == 200){
                let list = res.data.result.songs
                list.forEach(res=>{
                    res.al={}
                    res.al.picUrl = res.album.artist.img1v1Url
                    res.dt = res.duration
                    res.ar = []
                    res.ar.push({name:res.album.name})
                })
                dispatch(priviList(list))
            }
        })
    }
}
