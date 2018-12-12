
import axios from 'axios'

const URL = 'http://42.51.207.166:9035'


//获取banner图
export const getBanner=()=>axios.get(`${URL}/banner`)

//获取推荐歌单/personalized
export const getSongList=()=>axios.get(`${URL}/personalized`)

//获取推荐电台/personalized/djprogram
export const getDjprogram=()=>axios.get(`${URL}/personalized/djprogram`)

//获取推荐节目/program/recommend
export const getProgramRecommend=()=>axios.get(`${URL}/program/recommend`)

//获取推荐音乐/personalized/newsong
export const getNewSong=()=>axios.get(`${URL}/personalized/newsong`)

//获取歌单分类
export const getSongType=()=>axios.get(`${URL}/playlist/catlist`)

//获取分类歌单列表
export const getSongTypeList=(num,type,page)=>axios.get(`${URL}/top/playlist?limit=${num}&order=${type}&offset=${page}`)

//获取歌单详情
export const getSongDetail=(id)=>axios.get(`${URL}/playlist/detail?id=${id}`)

// 获取音乐url
export const getMusicUrl =(id)=>axios.get(`${URL}/music/url?id=${id}`)
// 获取音乐歌词
export const getMusicLyric =(id)=>axios.get(`${URL}/lyric?id=${id}`)

//搜索歌曲
export const searchMusic =(val)=>axios.get(`${URL}/search?keywords=${val}`)

//获取推荐歌单
//获取推荐歌单
//获取推荐歌单
//获取推荐歌单