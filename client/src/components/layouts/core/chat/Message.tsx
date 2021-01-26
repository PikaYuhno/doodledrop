import React from 'react';

type MessageProps = {
    imgSrc: string;
    messageContent: string;
    date: string;
    direction: string;
}

class Message extends React.Component<MessageProps> {
    render() {
        return (
            <React.Fragment>
                <div className={`msg ${this.props.direction}`}>
                    <div className="profile-pic">
                        <img src={this.props.imgSrc} width="48" height="48" alt="profile-pic" />
                    </div>
                    <div className="message-box">
                        <div className="message-content">
                            {this.props.messageContent}
                        </div>
                        <span className="date">{this.props.date}</span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Message;
