import React, {useState} from 'react';
import '../../styles/landing/register.scss';
import PressPlay from '../../assets/press_play.png';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {register} from '../../store/auth/actions';
import {connect} from 'react-redux';
import {RootReducer} from '../../store/root-reducer';
import {History} from 'history';
import {alert} from '../../store/alert/actions';
import {AlertType} from '../../store/alert/types';

export type UserRegister = {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirmPassword?: string,
}


type DispatchProps = {
    register: (user: UserRegister) => void;
    alert: (...args: Parameters<typeof alert>) => void;
}

type RegisterProps = {
    isAuthenticated: boolean;
    history?: History;
}

const Register: React.FC<RegisterProps & DispatchProps> = (props) => {
    const [user, setUser] = useState<UserRegister>({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    });

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
            props.alert("Password didn't match. Try again.", AlertType.FAIL, 3);
            return;
        }
        let newUser = {...user};
        delete newUser.confirmPassword
        props.register(newUser);
    }

    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <React.Fragment>
            <div className="columns" id="columns-wrapper">
                <div className="column" id="login-column">
                    <form className="login-container" onSubmit={handleSubmit}>
                        <h1 className="title" style={{textAlign: 'center'}}>Sign up</h1>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="username" className="input" type="text" placeholder="Username" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-user"></i>
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
                                            <i className="fa fa-paper-plane"></i>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <p className="control has-icons-left">
                                        <input name="last_name" className="input" type="text" placeholder="Last Name" onChange={handleChange} />
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-paper-plane"></i>
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
                            <p className="content" style={{width: '35vw', textAlign: 'center'}}>Click here to sign in!</p>
                            <Link to="/auth/login">
                                <input type="button" className="button is-danger is-outlined is-inverted" style={{width: '100px'}} value="Login" />
                            </Link>
                        </div>
                        <img src={PressPlay} alt="press_play" id="register-img" />
                    </div>
                </div>
            </div>
        </React.Fragment >
    );
}

const mapStateToProps = (state: RootReducer) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}
export default withRouter(connect(mapStateToProps, {register, alert})(Register));
