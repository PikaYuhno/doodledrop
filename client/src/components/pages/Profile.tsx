import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/dashboard.scss';
import {Doodle, User, Comment} from '../../global';
import {Link} from 'react-router-dom';
import {JWTPayload as AuthUser} from '../../global';
import {connect} from 'react-redux';
import {RootReducer} from '../../store/root-reducer';

type ProfileState = {
    user: User;
    doodles: Array<Doodle>;
    following: Array<User>;
    followers: Array<User>;
    followingClass: string;
    followersClass: string;
    ifollow: boolean;
    delete: number;
    reply: number;
    comment: string;
}

type ProfileProps = {
    id: number;
    user: AuthUser | null;
    history: History;
}

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.auth.user,
    }
}

class Profile extends React.Component<ProfileProps, ProfileState>{

    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            user: {id: 0, username: "", avatar: "", bio: "", location: ""},
            doodles: [],
            following: [],
            followers: [],
            followingClass: "",
            followersClass: "is-active",
            ifollow: false,
            delete: 0,
            reply: 0,
            comment: ""
        }

    }

    componentDidMount = () => {
        this.handleLoad(this.props.id);
        this.loadFollowers();
        this.loadFollowing();
        this.loadDoodles();
    }

    componentDidUpdate(prevProps: ProfileProps) {
        if (prevProps.id != this.props.id) {
            this.handleLoad(this.props.id);
            this.loadFollowers();
            this.loadFollowing();
            this.setState({doodles: []})
            this.loadDoodles();
        }
    }

    handleLoad = async (id: number) => {

        const resp = await fetch(`/api/users/${id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({user: data.data});
    }

    handleFollow = async () => {

        if (this.state.ifollow) {
            await fetch(`/api/users/unfollow/${this.props.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });

            this.setState({ifollow: false});
        }
        else {
            await fetch(`/api/users/follow/${this.props.id}`, {
                method: "POST",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });

            this.setState({ifollow: true});
        }

        this.loadFollowers();
    }

    handleTabs = (following: boolean) => {
        if (following) {
            if (this.state.followingClass != "is-active") {
                this.setState({followingClass: "is-active"})
                this.setState({followersClass: ""})
            }
        }
        else {
            if (this.state.followersClass != "is-active") {
                this.setState({followersClass: "is-active"})
                this.setState({followingClass: ""})
            }
        }
    }

    loadFollowing = async () => {
        const resp = await fetch(`/api/users/following/${this.props.id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({following: data.data});
    }

    loadFollowers = async () => {
        const resp = await fetch(`/api/users/followers/${this.props.id}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({followers: data.data});

        this.setState({ifollow: false})
        for (var i = 0; i < this.state.followers.length; i++) {
            if (this.state.followers[i].id === this.props.user?.id) {
                this.setState({ifollow: true})
            }
        }
    }

    loadDoodles = async () => {

        const resp = await fetch(`/api/users/${this.props.id}/doodles`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });
        const data = await resp.json();

        this.setState({doodles: data.data});

        console.log(data.data);
    }

    renderDoodles = () => {

        return this.state.doodles.map((doodle: Doodle) => {
            return <React.Fragment key={doodle.id}>
                <div className="box is-shawowless">

                    <div className="level is-mobile">
                        <div className="level-left">
                            <div className="ml-2">
                                <p className="image is-64x64">
                                    <Link to={`/profile/${doodle.user.id}`}><img src={`/${doodle.user.avatar}`} className="is-rounded" alt="pfp" /></Link>
                                </p>
                            </div>
                            <div className="ml-2">
                                <p><strong className="is-size-4">{doodle.user.username}</strong> <small>{doodle.created_at.toString}</small></p>
                            </div>
                        </div>
                        <div className="level-item">
                            <p className="title">{doodle.title}</p>
                        </div>
                        <div className="level-right">
                            {this.renderDelete(doodle.id)}
                        </div>
                    </div>

                    <div className="image has-image-sized container">
                        <img src={`/${doodle.image_path}`} />
                    </div>


                    <div className="columns border is-mobile mt-1">
                        <div className="column has-text-centered">
                            <a className="icon-text" onClick={() => {this.handleReply(doodle.id)}}>
                                <span className="icon"><i className="fa fa-reply fa-lg"></i></span>
                                <span> Reply</span>
                            </a>
                        </div>
                        <div className="column has-text-centered">
                            <a className="icon-text" style={(doodle.likes.includes(this.props.user?.id)) ? {color: "grey"} : {}} onClick={() => {(doodle.likes.includes(this.props.user?.id)) ? console.log("ok") : this.handleFeedback(doodle.id, true, "like")}}>
                                <span className="icon"><i className="fa fa-thumbs-up fa-lg"></i></span>
                                <span> Like ({doodle.likes.length})</span>
                            </a>
                        </div>
                        <div className="column has-text-centered">
                            <a className="icon-text" style={(doodle.dislikes.includes(this.props.user?.id)) ? {color: "grey"} : {}} onClick={() => {(doodle.dislikes.includes(this.props.user?.id)) ? console.log("ok") : this.handleFeedback(doodle.id, true, "dislike")}}>
                                <span className="icon"><i className="fa fa-thumbs-down fa-lg"></i></span>
                                <span> Dislike ({doodle.dislikes.length})</span>
                            </a>
                        </div>
                    </div>

                    {this.renderReply(doodle.id, doodle.user)}

                    <div className="">

                        {this.renderComments(doodle.comments)}

                    </div>

                </div>
            </React.Fragment>
        });
    }

    handleReply = (doodle_id: number) => {
        this.setState({reply: doodle_id})
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
        this.loadDoodles();
    }

    renderComments = (comments: Array<Comment> | undefined) => {
        return comments?.map((comment: Comment) => {
            return <React.Fragment key={comment.id}>
                <div className="media ml-5">

                    <div className="media-left">
                        <p className="image is-48x48">
                            <Link to={`profile/${comment.user_id}`}><img src={`/${comment.user.avatar}`} className="is-rounded" alt="pfp" /></Link>
                        </p>
                    </div>
                    <div className="media-content">
                        <p><strong className="is-size-5">{comment.user.username}</strong> <small>{comment.created_at}</small></p>
                        <p className="comment">{comment.content}</p>

                        <div className="level">
                            <div className="level-left">
                                <a className="ml-2" style={(comment.like?.includes(this.props.user?.id)) ? {color: "grey"} : {}} onClick={() => {(comment.like?.includes(this.props.user?.id)) ? this.handleFeedback(comment.id, false, "like") : console.log("ok")}}>
                                    <span className="icon"><i className="fa fa-thumbs-up"></i> ({comment.like?.length})</span>
                                </a>
                                <a className="ml-2" style={(comment.dislikes?.includes(this.props.user?.id)) ? {color: "grey"} : {}} onClick={() => {(comment.dislikes?.includes(this.props.user?.id)) ? this.handleFeedback(comment.id, false, "dislike") : console.log("ok")}}>
                                    <span className="icon"><i className="fa fa-thumbs-down"></i> ({comment.dislikes?.length})</span>
                                </a>
                            </div>
                        </div>
                    </div>


                </div>
            </React.Fragment>
        })
    }

    renderFollows = () => {
        let follow = (this.state.followersClass === "is-active") ? this.state.followers : this.state.following;

        return follow.map((follow: User) => {
            return <React.Fragment key={follow.id}>
                <div className="media">
                    <div className="media-left">
                        <div className="">
                            <p className="image is-48x48">
                                <img src={`/${follow.avatar}`} className="is-rounded" />
                            </p>
                        </div>
                    </div>

                    <div className="media-content">
                        <p className="is-size-5 has-text-centered"><strong>{follow.username}</strong></p>
                    </div>

                    <div className="media-right">
                        <Link to={`/profile/${follow.id}`}><button className="button is-info is-light">View Profile</button></Link>
                    </div>
                </div>
            </React.Fragment>
        });
    }

    renderReply = (doodle_id: number, user: User) => {
        if (this.state.reply == doodle_id) {
            return <React.Fragment>
                <div className="media ml-5 style">
                    <div className="media-left">
                        <p className="image is-48x48">
                            <img src={`/${user.avatar}`} className="is-rounded" alt="pfp" />
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
                                <button className="button" onClick={() => {this.postComment(doodle_id)}}>Post Comment</button>
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }
    }

    handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({comment: e.target.value})
    }

    postComment = async (doodleid: number) => {
        await fetch(`/api/doodles/${doodleid}/comments`, {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({doodle_id: doodleid, content: this.state.comment})
        });
    }

    renderButton = () => {
        if (this.state.user.id === this.props.user?.id) {
            return;
        }

        if (this.state.ifollow) {
            return <React.Fragment>
                <button onClick={this.handleFollow} className="button"><span className="icon mr-1"><i className="fa fa-minus"></i></span> Unfollow</button>
            </React.Fragment>
        }
        else {
            return <React.Fragment>
                <button onClick={this.handleFollow} className="button"><span className="icon mr-1"><i className="fa fa-plus"></i></span> Follow</button>
            </React.Fragment>
        }
    }

    handleDelete = async (id: number) => {
        await fetch(`/api/doodles/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
        });

        this.loadDoodles();
    }

    renderDelete = (id: number) => {
        if (this.props.user?.id === this.state.user.id) {
            return <React.Fragment>
                <button className="button" onClick={() => {this.setState({delete: id})}}>
                    <div className="icon">
                        <span className="icon is-medium"><i className="fa fa-trash"></i></span>
                    </div>
                </button>

                <div className={(this.state.delete == id) ? "modal is-active" : "modal"}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <div className="modal-card-head">
                            <p className="modal-card-title">Are you sure you want to delete this doodle?</p>
                        </div>
                        <div className="modal-card-foot">
                            <button className="button" onClick={() => {this.handleDelete(id)}}>Delete</button>
                            <button className="button" onClick={() => {this.setState({delete: 0})}}>Close</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        }
    }

    render() {

        return (
            <React.Fragment>
                <Navbar />

                <main>
                    <div className="box container">
                        <div className="media">
                            <div className="media-left mt-5">
                                <div className="image is-128x128">
                                    <img src={`/${this.state.user.avatar}`} className="is-rounded" />
                                </div>
                                <div className="mt-3 has-text-centered">
                                    {this.renderButton()}
                                </div>
                            </div>

                            <div className="media-content">
                                <div className="hero">
                                    <div className="hero-body">
                                        <p className="title has-text-centered">{this.state.user.username}</p>
                                        <p className="subtitle has-text-centered">{this.state.user.bio}</p>
                                    </div>
                                </div>

                                <div className="level is-mobile has-text-centered">
                                    <div className="level-item">
                                        <div>
                                            <p className="heading">Doodles</p>
                                            <p>{this.state.doodles.length}</p>
                                        </div>
                                    </div>
                                    <div className="level-item">
                                        <div>
                                            <p className="heading">Following</p>
                                            <p>{this.state.following.length}</p>
                                        </div>
                                    </div>
                                    <div className="level-item">
                                        <div>
                                            <p className="heading">Followers</p>
                                            <p>{this.state.followers.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="container">
                        <div className="columns reverse-columns">

                            <div className="column is-two-thirds">


                                {this.renderDoodles()}
                            </div>

                            <div className="column">

                                <div className="box">
                                    <div className="tabs is-large is-centered is-boxed">
                                        <ul>
                                            <li className={this.state.followersClass} onClick={() => {this.handleTabs(false)}}><a>Followers</a></li>
                                            <li className={this.state.followingClass} onClick={() => {this.handleTabs(true)}}><a>Following</a></li>
                                        </ul>
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

export default connect(mapStateToProps)(Profile);
