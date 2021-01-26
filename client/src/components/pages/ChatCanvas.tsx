import React from 'react';
import CanvasWrapper from '../layouts/core/canvas/CanvasWrapper';

type ChatCanvasProps = {
    multiplayer: boolean;
}
class ChatCanvas extends React.Component<ChatCanvasProps> {
    render() {
        return (
            <React.Fragment>
                <main>
                    <CanvasWrapper multiplayer={this.props.multiplayer} />
                </main>
            </React.Fragment>
        );
    }
}

export default ChatCanvas;
