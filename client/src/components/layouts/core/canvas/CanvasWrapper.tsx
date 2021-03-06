import React, {CSSProperties} from 'react';
import Canvas from './Canvas';
import '../../../../styles/core/chat-canvas.scss'
import {CompactPicker, ColorResult} from 'react-color';
import CreateDoodleModal from './CreateDoodleModal';
import {leaveDrawing} from '../../../../store/chat/actions';
import {ChatActionTypes} from '../../../../store/chat/types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../../../global';
import {ThunkDispatch} from 'redux-thunk';
import {RootReducer} from '../../../../store/root-reducer';

export enum Tools {
    NONE,
    COLOR,
    STROKE,
    ERASER,
    PEN,
    REDO,
    UNDO,
    CLEAR,
    LEAVE,
    UPLOAD,
}

type ChatCanvasProps = DispatchProps & {multiplayer: boolean; styles?: CSSProperties};

type DispatchProps = {
    leaveDrawing: ActionCreator<typeof leaveDrawing>
}

type ChatCanvasState = {
    currentTool: Tools;
    strokeWeight: number;
    fill: string;
    openModal: boolean;
}

class ChatCanvas extends React.Component<ChatCanvasProps, ChatCanvasState> {
    canvasRef: React.RefObject<any>;
    constructor(props: ChatCanvasProps) {
        super(props);
        this.state = {
            currentTool: Tools.NONE,
            strokeWeight: 1,
            fill: "#000000",
            openModal: false,
        }
        this.canvasRef = React.createRef();
    }


    handleClick = (e: React.MouseEvent<HTMLDivElement>, tool: Tools) => {
        if (!this.canvasRef.current) return;
        switch (tool) {
            case Tools.REDO:
                this.canvasRef.current.triggerAction("REDO");
                break;
            case Tools.UNDO:
                this.canvasRef.current.triggerAction("UNDO");
                break;
            case Tools.CLEAR:
                this.canvasRef.current.triggerAction("CLEAR");
                break;
            case Tools.UPLOAD:
                this.setState({openModal: true});
                break;
            case Tools.LEAVE:
                this.canvasRef.current.leave();
                this.props.leaveDrawing();
                break;
        }
        this.setState({currentTool: tool});
    }

    handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({strokeWeight: parseInt(e.target.value)});
    }

    handleColorPickerChange = (color: ColorResult, e: React.ChangeEvent) => {
        this.setState({fill: color.hex});
    }

    renderToolOptions = () => {
        switch (this.state.currentTool) {
            case Tools.COLOR:
                return (<CompactPicker onChangeComplete={this.handleColorPickerChange} />)
            case Tools.STROKE:
                return (<input type="range" min="0" max="10" step="1" value={this.state.strokeWeight} onChange={this.handleSliderChange} />);
            default:
                return (null);
        }
    }

    render() {
        const {currentTool} = this.state;

        return (
            <React.Fragment>
                <CreateDoodleModal open={this.state.openModal} onClose={() => this.setState({openModal: false})} imgStr={this.canvasRef.current && this.canvasRef.current.getImage()} />
                <div className="cols" style={{height: '89%', ...this.props.styles}}>
                    <div className="col">
                        <Canvas canvasWidth={400} canvasHeight={400} fill={this.state.currentTool === Tools.ERASER ? '#ffffff' : this.state.fill} strokeWeight={this.state.currentTool === Tools.ERASER ? 20 : this.state.strokeWeight} ref={this.canvasRef} multiplayer={this.props.multiplayer} currentTool={this.state.currentTool} />
                    </div>
                    <div className="col">
                        <div className="tool-panel">
                            <div className={`tool-item ${currentTool === Tools.COLOR && "tool-is-active"}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.COLOR)}>
                                <i className={`fa fa-tint ${currentTool === Tools.COLOR && "icon-is-active"}`}></i>
                            </div>
                            <div className={`tool-item ${currentTool === Tools.STROKE && "tool-is-active"}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.STROKE)}>
                                <i className={`fa fa-sliders ${currentTool === Tools.STROKE && "icon-is-active"}`}></i>
                            </div>
                            <div className={`tool-item ${currentTool === Tools.PEN && "tool-is-active"}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.PEN)}>
                                <i className={`fa fa-pencil ${currentTool === Tools.PEN && "icon-is-active"}`}></i>
                            </div>
                            {!this.props.multiplayer &&
                                <div className={`tool-item ${currentTool === Tools.ERASER && "tool-is-active"}`} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.ERASER)}>
                                    <i className={`fa fa-eraser ${currentTool === Tools.ERASER && "icon-is-active"}`}></i>
                                </div>
                            }
                            <div className="tool-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.REDO)}>
                                <i className="fa fa-undo" style={{transform: 'scale(-1, 1)'}}></i>
                            </div>
                            <div className="tool-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.UNDO)}>
                                <i className="fa fa-undo"></i>
                            </div>
                            <div className="tool-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.CLEAR)}>
                                <i className="fa fa-trash"></i>
                            </div>
                            <div className="tool-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.UPLOAD)}>
                                <i className="fa fa-upload" style={{color: '#db2444'}}></i>
                            </div>
                            {this.props.multiplayer &&
                                <div className="tool-item" onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.LEAVE)}>
                                    <i className="fa fa-close" style={{color: '#db2444'}}></i>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="option-pane">
                    {this.renderToolOptions()}
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootReducer, unknown, ChatActionTypes>) => {
    return {
        leaveDrawing: () => dispatch(leaveDrawing())
    }
}

export default connect(null, mapDispatchToProps)(ChatCanvas);
