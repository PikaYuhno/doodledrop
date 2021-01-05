import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import pfp1 from '../../assets/pfp/pfp1.png';

class Dashboard extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                <div className="hero">
                    <div className="hero-body">
                        <p className="title is-1 has-text-centered">Dashboard</p>
                    </div>
                </div>

                <div className="container">



                    <div className="section">
                        <div className="container">
                            <div className="columns">

                                <div className="column is-two-thirds">

                                    <div className="box is-shawowless">

                                        <div className="level">
                                            <div className="level-left">
                                                <div className="ml-2">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="ml-2">
                                                    <p><strong className="is-size-4">Name</strong> <small>time</small></p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                       <div className="image has-image-sized container">
                                            <img src={pfp1} />
                                       </div>


                                        <div className="columns border is-mobile mt-1">
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-reply fa-lg"></i></span>
                                                    <span> Reply</span>
                                                </a>
                                            </div>
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-thumbs-up fa-lg"></i></span>
                                                    <span> Like</span>
                                                </a>
                                            </div>
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                                    <span> Dislike</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="">

                                        </div>
                                        
                                        <div className="comment">

                                            <div className="media ml-5">

                                                <div className="media-left">
                                                    <p className="image is-24x24">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="media-content">
                                                    <p><strong className="is-size-5">Name</strong> <small>time</small></p>
                                                    <p>foivnsifenvinsringielvuihseingihrtiuhbihrnginbsrtibiubsreibsiehfpawheiueriughilsdhilerhdsnbieshrifusberiuhgisuernbostghiueriueiubebgeoihrivegusenvnigsirnilsehriogugieng
                                                        s
                                                    </p>

                                                    <div className="level">
                                                        <div className="level-left">
                                                            <a className="ml-2">
                                                                <span className="icon"><i className="fa fa-thumbs-up"></i></span>
                                                            </a>
                                                            <a className="ml-2">
                                                                <span className="icon"><i className="fa fa-thumbs-down"></i></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            
                                        </div>

                                    </div>

                                    <div className="box is-shawowless">

                                        <div className="level">
                                            <div className="level-left">
                                                <div className="ml-2">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="ml-2">
                                                    <p><strong className="is-size-4">Name</strong> <small>time</small></p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                       <div className="image has-image-sized container">
                                            <img src={pfp1} />
                                       </div>


                                        <div className="columns border is-mobile mt-1">
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-reply fa-lg"></i></span>
                                                    <span> Reply</span>
                                                </a>
                                            </div>
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-thumbs-up fa-lg"></i></span>
                                                    <span> Like</span>
                                                </a>
                                            </div>
                                            <div className="column has-text-centered">
                                                <a className="icon-text">
                                                    <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                                    <span> Dislike</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="media ml-5">
                                            <div className="media-left">
                                                    <p className="image is-24x24">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                            </div>
                                            <div className="media-content">
                                                <textarea className="textarea is-danger" placeholder="Write Comment here"></textarea>
                                                
                                            </div>
                                            <div className="media-right">
                                                <button className="button">Post Comment</button>
                                            </div>
                                        </div>
                                        
                                        <div className="comment">

                                            <div className="media ml-5">

                                                <div className="media-left">
                                                    <p className="image is-24x24">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="media-content">
                                                    <p><strong className="is-size-5">Name</strong> <small>time</small></p>
                                                    <p>foivnsifenvinsringielvuihseingihrtiuhbihrnginbsrtibiubsreibsiehfpawheiueriughilsdhilerhdsnbieshrifusberiuhgisuernbostghiueriueiubebgeoihrivegusenvnigsirnilsehriogugieng
                                                        s
                                                    </p>

                                                    <div className="level">
                                                        <div className="level-left">
                                                            <a className="ml-2">
                                                                <span className="icon"><i className="fa fa-thumbs-up"></i></span>
                                                            </a>
                                                            <a className="ml-2">
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
                                        <p className="title">Notifications</p>
                                        
                                        <div className="notification is-danger">
                                            You shall not pass!
                                        </div>
                                        
                                        <div className="notification is-danger">
                                            You shall not pass!
                                        </div>
                                    </div>

                                    <div className="box">
                                        <p className="title">Following</p>

                                        <div className="media">
                                            <div className="media-left">
                                                <div className="">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="media-content">
                                                <p className="is-size-3 has-text-centered"><strong>Name</strong></p>
                                            </div>
                                
                                            <div className="media-right">
                                                <button className="button">View</button>
                                            </div>
                                        </div>

                                        <div className="media">
                                            <div className="media-left">
                                                <div className="">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="media-content">
                                                <p className="is-size-3 has-text-centered"><strong>Name</strong></p>
                                            </div>
                                
                                            <div className="media-right">
                                                <button className="button">View</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                       

                        

                    </div>

                </div>  
                </main>
                
                

            </React.Fragment>
        );
    }
}


export default Dashboard;