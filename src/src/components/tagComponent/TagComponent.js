import React from 'react'
import { Tag,Skeleton  } from 'antd';

class TagComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            tagList:[]
        }
    }
    componentWillMount(){
        this.props.axiosUrl.then(res=>{
           if(res.status == 200){
               this.setState({
                   tagList:res.data.sub
               })
           }
        })
    }
    render(){
        const sub = this.state.tagList.length>0 ? this.state.tagList.map((res,index)=>{
           return   <Tag style={{margin:10}} key={index} color="#108ee9">{res.name}</Tag>
        }) : <Skeleton/>
        return(
            <div>
                {sub}
            </div>
        )
    }
}
export default TagComponent