import UsernamePasswordForm from '../components/UsernamePasswordForm'
import { create } from '../api/api';
import UserContext from '../../UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './UserRegister.css';
import logo from '../../public/iBirdLogo.png';

export default function UserRegister() {
    const { setUsername } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (username, password) => {
        create(username, password)
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
                <h1>Create Account</h1>
                <p>Fill your information below</p>
            </div>
            <UsernamePasswordForm buttonText="Sign up" onSubmit={handleSubmit} />

            <p className='Tips_box'>
                Already have an account?<Link to="/login"> Sign in!</Link>
            </p>
        </div>
    )
}
