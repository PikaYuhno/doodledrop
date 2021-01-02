import React from 'react';
import {connect} from 'react-redux';
import {AlertState} from '../../../store/alert/types';
import {RootReducer} from '../../../store/root-reducer';
import '../../../styles/alert/alert.scss';

type AlertProps = {
    alerts: AlertState[];
}

class Alert extends React.Component<AlertProps> {
    constructor(props: AlertProps) {
        super(props);
    }
    render() {
        console.log("New Props", this.props.alerts);
        let alerts = this.props.alerts;
        return (
            <React.Fragment>
                <div className="alerts">
                    {alerts.length !== 0 && alerts.map(el => {
                        return (
                            <div key={el.id} id={el.id} className={`notification is-${el.alertType} is-light`}>
                                {el.msg}
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alert);
