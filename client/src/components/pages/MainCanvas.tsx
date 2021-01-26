import React from 'react';
import CanvasWrapper from '../layouts/core/canvas/CanvasWrapper';
import Navbar from '../layouts/core/Navbar';

class MainCanvas extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <main>
                    <CanvasWrapper multiplayer={false} styles={{padding: '0rem 10rem'}} />
                </main>
            </React.Fragment>
        );
    }
}

export default MainCanvas;
