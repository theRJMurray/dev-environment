import { useState } from 'react';
import { register } from '../actions/authActions';
import { useDispatch } from 'react-redux'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch()

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, email, password, confirmPassword)
        dispatch(register(username, email, password, confirmPassword))
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" username="username" placeholder="username" onChange={e => onChangeUsername(e)} /> <br />
            <input type="text" email="email" placeholder="email" onChange={e => onChangeEmail(e)} /> <br />
            <input type="text" password="password" placeholder="password" onChange={e => onChangePassword(e)} /> <br />
            <input type="text" placeholder="confirm password" onChange={e => onChangeConfirmPassword(e)} /> <br />
            <input type="submit" value="register" />
        </form>
    </div>
}

export default Register;