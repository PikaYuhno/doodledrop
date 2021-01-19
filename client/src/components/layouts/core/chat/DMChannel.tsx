import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Channel} from '../../../../global';
import {channelConnected, updateChannelNotfi, channelDisconnected, enterDrawing} from '../../../../store/chat/actions';
import {alert} from '../../../../store/alert/actions';
import {RootReducer} from '../../../../store/root-reducer';
import {AlertType} from '../../../../store/alert/types';

type DMChannelProps = {
    id: number;
    imgSrc: string;
    name: string;
    date: string;
    latestMessage: string;
    roomId: string;
    notfi: boolean;
} & PropsFromStore;

const mapStateToProps = (state: RootReducer) => {
    return {
        currentChannel: state.chat.currentChannel,
        channels: state.chat.channels,
        socket: state.chat.socket,
        user: state.auth.user,
        drawingRoom: state.chat.drawingRoom
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        channelConnected: (id: Channel) => {dispatch(channelConnected(id))},
        channelDisconnected: () => {dispatch(channelDisconnected())},
        updateChannelNotfi: (...args: Parameters<typeof updateChannelNotfi>) => {dispatch(updateChannelNotfi(...args))},
        enterDrawing: (...args: Parameters<typeof enterDrawing>) => {dispatch(enterDrawing(...args))},
        alert: (...args: Parameters<typeof alert>) => {dispatch(alert(...args))}
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromStore = ConnectedProps<typeof connector>;

class DMChannel extends React.Component<DMChannelProps> {
    constructor(props: DMChannelProps) {
        super(props);
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (this.props.drawingRoom !== null) {
            this.props.alert("Please leave the drawing first!", AlertType.FAIL, 3);
            return;
        }
        let channel = this.props.channels.find(channel => channel.id === this.props.id);
        if (!channel) return;
        this.props.channelConnected(channel);
        this.props.updateChannelNotfi(channel.room_id);
    }


    enterDrawing = (e: React.MouseEvent<HTMLElement>, roomId: string) => {
        if (!this.props.socket || !this.props.user) return;
        e.stopPropagation();
        // disconnect from channel if connected
        if (this.props.currentChannel !== null) {
            this.props.channelDisconnected();
        }
        if (this.props.drawingRoom !== null) return;
        // dispatch ENTER_DRAWING
        this.props.enterDrawing(roomId);

        // emit join event
        this.props.socket.emit("drawing-join", {user_id: this.props.user.id, room_id: this.props.roomId});
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
                            <i className="fa fa-tv" onClick={(e: React.MouseEvent<HTMLElement>) => this.enterDrawing(e, this.props.roomId)}></i>
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


export default connector(DMChannel);
