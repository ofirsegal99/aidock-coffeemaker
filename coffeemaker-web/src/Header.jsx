import React from 'react';
function Header(props) {
  return (
    <div className="headerFirstContainer">
      <div className='headerSecondContainer headerTitle'>
         <img className='headerTitle' src={'https://aidock.net/wp-content/uploads/2021/03/AiDock-Mood-Board2-02.d110a0.webp'} alt=""></img>
         <h1 className='headerTitleText headerTitle'>{props.title}</h1>
      </div>
    </div>
  );
}

export default Header;
