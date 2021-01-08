import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import pfp1 from '../../assets/pfp/pfp1.png';
import {Doodle, User} from '../../global';

type DashboardState = {
    doodles: Array<Doodle>;
    following: Array<User>;
}

class Dashboard extends React.Component<{}, DashboardState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            doodles: [],
            following: []
        }
    }

    componentDidMount = () => {
        this.loadDoodles();
        this.loadFollowing();
    }

    loadDoodles = async () => {
        const resp = await fetch(`/api/users`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({doodles: data.data});
    }

    loadFollowing = async () => {
        const resp = await fetch(`/api/users/following/`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({following: data.data});
    }

    renderDoodles = () => {
        return this.state.doodles.map((doodle: Doodle) => {

        });
    }

    renderNotification = () => {

    }

    renderFollowing = async () => {
        return this.state.following.map((following: User) => {
            return <React.Fragment key={following.id}>
                <div className="media">
                    <div className="media-left">
                        <div className="">
                            <p className="image is-48x48">
                                <img src={following.pfp_pic_path} className="is-rounded" alt="pfp" />
                            </p>
                        </div>
                    </div>

                    <div className="media-content">
                        <p className="title is-size-5 pt-3"><strong>{following.username}</strong></p>
                    </div>

                    <div className="media-right">
                        <button className="button is-info is-light">View Profile</button>
                    </div>
                </div>
            </React.Fragment>
        });
    }




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



                    <div>
                        <div className="container">
                            <div className="columns reverse-columns">

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
                                                                <span className="icon"><i className="fa fa-thumbs-up"></i> (4)</span>
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
                                        <p className="title has-text-centered">Notifications</p>

                                        <div className="notification is-danger">
                                            Thy shall not pass!
                                        </div>

                                        <div className="notification is-danger">
                                            Thy shall not pass!
                                        </div>
                                    </div>

                                    <div className="box">
                                        <p className="title has-text-centered">Following</p>

                                        <div className="media">
                                            <div className="media-left">
                                                <div className="">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="media-content">
                                                <p className="title is-size-5 pt-3"><strong>Name</strong></p>
                                            </div>

                                            <div className="media-right">
                                                <button className="button is-info is-light">View Profile</button>
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
                                                <p className="title is-size-5 pt-3"><strong>Name</strong></p>
                                            </div>

                                            <div className="media-right">
                                                <button className="button is-info is-light">View Profile</button>
                                            </div>
                                        </div>

                                        {this.renderFollowing}

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
