import React from 'react';
import Pfp from '../../../../assets/pfp/pfp1.png';

type CreateChannelModalProps = {
    open: boolean;
    onClose: () => void;
}

class CreateChannelModal extends React.Component<CreateChannelModalProps> {
    constructor(props: CreateChannelModalProps) {
        super(props);
    }

    async componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <div className={`modal ${this.props.open ? "is-active" : ""}`}>
                    <div className="modal-background"></div>
                    <div className="modal-content">
                        <div className="user-list-card">
                            <div className="card-header">
                                <h4 className="header-title">SELECT FRIENDS</h4>
                                <div className="input-wrapper">
                                    <input type="text" className="input is-small" placeholder="Type the username of a friend" />
                                </div>
                            </div>
                            <div className="card-main">
                                <div className="user-select">
                                    <div className="user-avatar">
                                        <div className="helper"></div>
                                        <img src={Pfp} width="40" height="40" alt="avatar" />
                                    </div>
                                    <span className="username">Max Mustermann</span>
                                    <input type="radio" name="user-select" />
                                </div>

                                <div className="user-select">
                                    <div className="user-avatar">
                                        <div className="helper"></div>
                                        <img src={Pfp} width="40" height="40" alt="avatar" />
                                    </div>
                                    <span className="username">Max Mustermann</span>
                                    <input type="radio" name="user-select" />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="button is-fullwidth is-danger is-outline">Create DM</button>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={this.props.onClose}></button>
                </div>
            </React.Fragment>
        )
    }
}

export default CreateChannelModal;
