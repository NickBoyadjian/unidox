import React, { useEffect } from 'react'
import userGlobal from '../../state/userState'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import NavBar from '../navbar'
import LeftMenu from '../leftMenu'
import TextEditor from '../textEditor'

import './style.scss'

const Dashboard = (props) => {

    const [userState, userActions] = userGlobal()

    useEffect(() => {
        if (userState.jwt === '') {
            userActions.getToken();
        }
        if (userState.username === '') {
            userActions.getProfile();
        }
    }, []);

    if (!userState.currentNote.body) {
        return (
            <div className='dashboard'>
                <NavBar />
                <div className='editor-pane'>
                    <SplitterLayout primaryIndex={1} secondaryInitialSize={window.innerWidth / 6}>
                        <LeftMenu />
                        <div className='pick-note'> Select a note </div>
                    </SplitterLayout>
                </div>
            </div>
        );
    } else {
        return (
            <div className='dashboard'>
                <NavBar />
                <div className='editor-pane'>
                    <SplitterLayout primaryIndex={1} secondaryInitialSize={window.innerWidth / 6}>
                        <LeftMenu />
                        <div className='editor-container'> <TextEditor /> </div>
                    </SplitterLayout>
                </div>
            </div>
        );
    }
}

export default Dashboard;
