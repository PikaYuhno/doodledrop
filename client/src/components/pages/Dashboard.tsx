import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import pfp1 from '../../assets/pfp/pfp1.png';

class Dashboard extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                
                <div className="hero">
                    <div className="hero-body">
                        <p className="title is-1 has-text-centered">Dashboard</p>
                    </div>
                </div>

                <div className="container">



                    <div className="section">
                        <div className="container is-max-widescreen">
                            <div className="columns">

                                <div className="column is-two-thirds">

                                    <div className="box">

                                        <div className="level">
                                            <div className="level-left">
                                                <div className="level-item">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="level-item">
                                                    <p className="is-size-4">Name</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                       <div className="imag is-48x48 container">
                                            <img src={pfp1} />
                                       </div>

                                        <div className="level">
                                            <div className="level-left">
                                                <a className="level-item">
                                                    <span className="icon"><i className="fa fa-reply fa-lg"></i></span>
                                                </a>
                                                <a className="level-item">
                                                    <span className="icon"><i className="fa fa-thumbs-up fa-lg"></i></span>
                                                </a>
                                                <a className="level-item">
                                                    <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                        
                                        
                                        <div className="section">

                                            <div className="media">

                                                <div className="media-left">
                                                    <p className="image is-24x24">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="media-content">
                                                    <p className="is-size-4">Name time</p>
                                                    <br/>
                                                    <p>Content</p>

                                                    <div className="level">
                                                        <div className="level-left">
                                                            <a className="level-item">
                                                                <span className="icon"><i className="fa fa-reply"></i></span>
                                                            </a>
                                                            <a className="level-item">
                                                                <span className="icon"><i className="fa fa-thumbs-up"></i></span>
                                                            </a>
                                                            <a className="level-item">
                                                                <span className="icon"><i className="fa fa-thumbs-down"></i></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>


                                    </div>

                                </div>

                                <div className="column">

                                    <div className="box">

                                    </div>

                                </div>
                            </div>
                        </div>

                       

                        

                    </div>

                </div>

            </React.Fragment>
        );
    }
}


export default Dashboard;
