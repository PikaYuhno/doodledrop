import React, {CSSProperties, RefObject} from "react";
import {connect} from "react-redux";
import {JWTPayload as AuthUser, User} from "../../global";

type UserProfileProps = StoreProps;

type StoreProps = {
    user: AuthUser;
};

type UserProfileState = {
    //user: User | null;
    user: any;
    editing: boolean;
    updatedUser: any;
};

class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);
        this.state = {
            user: null,
            editing: false,
            updatedUser: {
            },
        };
    }
    async componentDidMount() {
        const options = {
            method: "GET",
            headers: {
                authorization: localStorage.getItem("token") as string,
            },
        };
        const promise = await fetch(
            `/api/users/${this.props.user.id}`,
            options
        );
        const json = await promise.json();
        this.setState({user: json, updatedUser: json});
        console.log(this.state.user);
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

        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token") as string,
            },
            body: JSON.stringify(this.state.updatedUser),
        };
        const promise = await fetch(
            `/api/users/${this.props.user.id}/profile/`,
            options
        );
        if (promise.status === 400) {
            const error = (await promise.json()).error;
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
        const avatar_url = `/profile_pictures/${this.state.user?.avatar}`;
        const user = this.state.updatedUser!;
        return (
            <React.Fragment>
                <div className="container" style={{marginTop: 70}}>
                    <div className="columns">
                        <div className="column is-one-fifths">
                            <div className="user-info-card">
                                <div className="user-info-img">
                                    <input
                                        id="avatar_input"
                                        type="file"
                                        style={{display: "none"}}
                                    />
                                    <img
                                        src={avatar_url}
                                        alt="User Profile Image"
                                        height="150"
                                        width="150"
                                        id="avatar_img"
                                        className="user-avatar"
                                    />
                                    <div
                                        className="middle"
                                    >
                                        <div className="text">
                                            {" "}
                                            CHANGE <br /> AVATAR
                                        </div>
                                    </div>
                                </div>
                                <div className="user-info-name">
                                    <h1 className="title is-6">
                                        {this.state.user!.username}
                                    </h1>
                                </div>
                                <div className="user-info-role">
                                    <span className="role">ROLE</span>
                                    <span className="role-value">
                                        {this.state.user!.role}
                                    </span>
                                </div>
                                <div className="user-info-group">
                                    <span className="group">GROUP</span>
                                    <span className="group-value">
                                        {this.state.user!.group}
                                    </span>
                                </div>
                                <div className="user-info-button">
                                    <button className="button is-success">
                                        <i className="fa fa-copy"></i>
                                        name
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-four-fifths">
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
                                                Number
                                            </span>
                                            <div className="control has-icons-left">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="number"
                                                    disabled
                                                    onChange={this.handleChange}
                                                    value={user.number}
                                                />

                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-phone-alt"></i>
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
                                                        type="text"
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
                                                Gender
                                            </span>
                                            <div className="control has-icons-left">
                                                <div className="select is-fullwidth ">
                                                    <select
                                                        disabled
                                                        name="gender"
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                "#fcfdfe",
                                                        }}
                                                    >
                                                        <option
                                                            selected={
                                                                user.gender
                                                            }
                                                        >
                                                            Man
                                                        </option>
                                                        <option
                                                            selected={
                                                                !user.gender
                                                            }
                                                        >
                                                            Woman
                                                        </option>
                                                    </select>
                                                </div>

                                                <span className="icon is-small is-left">
                                                    <i className="fa fa-venus-mars"></i>
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
                                                        type="text"
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
                                                className="button is-medium"
                                                onClick={this.handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="button is-link is-medium"
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
                                            className="button is-link is-medium"
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.auth.user,
    };
};

export default connect(mapStateToProps)(UserProfile);
