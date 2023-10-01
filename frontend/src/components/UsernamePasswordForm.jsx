import { useState } from "react";
import {
    Form,
    Input,
    Button,
  } from 'antd-mobile'
export default function UsernamePasswordForm({ buttonText, onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(username, password);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="Form_box">
                <p>
                    <label for="username">Username:</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </p>

                <p>
                    <label for="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>

                <p className="button_box">
                    <Button block type='submit' color='primary' size='large' className="login_button">
                        {buttonText}
                    </Button>
                </p>
                
              
            </form>
        </div>
    );
}