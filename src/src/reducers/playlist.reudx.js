
import axios from 'axios'
//action
const PLAY_LIST = 'PLAY_LIST'
const HOT_LIST = 'HOT_LIST'
const DJ_LIST = 'DJ_LIST'
const SONG_TYPE_LIST= 'SONG_TYPE_LIST'

const initState={
    playlist:[],
    hotlist:[],
    djlist:[],
    songtypelist:[]
}

export const playList =(state = initState,action)=>{
      switch(action.type){
          case PLAY_LIST:
              return {...state,playlist:action.payload}
          case HOT_LIST:
              return {...state,hotlist:action.payload}
          case DJ_LIST:
              return {...state,djlist:action.payload}
          case SONG_TYPE_LIST:
              return {...state,songtypelist:action.payload}
          default:
              return state
      }
}
const playlist =(data)=>{
    return {type:PLAY_LIST,payload:data}
}
const hotlist =(data)=>{
    return {type:HOT_LIST,payload:data}
}
const djlist =(data)=>{
    return {type:DJ_LIST,payload:data}
}
const songTypelist=(data)=>{
    return {type:SONG_TYPE_LIST,payload:data}
}
export const getPlayList=(axiosMethod,val)=>{
    return dispatch=>{
        axiosMethod.then(res=>{
            if(res.status == 200){
                const data = res.data.sub || res.data.result || res.data.programs || res.data.playlists
                switch (val) {
                    case 0:
                        dispatch(playlist(data))
                        break
                    case 1:
                        dispatch(hotlist(data))
                        break
                    case 2:
                        dispatch(djlist(data))
                        break
                    case 3:
                        dispatch(songTypelist(data))
                        break
                }
            }
        })
    }
}