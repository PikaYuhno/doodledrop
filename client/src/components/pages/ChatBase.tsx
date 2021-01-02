import React from 'react';
import Navbar from '../layouts/core/Navbar';
import Chat from '../layouts/core/chat/Chat';
import Sidebar from '../layouts/core/chat/Sidebar';
import '../../styles/core/chat.scss';
import {connect} from 'react-redux';
import {RootReducer} from '../../store/root-reducer';
import Empty from '../../assets/empty.png';
import {Channel} from '../../global';
import {connectSocket, disconnectSocket, messageAdded} from '../../store/chat/actions';

type ChatBaseProps = {
    currentChannel?: Channel | null,
    socket?: SocketIOClient.Socket | null
} & DispatchProps;

type DispatchProps = {
    connectSocket: () => void;
    disconnectSocket: (...args: Parameters<typeof disconnectSocket>) => void;
    messageAdded: (...args: Parameters<typeof messageAdded>) => void;
}
class ChatBase extends React.Component<ChatBaseProps> {
    constructor(props: ChatBaseProps) {
        super(props);
    }

    componentDidMount() {
        this.props.connectSocket();
        const {socket} = this.props;
        if (!socket) return;
        console.log("HERE");
        socket.on('connect', () => {
            console.log("CONNECT CALLBACK");
            socket.on("message", (m: any) => {
                console.log("Got data -", m);
                this.props.messageAdded(m);
            });
        })
    }

    componentWillUnmount() {
        console.log("ChatBase - WillUnmount");
        console.log(this.props.socket === undefined);
        if (this.props.socket)
            this.props.disconnectSocket(this.props.socket);
    }

    // TODO: Filter channel and get infos about recipient
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <div className="columns">
                        <Sidebar />
                        <div className="column chat">
                            {
                                this.props.currentChannel ? <Chat imgSrc={this.props.currentChannel.recipients[0].avatar} name={this.props.currentChannel.recipients[0].username} />
                                    : <div className="empty-image"><img src={Empty} width="512" height="512" alt="empty" /></div>
                            }
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        currentChannel: state.chat.currentChannel,
        socket: state.chat.socket,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        disconnectSocket: (...args: Parameters<typeof disconnectSocket>) => {dispatch(disconnectSocket(...args))},
        connectSocket: () => {dispatch(connectSocket())},
        messageAdded: (...args: Parameters<typeof messageAdded>) => {dispatch(messageAdded(...args))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatBase);
