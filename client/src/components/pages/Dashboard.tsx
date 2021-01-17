import React, { TextareaHTMLAttributes } from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import pfp1 from '../../assets/pfp/pfp1.png';
import { Doodle, User, Comment } from '../../global';
import { History } from "history";
import { JWTPayload as AuthUser } from '../../global';
import { connect } from 'react-redux';
import { RootReducer } from '../../store/root-reducer';

type DashboardState = {
    doodles: Array<Doodle>;
    following: Array<User>;
    notifications: Array<number>;
    reply: number;
    comment: string;
}

type DashboardProps = {
    history: History;
    user: AuthUser | null;
}

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.auth.user,
    }
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {

    constructor(props: DashboardProps) {
        super(props);
        this.state = {
            doodles: [],
            following: [],
            notifications: [],
            reply: 0,
            comment: ""
        }
    }

    componentDidMount = () => {
        this.loadDoodles();
        this.loadFollowing();
    }

    handleFeedback = async (id: number, doodle: boolean, like: string) => {
        if (doodle) {
            await fetch(`/api/doodles/${id}/${like}`, {
                method: "PATCH",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });
        }
        else {
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
        this.setState({ reply: doodle_id })
    }

    renderReply = (doodle_id: number) => {
        if (this.state.reply == doodle_id) {
            return <React.Fragment>
                <div className="media ml-5 style">
                    <div className="media-left">
                        <p className="image is-48x48">
                            <img src={pfp1} className="is-rounded" alt="pfp" />
                        </p>
                    </div>
                    <div className="media-content mb-5">
                        <div className="field">
                            <p className="control">
                                <textarea className="textarea is-danger" placeholder="Write Comment here" onChange={this.handleComment}></textarea>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button" onClick={() => { this.postComment(doodle_id) }}>Post Comment</button>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }
    }

    handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ comment: e.target.value })
    }

    postComment = async (doodleid: number) => {
        await fetch(`/api/doodles/${doodleid}/comments`, {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ doodle_id: doodleid, content: this.state.comment })
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

        this.setState({ doodles: data.data });
    }

    loadFollowing = async () => {
        const resp = await fetch(`/api/users/following/${this.props.user?.id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({ following: data.data });
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

        this.setState({ notifications: data.data });
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
                                <p><strong className="is-size-4">{ }</strong> <small>time</small></p>
                            </div>
                        </div>
                        <div className="level-item">
                            <p className="title">{ }</p>
                        </div>
                    </div>

                    <div className="image has-image-sized container">
                        <img src={doodle.image_path} />
                    </div>


                    <div className="columns border is-mobile mt-1">
                        <div className="column has-text-centered">
                            <a className="icon-text" onClick={() => { this.handleReply(doodle.id) }}>
                                <span className="icon"><i className="fa fa-reply fa-lg"></i></span>
                                <span> Reply</span>
                            </a>
                        </div>
                        <div className="column has-text-centered">
                            <a className="icon-text" onClick={() => { this.handleFeedback(doodle.id, true, "like") }}>
                                <span className="icon"><i className="fa fa-thumbs-up fa-lg"></i></span>
                                <span> Like ({doodle.likes.length})</span>
                            </a>
                        </div>
                        <div className="column has-text-centered">
                            <a className="icon-text" onClick={() => { this.handleFeedback(doodle.id, true, "dislike") }}>
                                <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                <span> Dislike ({doodle.dislikes.length})</span>
                            </a>
                        </div>
                    </div>

                    {this.renderReply(doodle.id)}

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

    handleNotification = async (id: number) => {

    }

    renderFollowing = () => {
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
                                                            <img src={pfp1} className="is-rounded" alt="pfp" />
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

                                            <details>
                                                <summary>
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
                                                </summary>

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

                                            </details>

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
                                                        </div>

                                                        <div className="level is-mobile">
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

                                            <div className="level is-mobile">
                                                <div className="level-item">
                                                    <p className="title has-text-centered">Notifications</p>
                                                </div>
                                                <div className="level-left">
                                                    <span className="icon" onClick={this.loadNotifications}><i className="fa fa-history"></i></span>
                                                </div>
                                            </div>

                                            <div className="notifications">
                                                <div className="notification is-danger">
                                                    <button className="delete" onClick={() => { this.handleNotification(1) }}></button>
                                            Thy shall not pass!
                                        </div>

                                                <div className="notification is-danger">
                                                    Thy shall not pass!
                                        </div>




                                                {this.renderNotification()}
                                            </div>
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

                                            {this.renderFollowing()}

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

export default connect(mapStateToProps)(Dashboard);