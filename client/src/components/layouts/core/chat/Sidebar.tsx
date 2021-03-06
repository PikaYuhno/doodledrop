import React from 'react';
import DMChannel from './DMChannel';
import moment from 'moment';
import {connect, ConnectedProps} from 'react-redux';
import {RootReducer} from '../../../../store/root-reducer';
import {Channel, Message} from '../../../../global';
import {loadChannels, addMessage, channelUpdated} from '../../../../store/chat/actions';
import CreateChannelModal from './CreateChannelModal';

type SidebarState = {
    openModal: boolean;
}

type SidebarProps = PropsFromStore;

const mapStateToProps = (state: RootReducer) => {
    return {
        channels: state.chat.channels,
        socket: state.chat.socket,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadChannels: () => {dispatch(loadChannels())},
        addMessage: (...args: Parameters<typeof addMessage>) => {dispatch(addMessage(...args))},
        channelUpdated: (...args: Parameters<typeof channelUpdated>) => {dispatch(channelUpdated(...args))}
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromStore = ConnectedProps<typeof connector>;

class Sidebar extends React.Component<SidebarProps, SidebarState> {
    constructor(props: SidebarProps) {
        super(props);
        this.state = {
            openModal: false
        }
    }

    componentDidMount() {
        this.props.loadChannels();
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

    openModal = () => {
        this.setState({openModal: true});
    }

    renderChannels = () => {
        return this.props.channels && this.props.channels.map((channel: Channel) => {
            let recipient = channel.recipients[0];
            return (<DMChannel key={channel.id} notfi={channel.notfi} id={channel.id} imgSrc={recipient.avatar} date={moment().format('hh:mm a')} latestMessage={channel.last_message || "No message sent"} name={recipient.username} roomId={channel.room_id} />);
        });
    }

    render() {
        return (
            <React.Fragment>
                <CreateChannelModal open={this.state.openModal} onClose={() => this.setState({openModal: false})} />
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
                        <i className="fa fa-plus" onClick={this.openModal}></i>
                    </div>
                    {this.renderChannels()}
                    <div className="channels-footer">
                        <div className="user-select-self">
                            <div className="user-avatar-chat">
                                <div className="helper"></div>
                                <img src={this.props.user ? this.props.user.avatar : "default-1.png"} width="40" height="40" alt="avatar" />
                            </div>
                            <span className="username">{this.props.user && this.props.user.username}</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connector(Sidebar);
