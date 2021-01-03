import React from 'react';
import {connect} from 'react-redux';
import {Channel} from '../../../../global';
import {channelConnected, channelUpdatedNotfi} from '../../../../store/chat/actions';
import {RootReducer} from '../../../../store/root-reducer';


type DMChannelProps = {
    id: number;
    imgSrc: string;
    name: string;
    date: string;
    latestMessage: string;
    notfi: boolean;
    channels: Channel[];
    socket: SocketIOClient.Socket | null;
    currentChannel: Channel | null;
} & DispatchProps;


type DispatchProps = {
    channelConnected: (...args: Parameters<typeof channelConnected>) => void;
    channelUpdatedNotfi: (...args: Parameters<typeof channelUpdatedNotfi>) => void;
}

class DMChannel extends React.Component<DMChannelProps> {
    constructor(props: DMChannelProps) {
        super(props);
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        let channel = this.props.channels.find(channel => channel.id === this.props.id);
        if (!channel) return;
        this.props.channelConnected(channel);
        this.props.channelUpdatedNotfi(channel.room_id);
    }


    render() {
        return (
            <React.Fragment>
                <div className="dm-channel" onClick={this.handleClick} id={this.props.id.toString()}>
                    <div className="profile-pic">
                        <img src={this.props.imgSrc} width="48" height="48" alt="profile-pic" />
                    </div>
                    <div className="info">
                        <div className="name-date">
                            <span className="name">{this.props.name}</span>
                            <span className="date">{this.props.date}</span>
                        </div>
                        <span className="latest-message">{this.props.latestMessage}</span>
                        <div className="icons">
                            <i className="fa fa-tv"></i>
                            {this.props.notfi && <div className="notfi">
                                !
                            </div>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        currentChannel: state.chat.currentChannel,
        channels: state.chat.channels,
        socket: state.chat.socket,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        channelConnected: (id: Channel) => {dispatch(channelConnected(id))},
        channelUpdatedNotfi: (...args: Parameters<typeof channelUpdatedNotfi>) => {dispatch(channelUpdatedNotfi(...args))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DMChannel);
