import React from 'react';

var Chatlog = (props) => {
    return (
        <div className = "userChatLog"> 
              <div>
                <img className="userPhoto" src={props.userPic}/>
              </div> 
                <p className="chatMessage" > 
                  <span className="userInChat"> {props.msg.split(" ")[0]}
                  </span> 
                  {" "} {props.msg.split(" ")[1]}
                </p> 
        </div>
    )
};

export default Chatlog;