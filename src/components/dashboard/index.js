import React, { useEffect } from 'react'
import userGlobal from '../../state/userState'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { EditorState } from 'draft-js';

import NavBar from '../navbar';
import LeftMenu from '../leftMenu';
import TextEditor from '../textEditor';
import ProfileViz from '../profileViz';

let cssLoaded = false;

const Dashboard = () => {
    // State
    const [userState, userActions] = userGlobal();
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

    // Loads the user's profile
    useEffect(() => {
        if (userState.jwt === '') userActions.getToken();
        if (userState.username === '') userActions.getProfile();
    }, [userActions, userState.jwt, userState.username]);

    // dynamically load the style sheet
    if (cssLoaded === false) {
        cssLoaded = true;
        import('./style.scss');
    }

    // render loading screen when the user data is being fetched
    if (!userState.username)
        return <div className="loading-screen"> <h1>Loading...</h1></div>



    return (
        <div className='dashboard'>
            <NavBar editorState={editorState} setEditorState={setEditorState} />
            <div className='editor-pane'>
                <SplitterLayout primaryIndex={1} secondaryInitialSize={window.innerWidth / 6}>
                    <LeftMenu />
                    {!userState.currentNote.title
                        ? <ProfileViz />
                        : <div className='editor-container'> <TextEditor editorState={editorState} setEditorState={setEditorState} /> </div>
                    }
                </SplitterLayout>
            </div>
        </div>
    );
}

export default Dashboard;
