import React from 'react';
import Navbar from '../layouts/core/Navbar';
import Chat from '../layouts/core/chat/Chat';
import Sidebar from '../layouts/core/chat/Sidebar';
import '../../styles/core/chat.scss';
import {connect} from 'react-redux';
import {RootReducer} from '../../store/root-reducer';
import Empty from '../../assets/empty.png';
import {Channel} from '../../global';
import {connectSocket, disconnectSocket, messageAdded, channelUpdated} from '../../store/chat/actions';

type ChatBaseProps = {
    currentChannel?: Channel | null,
    socket?: SocketIOClient.Socket | null
} & DispatchProps;

type DispatchProps = {
    messageAdded: (...args: Parameters<typeof messageAdded>) => void;
    channelUpdated: (...args: Parameters<typeof channelUpdated>) => void;
}
class ChatBase extends React.Component<ChatBaseProps> {
    constructor(props: ChatBaseProps) {
        super(props);
    }

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
        messageAdded: (...args: Parameters<typeof messageAdded>) => {dispatch(messageAdded(...args))},
        channelUpdated: (...args: Parameters<typeof channelUpdated>) => {dispatch(channelUpdated(...args))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatBase);
