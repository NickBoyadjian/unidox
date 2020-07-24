import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import userGlobal from '../../state/userState'
import './style.scss'
import bgimage from '../../images/bg.svg';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [userState, userActions] = userGlobal();

    const handleLogin = async e => {
        e.preventDefault()
        await userActions.login(username, password)
    }

    useEffect(() => {
        if (userState.jwt !== '') {
            userActions.getToken()
        }
    }, []);

    return (
        <>
            <h1 className="appname"><Link to="/home">Note Keeper </ Link></h1>
            <img className="bgimage" src={bgimage} />
            <div className='container login card'>
                <form onSubmit={handleLogin}>
                    <h1>Sign In</h1>
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input is-primary"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-user" />
                            </span>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left has-icons-right">
                            <input
                                className="input is-primary"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-lock" />
                            </span>
                        </div>
                    </div>
                    <p>don't have an account? <Link to="/signup">sign up</Link></p>

                    <p className='error'>{userState.authError}</p>

                    <input
                        className="button is-primary"
                        type="submit"
                        value="Sign In"
                    />
                </form>

            </div>
        </>
    );
}

export default Login
