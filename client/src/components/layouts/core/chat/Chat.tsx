import React, {RefObject} from 'react';
import Message from './Message';
import moment from 'moment';
import {connect, ConnectedProps} from 'react-redux';
import {channelDisconnected, recieveMessages, messageAdded} from '../../../../store/chat/actions';
import {RootReducer} from '../../../../store/root-reducer';
import {Message as Msg} from '../../../../global';

type ChatState = {
    message: string;
}

type ChatProps = {
    imgSrc: string;
    name: string;
} & PropsFromStore;

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
        channelDisconnected: (...args: Parameters<typeof channelDisconnected>) => {dispatch(channelDisconnected(...args))},
        recieveMessages: (...args: Parameters<typeof recieveMessages>) => {dispatch(recieveMessages(...args))},
        messageAdded: (...args: Parameters<typeof messageAdded>) => {dispatch(messageAdded(...args))},
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromStore = ConnectedProps<typeof connector>;

class Chat extends React.Component<ChatProps, ChatState> {
    messageContainerRef: RefObject<HTMLDivElement>;
    constructor(props: ChatProps) {
        super(props);
        this.messageContainerRef = React.createRef<HTMLDivElement>();
        this.state = {
            message: '',
        }
    }

    scrollBottom = () => {
        if (this.messageContainerRef.current) {
            this.messageContainerRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    componentDidMount() {
        this.scrollBottom();
        this.getMessages();
    }


    getMessages = () => {
        if (this.props.currentChannel)
            this.props.recieveMessages(this.props.currentChannel.room_id);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({message: e.target.value});
    }

    handleClose = (e: React.MouseEvent<any>) => {
        e.preventDefault()
        this.props.channelDisconnected();
    }

    handleSend = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.props.socket || !this.props.currentChannel || !this.props.user) return;
        const msg: Msg = {id: undefined, user_id: this.props.user.id, body: this.state.message, created_at: new Date(), read: false, room_id: this.props.currentChannel.room_id, receiver_id: this.props.currentChannel.recipients[0].user_id};
        console.log("Sending data:", msg);
        this.props.socket.emit("message", msg);
        this.props.messageAdded(msg);
        await this.postMessage();
        this.setState({message: ''});
    }

    postMessage = async () => {
        if (!this.props.currentChannel) return;
        const promise = await fetch(`/api/channels/${this.props.currentChannel.room_id}/messages`, {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: this.state.message,
                receiver_id: this.props.currentChannel.recipients[0].user_id
            })
        });
        const resJson = await promise.json();
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
                <div className="message-container" >
                    {
                        this.props.messages.filter(m => this.props.currentChannel && m.room_id === this.props.currentChannel.room_id).map(msg => {
                            return <Message key={msg.id || Math.floor(Math.random() * 100) + 1} imgSrc={this.props.imgSrc} messageContent={msg.body} direction={this.props.user && msg.user_id !== this.props.user.id ? "left" : "right"} date={moment(msg.created_at).format('hh:mm a')} />
                        })
                    }
                    <div ref={this.messageContainerRef} />
                </div>
                <div className="input-container">
                    <div className="field has-addons" style={{width: '100%'}}>
                        <div className="control" id="message-input">
                            <input className="input" type="text" placeholder="Type Something" onChange={this.handleChange} name="message" value={this.state.message} />
                        </div>
                        <div className="control">
                            <form onSubmit={this.handleSend}>
                                <input className="button is-info" type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default connector(Chat);
