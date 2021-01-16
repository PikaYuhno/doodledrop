import React from 'react';
import ChatCanvas from './ChatCanvas';
import Navbar from '../layouts/core/Navbar';

class MainCanvas extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <ChatCanvas multiplayer={false} styles={{padding: '0rem 10rem'}} />
                </main>
            </React.Fragment>
        );
    }
}

export default MainCanvas;
