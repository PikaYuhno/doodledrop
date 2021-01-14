import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import pfp1 from '../../assets/pfp/pfp1.png';
import {Doodle, User, Comment} from '../../global';
import {History} from "history";

type DashboardState = {
    doodles: Array<Doodle>;
    following: Array<User>;
    notifications: Array<number>;
    reply: number;
}

type DashboardProps = {
    history: History;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            doodles: [],
            following: [],
            notifications:[],
            reply: 0
        }
    }

    componentDidMount = () => {
        this.loadDoodles();
        this.loadFollowing();
    }

    handleFeedback = async (id: number, doodle: boolean, like: string) => {
        if(doodle){
            await fetch(`/api/doodles/${id}/${like}`, {
                method: "PATCH",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });
        }
        else{
            await fetch(`/api/doodles/comment/${id}/${like}`, {
                method: "PATCH",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });
        } 
    }

    handleReply = (doodle_id: number) => {
        this.setState({reply: doodle_id})
    }

    renderReply = (doodle_id: number) => {
        if(this.state.reply == doodle_id){
            return <React.Fragment>
            <div className="media ml-5 style">
                <div className="media-left">
                    <p className="image is-24x24">
                        <img src={pfp1} className="is-rounded" alt="pfp" />
                    </p>
                </div>
                <div className="media-content">
                    <textarea className="textarea is-danger" placeholder="Write Comment here"></textarea>

                </div>
                <div className="media-right">
                    <button className="button" onClick={() => {this.postComment}}>Post Comment</button>
                </div>
            </div>
        </React.Fragment>
        }
    }

    postComment = async (doodleid: number, content: string) => {
        await fetch(`/api/doodles/${doodleid}/comments`, {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({doodle_id: doodleid, content: content})
        });
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

    loadNotifications = async () => {
        const resp = await fetch(``, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({notifications: data.data});
    }

    renderDoodles = () => {
        return this.state.doodles.map((doodle: Doodle) => {
            return <React.Fragment key={doodle.id}>
                <div className="box is-shawowless">

                    <div className="level is-mobile">
                        <div className="level-left">
                            <div className="ml-2">
                                <p className="image is-64x64">
                                    <img src={pfp1} className="is-rounded" alt="pfp" />
                                </p>
                            </div>
                            <div className="ml-2">
                                <p><strong className="is-size-4">{}</strong> <small>time</small></p>
                            </div>
                        </div>
                        <div className="level-item">
                            <p className="title">{}</p>
                        </div>
                    </div>

                    <div className="image has-image-sized container">
                        <img src={doodle.image_path} />
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
                                <span> Like ({doodle.likes.length})</span>
                            </a>
                        </div>
                        <div className="column has-text-centered">
                            <a className="icon-text">
                                <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                <span> Dislike ({doodle.dislikes.length})</span>
                            </a>
                        </div>
                    </div>

                    <div className="">

                    </div>

                    <div className="">

                        <div className="media ml-5">

                            <div className="media-left">
                                <p className="image is-48x48">
                                    <img src={pfp1} className="is-rounded" alt="pfp" />
                                </p>
                            </div>
                            <div className="media-content">
                                <p><strong className="is-size-5">Name</strong> <small>time</small></p>
                                <p className="comment">foivnsifenvinsringielvuihseingihrtiuhbihrnginbsrtibiubsreibsiehfpawheiueriughilsdhilerhdsnbieshrifusberiuhgisuernbostghiueriueiubebgeoihrivegusenvnigsirnilsehriogugieng
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
            </React.Fragment>
        });
    }

    renderComments = (comments: Array<Comment>) => {
            return comments.map((comment: Comment) => {
                return <React.Fragment key={comment.id}>
                    <div className="media ml-5">

                        <div className="media-left">
                            <p className="image is-48x48">
                                <img src={pfp1} className="is-rounded" alt="pfp" />
                            </p>
                        </div>
                        <div className="media-content">
                            <p><strong className="is-size-5">Name</strong> <small>time</small></p>
                            <p className="comment">foivnsifenvinsringielvuihseingihrtiuhbihrnginbsrtibiubsreibsiehfpawheiueriughilsdhilerhdsnbieshrifusberiuhgisuernbostghiueriueiubebgeoihrivegusenvnigsirnilsehriogugieng
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
                </React.Fragment>
            })
    }

    renderNotification = () => {
        // return this.state.notifications.map((notification: Notification) => {
        //     return <React.Fragment key={}>
        //         <div className="notification is-danger">
        //             Thy shall not pass!
        //         </div>
        //     </React.Fragment>
        // })
    }

    renderFollowing = async () => {
        return this.state.following.map((following: User) => {
            return <React.Fragment key={following.id}>
                <div className="media">
                    <div className="media-left">
                        <div className="">
                            <p className="image is-48x48">
                                <img src={following.avatar} className="is-rounded" alt="pfp" />
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

                                        <div className="level is-mobile">
                                            <div className="level-left">
                                                <div className="ml-2">
                                                    <p className="image is-64x64">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="ml-2">
                                                    <p><strong className="is-size-4">Name</strong> <small>time</small></p>
                                                </div>
                                            </div>
                                            <div className="level-item">
                                                <p className="title">titel</p>
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

                                        {this.renderReply(0)}

                                        <div className="">

                                                <div className="media ml-5">

                                                <div className="media-left">
                                                    <p className="image is-48x48">
                                                        <img src={pfp1} className="is-rounded" alt="pfp"/>
                                                    </p>
                                                </div>
                                                <div className="media-content">
                                                    <p><strong className="is-size-5">Name</strong> <small>time</small></p>
                                                    <p className="comment">foivnsifenvinsringielvuihseingihrtiuhbihrnginbsrtibiubsreibsiehfpawheiueriughilsdhilerhdsnbieshrifusberiuhgisuernbostghiueriueiubebgeoihrivegusenvnigsirnilsehriogugieng
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

                                        <div className="media ml-5 style">
                                            <div className="media-left">
                                                <p className="image is-24x24">
                                                    <img src={pfp1} className="is-rounded" alt="pfp" />
                                                </p>
                                            </div>
                                            <div className="media-content">
                                                <div className="field">
                                                    <p className="control">
                                                        <textarea className="textarea is-danger" placeholder="Add a comment..."></textarea>
                                                    </p>
                                                </div>
                                                <div className="field">
                                                    <p className="control">
                                                        <button className="button">Post comment</button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="">

                                            <div className="media ml-5">
                                                <div className="media-left">
                                                    <p className="image is-24x24">
                                                        <img src={pfp1} className="is-rounded" alt="pfp" />
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
                                    
                                    {this.renderDoodles}

                                    <div className="column">

                                    <div className="box">
                                        <div className="level is-mobile">
                                            <div className="level-item">
                                                <p className="title has-text-centered">Notifications</p>
                                            </div>
                                            <div className="level-left">
                                                <span className="icon" onClick={this.loadNotifications}><i className="fa fa-history"></i></span>
                                            </div>
                                        </div>                                           
                                        

                                        <div className="notification is-danger">
                                            <button className="delete"></button>
                                            Thy shall not pass!
                                        </div>

                                            <div className="notification is-danger">
                                                Thy shall not pass!
                                        </div>
                                        </div>

                                        {this.renderNotification()}
                                    </div>

                                        <div className="box">
                                            <p className="title has-text-centered">Following</p>

                                            <div className="media">
                                                <div className="media-left">
                                                    <div className="">
                                                        <p className="image is-48x48">
                                                            <img src={pfp1} className="is-rounded" alt="pfp" />
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
                                                            <img src={pfp1} className="is-rounded" alt="pfp" />
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