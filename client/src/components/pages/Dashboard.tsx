import React from 'react';
import Navbar from '../layouts/core/Navbar';

class Dashboard extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <h1>Dashbaord</h1>
                </main>
            </React.Fragment>
        );
    }
}

export default Dashboard;
