import React from 'react';
import bgimage from '../../images/bg.svg';

import './style.scss';



export default function Index() {

  return (
    <div className="wrapper">
      <img src={bgimage} className="bgimage" alt="" />
      <h1 className="selectNoteHeader">
        Select a note to get started
      </h1>
    </div>
  )
}
