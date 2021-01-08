import React, { ReactComponentElement } from 'react';
import Navbar from '../layouts/core/Navbar';
import pfp1 from '../../assets/pfp/pfp1.png';
import '../../styles/landing/dashboard.scss';
import { Doodle,User } from '../../global';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { userLoaded } from '../../store/auth/actions';



type ProfileState = {
    user: User;
    doodles: Array<Doodle>;
    follow: Array<User>;
    following: string;
    followers: string;
}

class Profile extends React.Component<{}, ProfileState>{

    TabState = {
        following: "",
        followers: "is-active"
    }

    constructor(props: {}) {
        super(props);
        this.state = {
          user: {id:0,username:"null",avatar:"null",bio:"null",location:"null"},
          doodles: [],
          follow: [],
          following: "is-active",
          followers: ""
        }
        
    }

    componentDidMount = () => {
        const id=1;

        // get id here

        this.handleLoad(id);
    }

    handleLoad = async (id : number) => {
        const resp = await fetch(`/api/users?id=${id}` , {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({user: data.data});


    }

    loadFollowing = async (e: React.MouseEvent<HTMLLIElement>) => {
        if(this.state.following=="is-active"){
            return;
        }
        this.setState({following:"is-active"})
        this.setState({followers:""})
        

        const resp = await fetch(`/api/following/${this.state.user.id}` , {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({follow: data.data});
    }

    loadFollowers = async (e: React.MouseEvent<HTMLLIElement>) => {
        if(this.state.followers=="is-active"){
            return;
        }
        this.setState({followers:"is-active"})
        this.setState({following:""})


        const resp = await fetch(`/api/users?id=${this.state.user.id}` , {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({follow: data.data});
    }

    loadDoodles = async () => {
        const resp = await fetch(`/api/doodle/user/${this.state.user.id}` , {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({doodles: data.data});
    }

    renderDoodles = () => {

    }

    renderFollows = () => {
        return this.state.follow.map((follow:User) => {
            return <React.Fragment key={follow.id}>
                <div className="media">
                    <div className="media-left">
                        <div className="">
                            <p className="image is-48x48">
                                <img src={follow.avatar} className="is-rounded" alt="pfp" />
                            </p>
                        </div>
                    </div>

                    <div className="media-content">
                        <p className="is-size-5 has-text-centered"><strong>{follow.username}</strong></p>
                    </div>

                    <div className="media-right">
                        <button className="button">View</button>
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
                    <div className="box container">
                        <div className="media">
                            <div className="media-left">
                                <div className="image is-256x256">
                                    <img src={this.state.user.avatar} className="is-rounded" />
                                </div>
                            </div>

                            <div className="media-content">
                                <div className="hero">
                                    <div className="hero-body">
                                        <p className="title has-text-centered">{this.state.user.username}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="media-left">
                                <button className="button">Follow</button>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="columns reverse-columns">

                            <div className="column is-two-thirds">
                                <div className="box is-shawowless">

                                    <div className="level">
                                        <div className="level-left">
                                            <div className="ml-2">
                                                <p className="image is-48x48">
                                                    <img src={pfp1} className="is-rounded" alt="pfp" />
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
                                                    <img src={pfp1} className="is-rounded" alt="pfp" />
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

                                {this.renderDoodles}
                            </div>

                            <div className="column">

                                <div className="box">
                                    <div className="tabs is-large is-centered is-boxed">
                                        <ul>
                                            <li className={this.state.followers} onClick={this.loadFollowers}><a>Followers</a></li>
                                            <li className={this.state.following} onClick={this.loadFollowing}><a>Following</a></li>
                                        </ul>
                                    </div>

                                    <div className="media">
                                        <div className="media-left">
                                            <div className="">
                                                <p className="image is-48x48">
                                                    <img src={pfp1} className="is-rounded" alt="pfp" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="media-content">
                                            <p className="is-size-5 has-text-centered"><strong>Name</strong></p>
                                        </div>

                                        <div className="media-right">
                                            <button className="button">View</button>
                                        </div>
                                    </div>

                                    <div className="media">
                                        <div className="media-left">
                                            <div className="">
                                                <p className="image is-48x48">
                                                    <img src={pfp1} className="is-rounded" alt="pfp" />
                                                </p>
                                            </div>
                                        </div>

                                        <div className="media-content">
                                            <p className="is-size-5 has-text-centered"><strong>Name</strong></p>
                                        </div>

                                        <div className="media-right">
                                            <button className="button">View</button>
                                        </div>
                                    </div>

                                    {this.renderFollows()}
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}


export default Profile;
