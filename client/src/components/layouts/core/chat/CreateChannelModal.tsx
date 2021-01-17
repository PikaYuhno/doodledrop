import React from 'react';
import {User, ActionCreator} from '../../../../global';
import {channelAdded} from '../../../../store/chat/actions';
import {connect} from 'react-redux';
import VoidImg from '../../../../assets/void.png';


type CreateChannelModalState = {
    users: User[];
    selectedUser: number | null;
}

type CreateChannelModalProps = {
    open: boolean;
    onClose: () => void;
    channelAdded: ActionCreator<typeof channelAdded>;
}

class CreateChannelModal extends React.Component<CreateChannelModalProps, CreateChannelModalState> {
    constructor(props: CreateChannelModalProps) {
        super(props);
        this.state = {
            users: [],
            selectedUser: null
        }
    }

    async componentDidMount() {
        const promise = await fetch(`/api/users/friends`, {
            headers: {
                "Authorization": localStorage.getItem("token") || "token"
            }
        });
        const jsonRes = await promise.json();
        if (jsonRes.success) {
            this.setState({users: jsonRes.data});
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
        this.setState({selectedUser: userId});
    }

    handleCreateDM = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.state.selectedUser === null) return;
        const promise = await fetch(`/api/users/@me/channels`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token") || "token",
            },
            body: JSON.stringify({
                recipientId: this.state.selectedUser
            })
        });
        const jsonRes = await promise.json();
        if (jsonRes.success) {
            this.props.channelAdded(jsonRes.data);
            this.props.onClose();
        }

    }

    renderUsers = () => {
        return this.state.users.map((user: User) => {
            return (
                <div key={Date.now() - Math.random()} className="user-select">
                    <div className="user-avatar">
                        <div className="helper"></div>
                        <img src={user.avatar} width="40" height="40" alt="avatar" />
                    </div>
                    <span className="username">{user.username}</span>
                    <input type="radio" name="user-select" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.handleChange(e, user.id);
                    }} />
                </div>

            )
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className={`modal ${this.props.open ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="user-list-card">
                            <div className="card-header">
                                <h4 className="header-title">SELECT FRIENDS</h4>
                                <div className="input-wrapper">
                                    <input type="text" className="input is-small" placeholder="Type the username of a friend" />
                                </div>
                            </div>
                            <div className="card-main">
                                {this.state.users.length > 0 ? this.renderUsers() : <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src={VoidImg} height="128" width="128" /></div>}
                            </div>
                            <div className="card-footer">
                                <button className="button is-fullwidth is-danger is-outline" onClick={this.handleCreateDM}>Create DM</button>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.props.onClose}></button>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        channelAdded: (...args: Parameters<typeof channelAdded>) => {dispatch(channelAdded(...args))}
    }
}

export default connect(null, mapDispatchToProps)(CreateChannelModal);
