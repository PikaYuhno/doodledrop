import React, {CSSProperties, RefObject} from "react";
import {connect} from "react-redux";
import {JWTPayload as AuthUser, User, ActionCreator} from "../../global";
import Navbar from '../layouts/core/Navbar';
import {RootReducer} from "../../store/root-reducer";
import '../../styles/core/user-profile.scss';
import {alert} from '../../store/alert/actions';
import {AlertType} from "../../store/alert/types";
import Options from '../../utils/RegionList';

type UserProfileProps = StoreProps & DispatchProps;

type StoreProps = {
    user: AuthUser | null;
};

type UserProfileState = {
    user: User | null;
    editing: boolean;
    updatedUser: any;
};

type DispatchProps = {
    alert: ActionCreator<typeof alert>;
}

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            user: null,
            editing: false,
            updatedUser: {},
        };
    }
    componentDidUpdate() {
        if (this.props.user !== null && this.state.user == null)
            this.fetchUser();

    }


    async componentDidMount() {
        console.log("User-Profile: ", this.props);
        this.fetchUser();
    }

    fetchUser = async () => {
        if (!this.props.user) return;
        const options = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
            },
        };
        const promise = await fetch(
            `/api/users/${this.props.user.id}`,
            options
        );
        const json = await promise.json();
        if (json.success) {
            this.setState({user: json.data, updatedUser: json.data});
        }
    }

    handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        console.log("Changed - value: ", e.target.value);
        let updatedUser = {
            ...this.state.updatedUser,
            [e.target.name]: e.target.value,
        };
        this.setState({updatedUser});
    };

    handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setEditing(true);
    };

    handleSave = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setEditing(false);
        if (!this.props.user) return;

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || "token",
            },
            body: JSON.stringify(this.state.updatedUser),
        };
        const promise = await fetch(
            `/api/users/${this.props.user.id}/profile/`,
            options
        );
        const jsonRes = await promise.json();
        if (jsonRes.success) {
            this.props.alert(jsonRes.message, AlertType.SUCCESS, 3);
        } else {
            this.props.alert(jsonRes.message, AlertType.FAIL, 3);
        }
    };

    handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState({
            updatedUser: {
                ...this.state.updatedUser,
            },
        });
        this.setEditing(false);
    };

    setEditing = (editing: boolean) => {
        if (editing) {
            this.setState({editing: true});
            let disabledElements = document.querySelectorAll(
                "input[disabled], select[disabled]"
            );
            for (let i = 0; i < disabledElements.length; i++) {
                disabledElements[i].removeAttribute("disabled");
            }
        } else {
            this.setState({editing: false});
            let inputElements = document.querySelectorAll("input, select");
            for (let i = 0; i < inputElements.length; i++) {
                inputElements[i].setAttribute("disabled", "");
            }
        }
    };

    render() {
        if (!this.state.user)
            return (<h1>Loading...</h1>);
        console.log("User", this.state.user);
        const user = this.state.updatedUser || null;
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <div className="container" style={{height: '100%', padding: '1rem'}}>
                        <div className="columns" id="user-profile-columns">
                            <div className="column is-one-fifths" id="user-info-column">
                                <div className="user-info-card">
                                    <div className="user-info-img">
                                        <input
                                            id="avatar_input"
                                            type="file"
                                            style={{display: "none"}}
                                        />
                                        <img
                                            src={this.state.user.avatar}
                                            alt="User Profile Image"
                                            height="150"
                                            width="150"
                                            id="avatar_img"
                                            className="user-avatar-card"
                                        />
                                    </div>
                                    <div className="user-info-name">
                                        <h1 className="title is-6">
                                            {this.state.user.username}
                                        </h1>
                                    </div>
                                    <div className="user-infos">
                                        <div className="user-info-item">
                                            <span className="item">DOODLES</span>
                                            <span className="item-value">
                                                {53}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="user-info-button">
                                        <button className="button is-danger is-light">
                                            <span className="icon is-small">
                                                <i className="fa fa-user"></i>
                                            </span>
                                            <span>View Profile</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-four-fifths" id="user-settings-column">
                                <div className="user-settings-card">
                                    <div className="setting-title-container">
                                        <span className="setting-title">
                                            {" "}
                                            Account Settings{" "}
                                            <i className="fa fa-user-cog"></i>
                                        </span>
                                    </div>
                                    <div
                                        className="columns"
                                        style={{
                                            borderTop: "1px solid #ebe9e6",
                                            marginTop: 5,
                                        }}
                                    >
                                        <div className="column">
                                            <div className="input-item">
                                                <span className="input-title">
                                                    Username
                                            </span>
                                                <div className="control has-icons-left">
                                                    <input
                                                        className="input"
                                                        name="username"
                                                        disabled
                                                        type="text"
                                                        onChange={this.handleChange}
                                                        value={user.username}
                                                    />
                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-user"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="input-item">
                                                <span className="input-title">
                                                    First Name
                                            </span>
                                                <div className="control has-icons-left">
                                                    <input
                                                        className="input"
                                                        name="first_name"
                                                        type="text"
                                                        disabled
                                                        onChange={this.handleChange}
                                                        value={user.first_name}
                                                    />

                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-address-card"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="input-item">
                                                <span className="input-title">
                                                    Bio
                                            </span>
                                                <div className="control has-icons-left">
                                                    <input
                                                        className="input"
                                                        type="textarea"
                                                        name="number"
                                                        disabled
                                                        onChange={this.handleChange}
                                                        value={user.bio}
                                                    />

                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-hashtag"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {this.state.editing && (
                                                <div className="input-item">
                                                    <span className="input-title">
                                                        Password
                                                </span>
                                                    <div className="control has-icons-left">
                                                        <input
                                                            className="input"
                                                            type="password"
                                                            name="password"
                                                            onChange={
                                                                this.handleChange
                                                            }
                                                        />

                                                        <span className="icon is-small is-left">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="column is-half">
                                            <div className="input-item">
                                                <span className="input-title">
                                                    E-Mail
                                            </span>
                                                <div className="control has-icons-left">
                                                    <input
                                                        className="input"
                                                        type="email"
                                                        onChange={this.handleChange}
                                                        disabled
                                                        name="email"
                                                        value={user.email}
                                                    />
                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-envelope"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="input-item">
                                                <span className="input-title">
                                                    Last Name
                                            </span>
                                                <div className="control has-icons-left">
                                                    <input
                                                        className="input"
                                                        type="text"
                                                        name="last_name"
                                                        disabled
                                                        onChange={this.handleChange}
                                                        value={user.last_name}
                                                    />

                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-address-card"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="input-item">
                                                <span className="input-title">
                                                    Location
                                            </span>
                                                <div className="control has-icons-left">
                                                    <div className="select is-fullwidth ">
                                                        <select
                                                            disabled
                                                            name="location"
                                                            onChange={
                                                                this.handleChange
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "#fcfdfe",
                                                            }}
                                                            value={user.location || this.state.user.location}
                                                        >
                                                            {
                                                                Options.map(option => {
                                                                    return (<option key={Date.now() - Math.random()} value={option.value}>{option.label}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>

                                                    <span className="icon is-small is-left">
                                                        <i className="fa fa-globe"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            {this.state.editing && (
                                                <div className="input-item">
                                                    <span className="input-title">
                                                        Confirm Password
                                                </span>
                                                    <div className="control has-icons-left">
                                                        <input
                                                            className="input"
                                                            type="password"
                                                            name="confirmPassword"
                                                            onChange={
                                                                this.handleChange
                                                            }
                                                        />
                                                        <span className="icon is-small is-left">
                                                            <i className="fa fa-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {this.state.editing && (
                                        <div className="button-container">
                                            <div className="buttons">
                                                <button
                                                    className="button is-medium is-light"
                                                    onClick={this.handleCancel}
                                                >
                                                    Cancel
                                            </button>
                                                <button
                                                    className="button is-link is-medium is-light is-success"
                                                    onClick={this.handleSave}
                                                >
                                                    Save
                                            </button>
                                            </div>
                                        </div>
                                    )}

                                    {!this.state.editing && (
                                        <div className="button-container">
                                            <button
                                                className="button is-link is-medium is-light is-danger"
                                                onClick={this.handleEdit}
                                            >
                                                Edit
                                        </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps, {alert})(UserProfile);
