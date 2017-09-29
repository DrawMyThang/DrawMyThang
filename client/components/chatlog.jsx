import React from 'react';

var Chatlog = (props) => {
  //console.log(props, 'chatlog props')
  let pic = props.msg.split(" ")[2];
  if (props.msg.split(" ")[2] === 'null'){
    pic = props.userPic;
  }
    return (
        <div className = "userChatLog"> 
              <div>
                <img className="userPhoto" src={pic}/>
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