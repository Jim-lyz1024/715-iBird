import UsernamePasswordForm from '../components/UsernamePasswordForm'
import { login } from '../api/api';
import UserContext from '../../UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './UserLogin.css';
import logo from '../../public/iBirdLogo.png';

export default function UserLogin() {
    const { setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (username, password) => {
        login(username, password)
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem("token", token);
                setUsername(username);
                navigate("/", { replace: true });
            })
            .catch((err) => { alert(err.response.data); })
    }

    return (
        <div className='Margin_box'>
            <div className="logo-container">
                <img src={logo} alt="Project Logo" className="logo" /> 
            </div>
            <div className='Login_text_box'>
                <h1>Sign In</h1>
                <p>Hi! Welcome back.</p>
            </div>
            
            <UsernamePasswordForm buttonText="Sign in" onSubmit={handleSubmit} />

            <p className='Tips_box'>
                Don't have account, <Link to="/register"> Sign up!</Link>
            </p>
        </div>
    )
}
