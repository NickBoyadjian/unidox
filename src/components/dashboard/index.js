import React, { useState, useEffect } from 'react'
import userGlobal from '../../state/userState'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import NavBar from '../navbar'
import LeftMenu from '../leftMenu'
import TextEditor from '../textEditor'

import './style.scss'

const Dashboard = () => {

    const [userState, userActions] = userGlobal()
    const [activeNote, setActiveNote] = useState(3)

    useEffect(() => {
        if (userState.jwt === '') {
            userActions.getToken()
        }
        if (userState.username === '') {
            userActions.getProfile()
        }
    });

    return (
        <div className='dashboard'>
            <NavBar />
            <SplitterLayout primaryIndex={1} secondaryInitialSize={window.innerWidth / 6}>
                <LeftMenu activeNote={activeNote}  setActiveNote={setActiveNote}/>
                <div className='editor-container'> <TextEditor activeNote={activeNote} setActiveNote={setActiveNote} /> </div>
            </SplitterLayout>
        </div>
    );
}

export default Dashboard;
