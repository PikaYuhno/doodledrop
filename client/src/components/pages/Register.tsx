import React, {useState} from 'react';
import '../../styles/landing/register.scss';
import PressPlay from '../../assets/press_play.png';
import {APIResponse} from '../../global';

type UserRegister = {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirmPassword?: string,
}
const Register = () => {
    const [user, setUser] = useState<UserRegister>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser: UserRegister): UserRegister => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError("Password didn't match. Try again.");
            return;
        }
        console.log(user);
        delete user.confirmPassword;
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        });
        const jsonRes: APIResponse = await response.json();
        if (!jsonRes.success) {
            setError(jsonRes.message);
            return;
        } else {
            setSuccess(jsonRes.message);
        }

    }

    const handleNotfiClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e.currentTarget.name === "error")
            setError("");
        else
            setSuccess("");
    }
    return (
        <React.Fragment>
            <div className="columns" id="columns-wrapper">
                <div className="column" id="login-column">
                    <form className="login-container" onSubmit={handleSubmit}>
                        <h1 className="title" style={{textAlign: 'center'}}>Sign up</h1>
                        {error && <div className="field">
                            <div className="notification is-danger is-light">
                                <button className="delete" name="error" onClick={handleNotfiClose}></button>
                                {error}
                            </div>
                        </div>}
                        {success && <div className="field">
                            <div className="notification is-success is-light">
                                <button className="delete" name="success" onClick={handleNotfiClose}></button>
                                {success}
                            </div>
                        </div>}
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="username" className="input" type="text" placeholder="Username" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="email" className="input" type="email" placeholder="Email" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="first_name" className="input" type="text" placeholder="First Name" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="last_name" className="input" type="text" placeholder="Last Name" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="field is-expanded">
                            <p className="control has-icons-left is-expanded">
                                <input name="password" className="input" type="password" placeholder="Password" onChange={handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field is-expanded">
                            <p className="control has-icons-left is-expanded">
                                <input name="confirmPassword" className="input" type="password" placeholder="Confirm Password" onChange={handleChange} />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <input type="submit" className="button is-danger is-fullwidth" value="Submit" />
                        </div>
                    </form>
                </div>

                <div className="column" id="circle-column">
                    <div className="register-container">
                        <div className="wrapper">
                            <h1 className="title" style={{color: 'white'}}>Already have an Account?</h1>
                            <p className="content" style={{width: '35vw', textAlign: 'center'}}>Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. </p>
                            <input type="button" className="button is-danger is-outlined is-inverted" style={{width: '100px'}} value="Login" />
                        </div>
                        <img src={PressPlay} alt="press_play" id="register-img" />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}
export default Register;
