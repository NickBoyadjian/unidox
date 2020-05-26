import React from "react"
import userGlobal from '../../state/userState'

import './style.scss'

const NavBar = () => {

    const [userState, userActions] = userGlobal();

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item" href="https://bulma.io">
                    {userState.username.charAt(0).toUpperCase() + userState.username.slice(1)}
                </div>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                
                <Menu />

                <div className="navbar-item has-dropdown is-hoverable navbar-end">
                    <div className="navbar-link" id='account'>Account</div>

                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item"> Settings </a>
                        <a className="navbar-item"> Components </a>
                        <hr className="navbar-divider" />
                        <div className="navbar-item">
                            <button className="navbar-item button" onClick={userActions.logout}> Log out </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

const Menu = () => {

    const [userState, userActions] = userGlobal();


    if (!userState.currentNote.id) {
        return <div></div>
    }

    return (
        <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                File
                </a>

                <div class="navbar-dropdown">
                    <a class="navbar-item">
                        Download
                    </a>
                    <a class="navbar-item" onClick={() => userActions.deleteNote(userState.currentNote.id).then(r => userActions.getProfile())}>
                        Delete
                    </a>
                    <hr class="navbar-divider" />
                    <a class="navbar-item">
                        Report an issue
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NavBar;
