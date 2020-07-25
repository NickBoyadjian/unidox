import React, { useEffect } from 'react'
import userGlobal from '../../state/userState'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

import NavBar from '../navbar'
import LeftMenu from '../leftMenu'
import TextEditor from '../textEditor'

let cssLoaded = false;

const Dashboard = () => {

    const [userState, userActions] = userGlobal()

    useEffect(() => {
        userActions.getProfile();
        if (userState.jwt === '') {
            userActions.getToken();
        }
        if (userState.username === '') {
            userActions.getProfile();
        }
    }, [userActions, userState.jwt, userState.username]);

    if (cssLoaded === false) {
        cssLoaded = true;
        import('./style.scss');
    }

    if (!userState.currentNote.body) {
        return (
            <div className='dashboard'>
                <NavBar />
                <div className='editor-pane'>
                    <SplitterLayout primaryIndex={1} secondaryInitialSize={window.innerWidth / 6}>
                        <LeftMenu />
                        <div className='pick-note'> Select or create a note </div>
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
