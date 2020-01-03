import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'

import './style.scss'

const NavBar = () => {

    const [userState, userActions] = userGlobal();

    return (
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item" href="https://bulma.io">
                    {userState.username.charAt(0).toUpperCase() + userState.username.slice(1)}
                </div>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div class="navbar-menu">
                <div class="navbar-start">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                        File
                        </a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">
                                Save
                            </a>
                            <a class="navbar-item">
                                Download
                            </a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-link" id='account'>Account</div>

                    <div class="navbar-dropdown is-right">
                        <a class="navbar-item"> Settings </a>
                        <a class="navbar-item"> Components </a>
                        <hr class="navbar-divider" />
                        <div class="navbar-item">
                            <button class="navbar-item button" onClick={userActions.logout}> Log out </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
