import React from 'react';
import P5 from 'p5';

type Line = {
    x: number;
    y: number;
    pX: number;
    pY: number;
    strokeWeight: number;
    fill: RGB | number;
}

type RGB = {red: number, green: number, blue: number};


class Canvas extends React.Component {
    canvasRef: React.RefObject<HTMLDivElement>;
    constructor(props: {}) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount() {
        if (this.canvasRef.current)
            new P5(this.sketch, this.canvasRef.current);
    }

    sketch = (p: any) => {
        let undo: Line[] = [];
        let redo: Line[] = [];

        p.setup = () => {
            let height = this.canvasRef.current?.offsetHeight || 400
            let width = this.canvasRef.current?.offsetWidth || 400
            p.createCanvas(width, height);
        }

        p.draw = () => {
            p.background(255);
            if (p.mouseIsPressed) {
                undo.push({
                    x: p.mouseX,
                    y: p.mouseY,
                    pX: p.pmouseX,
                    pY: p.pmouseY,
                    strokeWeight: 42,
                    fill: 5
                });
            }

            for (let i = 0; i < undo.length; i++) {
                let item = undo[i];
                p.stroke(255, 204, 0);
                p.strokeWeight(item.strokeWeight);
                p.line(item.x, item.y, item.pX, item.pY);
            }

        }

        p.keyPressed = () => {
            // undo
            if (p.keyCode === p.UP_ARROW) {
                let last = undo.pop();
                last && redo.push(last);
                //redo
            } else if (p.keyCode === p.DOWN_ARROW) {
                let last = redo.pop();
                last && undo.push(last);
                //clear
            } else if (p.keyCode === p.RIGHT_ARROW) {
                undo.splice(0, undo.length);
                redo.splice(0, redo.length);
            }
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column">
                        <div ref={this.canvasRef} style={{height: '100%', border: '1px solid black', borderRadius: '5px', padding: '5px', overflow: 'hidden'}}></div>
                    </div>
                    <div className="column is-1">
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;
