import React, {CSSProperties} from 'react';
import Canvas from '../layouts/core/canvas/Canvas';
import '../../styles/core/chat-canvas.scss'
import {CompactPicker, ColorResult} from 'react-color';
import CreateDoodleModal from '../layouts/core/canvas/CreateDoodleModal';
import {leaveDrawing} from '../../store/chat/actions';
import {connect} from 'react-redux';
import {ActionCreator} from '../../global';

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
    toolStyles: CSSProperties;
    iconStyles: CSSProperties;
    constructor(props: ChatCanvasProps) {
        super(props);
        this.state = {
            currentTool: Tools.NONE,
            strokeWeight: 1,
            fill: "#000000",
            openModal: false,
        }
        this.canvasRef = React.createRef();
        this.toolStyles = {
            backgroundColor: 'rgb(181 177 177)',
            borderRadius: '50%'
        }
        this.iconStyles = {
            color: 'white'
        }
    }


    handleClick = (e: React.MouseEvent<HTMLDivElement>, tool: Tools) => {
        if (!this.canvasRef.current) return;
        switch (tool) {
            case Tools.REDO:
                this.canvasRef.current.onRedo();
                break;
            case Tools.UNDO:
                this.canvasRef.current.onUndo();
                break;
            case Tools.CLEAR:
                this.canvasRef.current.onClear();
                break;
            case Tools.UPLOAD:
                this.setState({openModal: true});
                break;
            case Tools.LEAVE:
                this.canvasRef.current.leave();
                this.props.leaveDrawing();
                break;
            /*case Tools.PEN:
                this.setState({currentTool: tool, fill: '#000000'});
                break;
            case Tools.ERASER:
                this.setState({currentTool: tool, fill: '#ffffff'});
                break;
            case Tools.COLOR:
                this.setState({currentTool: tool});
                break;
            case Tools.STROKE:
                this.setState({currentTool: tool});
                break;*/
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
        return (
            <React.Fragment>
                <CreateDoodleModal open={this.state.openModal} onClose={() => this.setState({openModal: false})} imgStr={this.canvasRef.current && this.canvasRef.current.getImage()} />
                <div className="cols" style={{height: '89%', ...this.props.styles}}>
                    <div className="col">
                        <Canvas canvasWidth={400} canvasHeight={400} fill={this.state.currentTool === Tools.ERASER ? '#ffffff' : this.state.fill} strokeWeight={this.state.currentTool === Tools.ERASER ? 20 : this.state.strokeWeight} ref={this.canvasRef} multiplayer={this.props.multiplayer} currentTool={this.state.currentTool} />
                    </div>
                    <div className="col">
                        <div className="tool-panel">
                            <div className="tool-item" style={this.state.currentTool === Tools.COLOR ? this.toolStyles : undefined} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.COLOR)}>
                                <i className="fa fa-tint" style={this.state.currentTool === Tools.COLOR ? this.toolStyles : undefined}></i>
                            </div>
                            <div className="tool-item" style={this.state.currentTool === Tools.STROKE ? this.toolStyles : undefined} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.STROKE)}>
                                <i className="fa fa-sliders" style={this.state.currentTool === Tools.STROKE ? this.toolStyles : undefined}></i>
                            </div>
                            <div className="tool-item" style={this.state.currentTool === Tools.PEN ? this.toolStyles : undefined} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.PEN)}>
                                <i className="fa fa-pencil" style={this.state.currentTool === Tools.PEN ? this.toolStyles : undefined}></i>
                            </div>
                            {!this.props.multiplayer &&
                                <div className="tool-item" style={this.state.currentTool === Tools.ERASER ? this.toolStyles : undefined} onClick={(e: React.MouseEvent<HTMLDivElement>) => this.handleClick(e, Tools.ERASER)}>
                                    <i className="fa fa-eraser" style={this.state.currentTool === Tools.ERASER ? this.toolStyles : undefined}></i>
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        leaveDrawing: () => {dispatch(leaveDrawing())}
    }
}

export default connect(null, mapDispatchToProps)(ChatCanvas);
