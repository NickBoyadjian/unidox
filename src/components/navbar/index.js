import React, { useState, useEffect } from "react"
import userGlobal from '../../state/userState'

import './style.scss'

const NavBar = () => {

    const [userState, userActions] = userGlobal();

    return (
        <div>
        <nav>
            <ul className="left-side">
                <li>
                    <span className="icon is-small is-left"><i className="fa fa-user" /></span>
                    Hello, {userState.username}
                </li>
            </ul> 

            <div className='right-side'>
                <button className='neu-btn' onClick={userActions.logout}> Log Out</button>
            </div>
        </nav>
        </div>
    );
}

export default NavBar;
