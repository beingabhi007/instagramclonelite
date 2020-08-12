import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';



export default function Post({ username, caption, imageUrl }) {
    return (
        <div className="post" style={{marginLeft: "auto", marginRight: "auto"}} >
        <div className="post-header">
        <Avatar 
         className="post__avatar"
         alt="AbhiSahu"
         src="avatrat.jpg"   
        />  
        <h3>{username}</h3>    
        </div>
        
        <img 
        className="post__image"
        src={imageUrl}
        alt="post_by_user"    
        />
        <h4 className="post__text"> <strong>{username + "  "}</strong>{caption}</h4>
        </div>
    )
}
