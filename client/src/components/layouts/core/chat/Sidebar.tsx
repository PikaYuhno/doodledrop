import React from 'react';
import DMChannel from './DMChannel';
import moment from 'moment';
import Pfp from '../../../../assets/pfp/pfp2.png';
import {connect} from 'react-redux';
import {RootReducer} from '../../../../store/root-reducer';
import {Channel} from '../../../../global';
import {loadChannels} from '../../../../store/chat/actions';

type SidebarProps = {
    channels: Channel[];
} & DispatchProps


type DispatchProps = {
    //loadChannels: (...args: Parameters<typeof loadChannels>) => Promise<void>;
    loadChannels: any;
}

class Sidebar extends React.Component<SidebarProps> {
    constructor(props: SidebarProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
        this.props.loadChannels();
    }

    renderChannels = () => {
        return this.props.channels.map((channel: Channel) => {
            let recipient = channel.recipients[0];
            return (<DMChannel key={channel.id} id={channel.id} imgSrc={recipient.avatar} date={moment().format('hh:mm a')} latestMessage={channel.last_message || "No message sent"} name={recipient.username} />);
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
        channels: state.chat.channels
    }
}

export default connect(mapStateToProps, {loadChannels})(Sidebar);
