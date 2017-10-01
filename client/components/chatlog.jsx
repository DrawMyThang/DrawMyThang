import React from 'react';

const Chatlog = (props) => {
  let pic = props.msg[2];
  if (props.msg[2] === 'null'){
    pic = props.userPic;
  }

  return (
    <div className = "userChatLog"> 
      <div>
        <img className="userPhoto" src={pic}/>
      </div> 
      <p className="chatMessage" > 
        <span className="userInChat"> {props.msg[0]}
        </span> 
        {" "} {props.msg[1]}
      </p>
    </div>
  );
};

export default Chatlog;