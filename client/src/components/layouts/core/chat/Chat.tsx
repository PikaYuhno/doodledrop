import React from 'react';
import Message from './Message';
import Pfp from '../../../../assets/pfp/pfp3.png';
import moment from 'moment';
import {connect} from 'react-redux';
import {channelDisconnected, recieveMessages, messageAdded} from '../../../../store/chat/actions';
import {RootReducer} from '../../../../store/root-reducer';
import {Channel, Message as Msg, JWTPayload as AuthUser} from '../../../../global';

type ChatState = {
    message: string;
}

type ChatProps = {
    imgSrc: string;
    name: string;
    socket: SocketIOClient.Socket | null;
    currentChannel: Channel | null;
    messages: Msg[];
    user: AuthUser | null;
} & DispatchProps;

type DispatchProps = {
    channelDisconnected: (...args: Parameters<typeof channelDisconnected>) => void;
    recieveMessages: (...args: Parameters<typeof recieveMessages>) => void;
    messageAdded: (...args: Parameters<typeof messageAdded>) => void;
}

class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
        this.state = {
            message: '',
        }
    }
    componentDidMount() {
        this.getMessages();
    }


    getMessages = () => {
        if (this.props.currentChannel)
            this.props.recieveMessages(this.props.currentChannel.id);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({message: e.target.value});
    }

    handleClose = (e: React.MouseEvent<any>) => {
        e.preventDefault()
        this.props.channelDisconnected();
        console.log("CLOSED");
    }

    onMessage = () => {
        const {socket} = this.props;
        if (!socket) return;
        console.log("I WAS HERE");

    }

    handleSend = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (!this.props.socket || !this.props.currentChannel || !this.props.user) return;
        const msg: Msg = {id: undefined, channel_id: this.props.currentChannel.id, user_id: this.props.user.id, body: this.state.message, created_at: new Date(), read: false, room_id: this.props.currentChannel.room_id};
        console.log("Sending data:", msg);
        this.props.socket.emit("message", {channelId: this.props.currentChannel.room_id, data: msg})
        this.props.messageAdded(msg);
        await this.postMessage();

    }

    postMessage = async () => {
        if (!this.props.currentChannel) return;
        //http://localhost:4000
        const promise = await fetch(`/api/channels/${this.props.currentChannel.id}/messages`, {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: this.state.message,
                room_id: this.props.currentChannel.room_id
            })
        });
        const resJson = await promise.json();
        console.log(resJson);
    }

    render() {
        return (
            <React.Fragment>
                <div className="title-container">
                    <div className="profile-pic">
                        <img src={this.props.imgSrc} width="48" height="48" alt="profile-pic" />
                    </div>
                    <div className="name">{this.props.name}</div>
                    <div className="close-button">
                        <i className="fa fa-times fa-lg" onClick={this.handleClose} id="close"></i>
                    </div>
                </div>
                <div className="message-container">
                    {
                        this.props.messages.filter(m => this.props.currentChannel && m.room_id === this.props.currentChannel.room_id).map(msg => {
                            return <Message key={msg.id} imgSrc={this.props.imgSrc} messageContent={msg.body} direction={this.props.user && msg.user_id !== this.props.user.id ? "left" : "right"} date={moment(msg.created_at).format('hh:mm a')} />
                        })
                    }
                </div>
                <div className="input-container">
                    <div className="field has-addons">
                        <div className="control">
                            <input className="input" type="text" placeholder="Type Something" onChange={this.handleChange} name="message" />
                        </div>
                        <div className="control">
                            <a className="button is-info" onClick={this.handleSend}></a>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        socket: state.chat.socket,
        currentChannel: state.chat.currentChannel,
        messages: state.chat.messages,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        channelDisconnected: (...args: Parameters<typeof channelDisconnected>) => {dispatch(channelDisconnected())},
        recieveMessages: (...args: Parameters<typeof recieveMessages>) => {dispatch(recieveMessages(...args))},
        messageAdded: (...args: Parameters<typeof messageAdded>) => {dispatch(messageAdded(...args))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
