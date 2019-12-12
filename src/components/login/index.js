import React, { useState } from "react"
import userGlobal from '../../state/userState'

const Login = () => {

    const [ username, setUsername ] = useState('nick');
    const [ password, setPassword ] = useState('nick');

    const [userState, userActions] = userGlobal();

    const handleLogin = (e) => {
        e.preventDefault()
        userActions.login(username, password)
    }

    return (
        <div className='login'>
        <form onSubmit={ handleLogin }>
            <input 
                type="text" 
                value={username} 
                placeholder='username'
                //onChange={ e => setUsername(e.target.value) }
            />
            <input 
                type='password' 
                value={password} 
                placeholder='password'
                //onChange={ e => setPassword(e.target.value)}
            />
            <input type='submit' value='Sign in' onClick={ handleLogin } />
        </form>
        
        </div>
    );
}

export default Login
