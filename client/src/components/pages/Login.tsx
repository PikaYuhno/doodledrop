import React from 'react';
import '../../styles/landing/login.scss';
import PressPlay from '../../assets/press_play.png';

const Login = () => {
    return (
        <React.Fragment>
            <div className="columns" id="columns-wrapper" style={{height: '100%'}}>
                <div className="column" id="circle-column">
                    <div className="register-container" >
                        <div className="wrapper">
                            <h1 className="title" style={{color: 'white'}}>New Here?</h1>
                            <p className="content" style={{width: '500px', textAlign: 'center'}}>Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Quasi reprehenderit maiores iure facere quod possimus earum tempore </p>
                            <input type="button" className="button is-danger is-outlined is-inverted" value="Register" />
                        </div>
                        <img src={PressPlay} alt="press_play" id="register-img" />
                    </div>
                </div>
                <div className="column" id="login-column">
                    <form className="login-container">
                        <h1 className="title" style={{textAlign: 'center'}}>Sign in</h1>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input className="input" type="email" placeholder="Email" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control has-icons-left">
                                <input className="input" type="password" placeholder="Password" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field ">
                            <input type="button" className="button is-danger is-fullwidth" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Login;
