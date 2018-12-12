import React from 'react'
import PlayBar from '../../components/playBar/PlayBar'
import Lyric from '../../components/lyric/Lyric'
class PlaySong extends React.Component {
   render(){
       return(
           <div>
               <Lyric/>
               <PlayBar/>
           </div>
       )
   }
}

export default PlaySong