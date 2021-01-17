import React, {CSSProperties} from 'react';
import P5 from 'p5';
import {connect} from 'react-redux';
import {RootReducer} from '../../../../store/root-reducer';
import {JWTPayload} from '../../../../global';

type Line = {
    x: number;
    y: number;
    pX: number;
    pY: number;
    strokeWeight: number;
    fill: string;
}

type CanvasState = {
    blocked: boolean;
}

type CanvasProps = {
    canvasHeight: number;
    canvasWidth: number;
    strokeWeight: number;
    fill: string;
    multiplayer: boolean;
    style?: CSSProperties;
} & OwnProps;

type OwnProps = {
    socket?: SocketIOClient.Socket | null;
    drawingRoom?: string | null;
    user?: JWTPayload | null;
}

type DrawingHistory = {
    undo: Line[];
    redo: Line[];
}

enum DrawingActions {
    CLEAR,
    REDO,
    UNDO,
}

class Canvas extends React.Component<CanvasProps, CanvasState> {
    canvasRef: React.RefObject<HTMLDivElement>;
    ownHistory: DrawingHistory;
    userHistory: DrawingHistory;
    canvas: any;
    canvasRendered: boolean;
    constructor(props: CanvasProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.userHistory = {
            redo: [],
            undo: []
        }
        this.ownHistory = {
            redo: [],
            undo: []
        }
        this.canvas = null;
        this.canvasRendered = false;
        this.state = {
            blocked: this.props.multiplayer ? true : false
        }
    }

    componentDidUpdate() {
        if (this.props.multiplayer)
            if (this.canvasRef.current && !this.state.blocked && !this.canvasRendered) {
                this.canvasRendered = true;
                new P5(this.sketch, this.canvasRef.current);
            }
    }

    componentDidMount() {
        console.log("Mounted");
        if (!this.props.multiplayer && this.canvasRef.current) {
            new P5(this.sketch, this.canvasRef.current);
        }
        if (this.props.socket && this.props.multiplayer) {
            this.props.socket.on('drawing-response', (data: any) => {
                console.log("Got back", data);
                if (data.users.length === 2) {
                    this.setState({blocked: false})
                } else {
                    this.setState({blocked: true});
                    this.canvasRendered = false;
                    this.resetHistory();

                }
            });
            console.log("Listeing on drawing");
            this.props.socket.on('drawing', (data: {line: Line, room_id: string}) => {
                this.userHistory.undo.push(data.line);
            });

            this.props.socket.on('drawing-action', (data: {action: DrawingActions, room_id: string}) => {
                console.log(data);
                switch (data.action) {
                    case DrawingActions.UNDO:
                        this.undoAction(this.userHistory);
                        break;
                    case DrawingActions.REDO:
                        this.redoAction(this.userHistory);
                        break;
                    case DrawingActions.CLEAR:
                        this.clearAction(this.userHistory);
                        break;
                }
            })
        }
    }

    resetHistory = () => {
        this.ownHistory = {
            undo: [],
            redo: [],
        }
        this.userHistory = {
            undo: [],
            redo: [],
        }
    }

    componentWillUnmount() {
        if (!this.props.socket) return;
        this.props.socket.removeListener("drawing-response");
        this.props.socket.removeListener("drawing-action");
        this.props.socket.removeListener("drawing");
    }

    redoAction = (historyObject = this.ownHistory) => {
        let last = historyObject.redo.pop();
        last && historyObject.undo.push(last);
    }
    undoAction = (historyObject = this.ownHistory) => {
        console.log(historyObject);
        let last = historyObject.undo.pop();
        last && historyObject.redo.push(last);
    }

    clearAction = (historyObject = this.ownHistory) => {
        historyObject.undo.splice(0, historyObject.undo.length);
        historyObject.redo.splice(0, historyObject.redo.length);
    }

    onUndo = () => {
        this.undoAction();
        if (!this.props.socket) return;
        if (this.props.multiplayer) {
            this.props.socket.emit("drawing-action", {action: DrawingActions.UNDO, room_id: this.props.drawingRoom});
        }

    }
    onRedo = () => {
        this.redoAction();
        if (!this.props.socket) return;
        if (this.props.multiplayer) {
            this.props.socket.emit("drawing-action", {action: DrawingActions.REDO, room_id: this.props.drawingRoom});
        }
    }
    onClear = () => {
        this.clearAction();
        if (!this.props.socket) return;
        if (this.props.multiplayer) {
            this.props.socket.emit("drawing-action", {action: DrawingActions.CLEAR, room_id: this.props.drawingRoom});
        }
    }

    getImage = () => {
        if (this.canvas) {
            return this.canvas.elt.toDataURL();
        }
    }

    leave = () => {
        if (!this.props.socket || !this.props.user) return;
        this.props.socket.emit("drawing-leave", {user_id: this.props.user.id, room_id: this.props.drawingRoom})
    }

    sketch = (p: any) => {
        console.log("rendered");
        //let height = this.canvasRef.current?.offsetHeight || this.props.canvasHeight;
        //let width = this.canvasRef.current?.offsetWidth || this.props.canvasWidth;
        let height = 600;
        let width = 800;
        p.setup = () => {
            const canvas = p.createCanvas(width, height);
            this.canvas = canvas;
        }

        p.draw = () => {
            p.background(255);
            if (p.mouseIsPressed) {
                if (p.mouseX <= width && p.mouseX >= 0 && p.mouseY <= height && p.mouseY >= 0) {
                    const line = {
                        x: p.mouseX,
                        y: p.mouseY,
                        pX: p.pmouseX,
                        pY: p.pmouseY,
                        strokeWeight: this.props.strokeWeight,
                        fill: this.props.fill
                    };
                    if (this.props.multiplayer && this.props.socket && this.props.drawingRoom) {
                        this.props.socket.emit("drawing", {line, room_id: this.props.drawingRoom})
                    }
                    this.ownHistory.undo.push(line);
                }

            }
            if (this.props.multiplayer) {
                for (let i = 0; i < this.userHistory.undo.length; i++) {
                    let item = this.userHistory.undo[i];
                    p.stroke(item.fill);
                    p.strokeWeight(item.strokeWeight);
                    p.line(item.x, item.y, item.pX, item.pY);
                }
            }
            for (let i = 0; i < this.ownHistory.undo.length; i++) {
                let item = this.ownHistory.undo[i];
                p.stroke(item.fill);
                p.strokeWeight(item.strokeWeight);
                p.line(item.x, item.y, item.pX, item.pY);
            }

        }


        p.keyPressed = () => {
            if (p.keyCode === p.UP_ARROW) {
                this.undoAction()
            } else if (p.keyCode === p.DOWN_ARROW) {
                this.redoAction();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.blocked ?
                    <div id="canvas-wrapper" onWheel={() => {}} ref={this.canvasRef} style={this.props.style}></div>
                    :
                    <h1 className="title" style={{textAlign: 'center'}}>Waiting...</h1>
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootReducer) => {
    return {
        socket: state.chat.socket,
        drawingRoom: state.chat.drawingRoom,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, null, null, {forwardRef: true})(Canvas);
