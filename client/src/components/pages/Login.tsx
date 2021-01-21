import React, {useState} from 'react';
import styles from '../../styles/landing/login.module.scss';
import PressPlay from '../../assets/press_play.png';
import {login} from '../../store/auth/actions';
import {alert} from '../../store/alert/actions';
import {connect, ConnectedProps} from "react-redux";
import {Redirect, Link} from 'react-router-dom';
import {RootReducer} from '../../store/root-reducer';
import {AlertType} from '../../store/alert/types';

export type UserLogin = {
    email: string;
    password: string;
}

type LoginProps = {
    isAuthenticated: boolean;
} & PropsFromStore;

const mapStateToProps = (state: RootReducer) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
}

const connector = connect(mapStateToProps, {login, alert});
type PropsFromStore = ConnectedProps<typeof connector>;

const Login: React.FC<LoginProps> = (props) => {
    const [user, setUser] = useState<UserLogin>({email: '', password: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevUser => {
            return {
                ...prevUser,
                [e.target.name]: e.target.value
            }
        });

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.email === '' || user.password === '') {
            props.alert("Email or password can't be empty!", AlertType.FAIL, 3);
            return;
        }
        props.login(user);
    }

    if (props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <React.Fragment>
            <div className="columns" id={styles['columns-wrapper']} style={{height: '100%'}}>
                <div className="column" id={styles['circle-column']}>
                    <div className={styles['register-container']} >
                        <div className={styles.wrapper}>
                            <h1 className="title" style={{color: 'white'}}>New Here?</h1>
                            <p className="content" style={{width: '500px', textAlign: 'center'}}>Click here to make a new account</p>
                            <Link to="/auth/register">
                                <input type="button" className="button is-danger is-outlined is-inverted" value="Register" />
                            </Link>
                        </div>
                        <img src={PressPlay} alt="press_play" id={styles['register-img']} />
                    </div>
                </div>
                <div className="column" id={styles['login-column']}>
                    <form className={styles['login-container']} onSubmit={handleSubmit}>
                        <h1 className="title" style={{textAlign: 'center'}}>Sign in</h1>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input className="input" onChange={handleChange} name="email" type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input className="input" name="password" onChange={handleChange} type="password" placeholder="Password" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field ">
                            <input type="submit" className="button is-danger is-fullwidth" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default connector(Login);
