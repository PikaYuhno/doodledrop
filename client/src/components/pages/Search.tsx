import React from 'react';
import Navbar from '../layouts/core/Navbar';
import '../../styles/landing/search.scss';
import pfp1 from '../../assets/pfp/pfp1.png';
import {User} from '../../global';
import {Link} from 'react-router-dom';

type SearchState = {
    searchValue: string;
    users: Array<User>;
}

class Search extends React.Component<{}, SearchState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            searchValue: '',
            users: []
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({searchValue: e.target.value});
        
    } 

    handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            const resp = await fetch(`/api/users?username=${this.state.searchValue}`, {
                method: "GET",
                headers: {
                    "Authorization": localStorage.getItem("token") || "token",
                    "Content-Type": "application/json"
                },
            });
            const data = await resp.json();

            this.setState({users: data.data});
        }
    }

    renderUsers = () => {
        return this.state.users.map((user: User) => {
            return <React.Fragment key={user.id}>
                <div className="user-list-item box">
                    <div className="list-item-content">
                        <div className="user-avatar">
                            <figure className="image is-48x48">
                                <img src={user.avatar} alt="avatar" className="is-rounded" />
                            </figure>
                        </div>
                        <div className="user-info">
                            <span className="user-name title is-size-4">{user.username}</span>
                            <span className="user-bio subtitle">{user.bio}</span>
                        </div>
                        <div className="actions">
                            <button className="button is-info is-light">View Profile</button>
                        </div>
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
                            <p className="title is-1 has-text-centered">Search</p>
                        </div>
                    </div>


                    <div className="container is-max-desktop">


                        <div className="control has-icons-left">
                            <input onKeyUp={this.handleEnter} name="search" className="input input-is-large input-is-rounded" type="text" placeholder="Search" onChange={this.handleChange}></input>
                            <span className="icon is-large is-left">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>

                        <div className="users section">

                            {/* <div className="box">
                                <div className="media">
                                    <div className="media-left">
                                        <div className="">
                                            <p className="image is-48x48">
                                                <img src={pfp1} className="is-rounded" alt="pfp" />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="media-content">
                                        <p className="is-size-4 title"><strong>Name</strong></p>
                                        <p className="subtitle">BIO</p>
                                    </div>

                                    <div className="media-right">
                                        <button className="button">View</button>
                                    </div>
                                </div>
                            </div> */}

                            <div className="user-list-item box">
                                <div className="list-item-content">
                                    <div className="user-avatar">
                                        <figure className="image is-48x48">
                                            <img src={pfp1} alt="avatar" className="is-rounded" />
                                        </figure>
                                    </div>
                                    <div className="user-info">
                                        <span className="user-name title is-size-4">Max Mustermann</span>
                                        <span className="user-bio subtitle">This is a status</span>
                                    </div>
                                    <div className="actions">
                                        <Link to={"profile/1"}><button className="button is-info is-light">View Profile</button></Link>
                                    </div>
                                </div>
                            </div>

                            {this.renderUsers()}

                        </div>

                    </div>

                </main>

            </React.Fragment>
        );
    }
}


export default Search;
