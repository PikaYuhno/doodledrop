import React from 'react';
import Navbar from '../layouts/core/Navbar';
import Chat from '../layouts/core/chat/Chat';
import Sidebar from '../layouts/core/chat/Sidebar';
import '../../styles/core/chat.scss';
import {connect, ConnectedProps} from 'react-redux';
import {RootReducer} from '../../store/root-reducer';
import Empty from '../../assets/empty.png';
import {Channel, Message} from '../../global';
import {addMessage, channelUpdated, updateChannelLatestMsg} from '../../store/chat/actions';
import ChatCanvas from './ChatCanvas';
import {ThunkDispatch} from 'redux-thunk';
import {ChatActionTypes} from '../../store/chat/types';

type ChatBaseProps = {
    channels: Channel[];
    drawingRoom?: string | null;
} & PropsFromStore;

const mapStateToProps = (state: RootReducer) => {
    return {
        currentChannel: state.chat.currentChannel,
        socket: state.chat.socket,
        channels: state.chat.channels,
        drawingRoom: state.chat.drawingRoom,
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootReducer, unknown, ChatActionTypes>) => {
    return {
        addMessage: (...args: Parameters<typeof addMessage>) => dispatch(addMessage(...args)),
        channelUpdated: (...args: Parameters<typeof channelUpdated>) => dispatch(channelUpdated(...args)),
        updateChannelLatestMsg: (...args: Parameters<typeof updateChannelLatestMsg>) => dispatch(updateChannelLatestMsg(...args))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromStore = ConnectedProps<typeof connector>;

class ChatBase extends React.Component<ChatBaseProps> {
    private listeningOnMessages: boolean;

    constructor(props: ChatBaseProps) {
        super(props);
        this.listeningOnMessages = false;
    }

    componentDidUpdate() {
        this.onMessage();
    }

    onMessage = () => {
        if (this.props.socket && !this.listeningOnMessages) {
            this.listeningOnMessages = true;
            this.props.socket.on("message", async (m: Message) => {
                this.props.addMessage(m);
                this.props.updateChannelLatestMsg(m, this.props.currentChannel);
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <div className="columns" id="chat-columns">
                        <Sidebar />
                        <div className="column chat">
                            {
                                this.props.currentChannel ? <Chat imgSrc={this.props.currentChannel.recipients[0].avatar} name={this.props.currentChannel.recipients[0].username} />
                                    : (this.props.drawingRoom === null ? <div className="empty-image"><img src={Empty} width="512" height="512" alt="empty" /></div> : <ChatCanvas multiplayer={true} />)
                            }
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default connector(ChatBase);
