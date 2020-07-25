import React from 'react';
import userGlobal from '../../state/userState';

import './style.scss'

const NavBar = () => {

    const [userState, userActions] = userGlobal();

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="https://bulma.io">
                    <h1 className="title is-5"><b>Notekeeper</b>
                        <p className="title is-6">{userState.currentNote.title}</p>
                    </h1>

                </div>

                <a href="/login" onClick={() => userActions.logout()} role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <div className="icon">
                        <i className="fa fa-power-off"></i>
                    </div>
                </a>
            </div>

            <div className="navbar-menu">


                <div className="navbar-item has-dropdown is-hoverable navbar-end">
                    <div className="navbar-link" id='account'>{userState.username.charAt(0).toUpperCase() + userState.username.slice(1)}</div>

                    <div className="navbar-dropdown is-right">
                        <div className="navbar-item">
                            <button className="navbar-item button" onClick={userActions.logout}> Log out </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
