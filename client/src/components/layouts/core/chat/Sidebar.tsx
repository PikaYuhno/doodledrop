import React from 'react';
import DMChannel from './DMChannel';
import moment from 'moment';
import {connect} from 'react-redux';
import {RootReducer} from '../../../../store/root-reducer';
import {Channel, Message} from '../../../../global';
import {loadChannels, connectSocket, messageAdded, channelUpdated} from '../../../../store/chat/actions';

type SidebarProps = {
    channels: Channel[];
    socket: SocketIOClient.Socket | null;
} & DispatchProps


type DispatchProps = {
    loadChannels: any;
    messageAdded: (...args: Parameters<typeof messageAdded>) => void;
    channelUpdated: (...args: Parameters<typeof channelUpdated>) => void;
}

class Sidebar extends React.Component<SidebarProps> {
    roomJoined: boolean;
    listeningOnMessages: boolean;
    constructor(props: SidebarProps) {
        super(props);
        this.roomJoined = false;
        this.listeningOnMessages = false;
    }

    componentDidUpdate(prevProps: SidebarProps, prevState: any) {
        console.log("Room joined?", this.roomJoined);
        if (this.roomJoined) return;
        this.joinRooms();
    }

    componentDidMount() {
        this.props.loadChannels();
        const {socket} = this.props;
        console.log(socket ? true : false);
        if (!socket) return;
        console.log("HERE");
    }

    joinRooms = () => {
        console.log("Socket?", this.props.socket ? true : false);
        this.props.channels.forEach((channel: Channel) => {
            if (this.props.socket) {
                this.props.socket.emit("channel-join", {channelId: channel.room_id});
                console.log("Joining - ", channel.room_id);
                this.roomJoined = true;
            }
        });
        if (this.props.socket && !this.listeningOnMessages) {
            this.listeningOnMessages = true;
            this.props.socket.on("message", async (m: Message) => {
                console.log("Got data -", m);
                this.props.messageAdded(m);
                this.props.channelUpdated(m);
                await this.updateChannel(m);
            });
        }
    }

    updateChannel = async (message: Message) => {
        await fetch(`/api/channels/${message.room_id}/latestMessage`, {
            method: 'PATCH',
            headers: {
                "Authorization": localStorage.getItem("token") || "token",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                latest_message: message.body
            })
        });
    }

    renderChannels = () => {
        return this.props.channels && this.props.channels.map((channel: Channel) => {
            let recipient = channel.recipients[0];
            return (<DMChannel key={channel.id} notfi={channel.notfi} id={channel.id} imgSrc={recipient.avatar} date={moment().format('hh:mm a')} latestMessage={channel.last_message || "No message sent"} name={recipient.username} />);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="column is-one-quarter">
                    <div className="field">
                        <p className="control has-icons-left">
                            <input className="input" type="text" placeholder="Search" />
                            <span className="icon is-small is-left">
                                <i className="fa fa-search"></i>
                            </span>
                        </p>
                    </div>
                    <div className="channels-header">
                        <span className="header-text">DIRECT MESSAGES</span>
                        <i className="fa fa-plus"></i>
                    </div>
                    {this.renderChannels()}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        channels: state.chat.channels,
        socket: state.chat.socket,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadChannels: () => {dispatch(loadChannels())},
        messageAdded: (...args: Parameters<typeof messageAdded>) => {dispatch(messageAdded(...args))},
        channelUpdated: (...args: Parameters<typeof channelUpdated>) => {dispatch(channelUpdated(...args))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
