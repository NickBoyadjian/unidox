import React, { useState } from "react"
import userGlobal from '../../state/userState'

const Dashboard = () => {

    const [userState, userActions] = userGlobal();

    return (
        <div className='dashboard'>
        {userState.jwt}
        </div>
    );
}

export default Dashboard;
