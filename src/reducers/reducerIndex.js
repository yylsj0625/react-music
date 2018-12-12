
import {combineReducers} from 'redux'
import {playList} from "./playlist.reudx";
import {songDetail} from './songDetail.redux'

const reducersIndex =combineReducers({
      playList,songDetail
})

export default reducersIndex