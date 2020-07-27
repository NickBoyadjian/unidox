import React, { useState } from 'react';
import userGlobal from '../../state/userState';
import LeftMenu from '../leftMenu';
import BlockStyleControls from '../textEditor/blockStyleControls';
import InlineStyleControls from '../textEditor/inlineStyleControls';
import './style.scss'
import { RichUtils } from 'draft-js';

const NavBar = ({ editorState, setEditorState }) => {

    const [userState, userActions] = userGlobal();
    const [menuState, setMenuState] = useState("");

    const toggleMenu = () => {
        setMenuState(menuState === "" ? "is-active" : "");
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="https://bulma.io">
                    <h1 className="title is-5"><b>Unidox</b>
                        <p className="title is-6">{userState.currentNote.title}</p>
                    </h1>

                </div>

                <div href="#" onClick={() => toggleMenu()} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span /><span /><span />
                </div>
            </div>

            <div className={"navbar-menu " + menuState}>

                <HamburgerMenu
                    userState={userState} userActions={userActions}
                    editorState={editorState} setEditorState={setEditorState} />
                <div className="navbar-item has-dropdown is-hoverable navbar-end">
                    <div className="navbar-link" id='account'>{userState.username.charAt(0).toUpperCase() + userState.username.slice(1)}</div>

                    <div className="navbar-dropdown is-right">
                        <div className="navbar-item">
                            <button className="navbar-item button" onClick={userActions.logout}> Log out </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    );
}

export default NavBar;

const HamburgerMenu = ({ userState, userActions, editorState, setEditorState }) => {

    return (
        <div className="hamburger-menu">
            <button className="button save-note" onClick={() => userActions.updateNote(editorState)}>Save Note</button>
            <div className="controls">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={(blockType) => {
                        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
                    }}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={(inlineStyle) => {
                        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
                    }}
                />
            </div>
            <LeftMenu />
        </div>
    )
}
