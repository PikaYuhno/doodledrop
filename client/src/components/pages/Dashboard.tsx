import React from 'react';
import Navbar from '../layouts/core/Navbar';

class Dashboard extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <h1>Dashbaord</h1>
            </React.Fragment>
        );
    }
}

export default Dashboard;
