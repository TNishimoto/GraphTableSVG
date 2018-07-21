namespace GraphTableSVG {
    export class PPTextBoxShapeBase {
        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        private _svgText: SVGTextElement;
        public get svgText(): SVGTextElement {
            return this._svgText;
        }

        public constructor(svgbox: HTMLElement, option: { className?: string, cx?: number, cy?: number, text? : string, isAutoSizeShapeToFitText? : boolean } = {}) {
            this._svgGroup = SVG.createGroup(svgbox);
            this._svgText = GraphTableSVG.SVG.createText();
            this.svgGroup.appendChild(this.svgText);
            if(option.text != undefined)this.svgText.setTextContent(option.text);
            if(option.isAutoSizeShapeToFitText != undefined) this.isAutoSizeShapeToFitText = option.isAutoSizeShapeToFitText;
        }

        /**
        このVertexのX座標を返します。
        */
        public get cx(): number {
            return this.svgGroup.getX();
        }
        public set cx(value: number) {
            if (this.svgGroup.getX() != value) {
                this.svgGroup.setX(value);
            }
        }
        /**
        このVertexのY座標を返します。
        */
        public get cy(): number {
            return this.svgGroup.getY();
        }
        public set cy(value: number) {
            if (this.svgGroup.getY() != value) {
                this.svgGroup.setY(value);
            }
        }

        /**
        頂点の幅を返します。
        */
        get width(): number {
            return this.svgGroup.getAttributeNumber("data-width", 0);
        }
        set width(value: number) {
            this.svgGroup.setAttribute("data-width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return this.svgGroup.getAttributeNumber("data-height", 0);
        }
        set height(value: number) {
            this.svgGroup.setAttribute("data-height", value.toString());
        }
        public get x(): number {
            return this.cx - (this.width / 2);
        }
        public get y(): number {
            return this.cy - (this.height / 2);
        }
        /**
         * このVertexがテキストに合わせてサイズを変える場合Trueを返します。
         */
        get isAutoSizeShapeToFitText(): boolean {
            return this.svgGroup.getPropertyStyleValueWithDefault(Vertex.autoSizeShapeToFitTextName, "false") == "true";
        }
        set isAutoSizeShapeToFitText(value: boolean) {
            this.svgGroup.setPropertyStyleValue(Vertex.autoSizeShapeToFitTextName, value ? "true" : "false");
        }
        protected update() {
            let vAnchor = this.svgGroup.getPropertyStyleValue(VerticalAnchorPropertyName);
            if (vAnchor == null) vAnchor = VerticalAnchor.Middle;
            let hAnchor = this.svgGroup.getPropertyStyleValue(HorizontalAnchorPropertyName);
            if (hAnchor == null) hAnchor = HorizontalAnchor.Center;
            if (this.isAutoSizeShapeToFitText) {
                const box = this.svgText.getBBox();
                this.width = box.width;
                this.height = box.height;
            }            
            Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
            //Graph.setXY(this.svgText, this.innerRectangle, vAnchor, hAnchor);
        }
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = 0;
            rect.height = 0;
            rect.x = 0;
            rect.y = 0;
            return rect;
        }
    }
    export class CallOut extends PPTextBoxShapeBase implements PPTextboxShape {
        private _svgPath: SVGPathElement;
        public get svgPath(): SVGPathElement {
            return this._svgPath;
        }


        public constructor(svgbox: HTMLElement, option: { className?: string, cx?: number, cy?: number, text? : string, isAutoSizeShapeToFitText? : boolean  } = {}) {
            super(svgbox, option);
            this._svgPath = GraphTableSVG.SVG.createPath(this.svgGroup, 0, 0, 0, 0);

            this.width = 100;
            this.height = 100;

            if (option.cx != undefined) this.cx = option.cx;
            if (option.cy != undefined) this.cy = option.cy;

            this.speakerX = this.cx;
            this.speakerY = this.cy;


            this.update();
        }
        protected update() {
            super.update();
            const x1 = - (this.width / 2);
            const y1 = - (this.height / 2);
            const x2 = (this.width / 2);
            const y2 = (this.height / 2);

            const speakerDiffX = this.speakerX - this.cx;
            const speakerDiffY = this.speakerY - this.cy;
            let px1=0, px2=0, py1=0, py2=0;
            let mes="";
            switch(this.SpeakerPosition){
                case "upleft":
                px1 = (x1 / 3) * 2;
                px2 = (x1 / 3) * 1;
                mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y1}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
                case "upright":
                px1 = (x2 / 3) * 1;
                px2 = (x2 / 3) * 2;
                mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y1}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} ${mes} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
                case "rightup":
                py1 = (y1 / 3) * 2;
                py2 = (y1 / 3) * 1;
                mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x2} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                break;
                case "rightdown":
                py1 = (y2 / 3) * 1;
                py2 = (y2 / 3) * 2;
                mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x2} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} ${mes} V ${y2} H ${x1} V ${y1} z`);
                break;
                case "leftup":
                py1 = (y1 / 3) * 1;
                py2 = (y1 / 3) * 2;
                mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x1} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                break;
                case "leftdown":
                py1 = (y2 / 3) * 2;
                py2 = (y2 / 3) * 1;
                mes = `V ${py1} L ${speakerDiffX} ${speakerDiffY} L ${x1} ${py2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} ${mes} V ${y1} z`);
                break;
                case "downleft":
                px1 = (x1 / 3) * 1;
                px2 = (x1 / 3) * 2;
                mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                break;
                case "downright":
                px1 = (x2 / 3) * 2;
                px2 = (x2 / 3) * 1;
                mes = `H ${px1} L ${speakerDiffX} ${speakerDiffY} L ${px2} ${y2}`;
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} ${mes} H ${x1} V ${y1} z`);
                break;
                default:
                this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x2} V ${y2} H ${x1} V ${y1} z`);
                break;
            }
            

            //this.svgPath.setAttribute("d", `M ${x1} ${y1} H ${x1 + this.width} V ${y1 + this.height} H ${x1} V ${y1} z`);
        }
        get innerRectangle(): Rectangle {
            const rect = new Rectangle();
            rect.width = this.width;
            rect.height = this.height;
            rect.x = -this.width / 2;
            rect.y = -this.height / 2;;
            return rect;
        }
        get speakerX(): number {
            return this.svgGroup.getAttributeNumber("data-speaker-x", 0);
        }
        set speakerX(value: number) {
            this.svgGroup.setAttribute("data-speaker-x", value.toString());
        }
        get speakerY(): number {
            return this.svgGroup.getAttributeNumber("data-speaker-y", 0);
        }
        set speakerY(value: number) {
            this.svgGroup.setAttribute("data-speaker-y", value.toString());
        }
        public get SpeakerPosition() : SpeakerPosition {
            const speakerDiffX = this.speakerX - this.cx;
            const speakerDiffY = this.speakerY - this.cy;

            const x1 = - (this.width / 2);
            const y1 = - (this.height / 2);
            const x2 = (this.width / 2);
            const y2 = (this.height / 2);
            if(x1 <= speakerDiffX && speakerDiffX <= x2 && y1 <= speakerDiffY && speakerDiffY <= y2){
                return "inner";
            }

            if(this.speakerX > this.cx){
                if(this.speakerY > this.cy){
                    const line = new VLine(0,0, this.height, this.width);
                    if(line.contains(speakerDiffX, speakerDiffY)){
                        return "rightdown";
                    }else{
                        return "downright";
                    }
                }else{
                    const line = new VLine(0,0, -this.height, this.width);
                    if(line.contains(speakerDiffX, speakerDiffY)){
                        return "upright"
                    }else{
                        return "rightup"
                    }
                }
            }else{
                if(this.speakerY > this.cy){
                    const line = new VLine(0,0, -this.height, this.width);
                    if(line.contains(speakerDiffX, speakerDiffY)){
                        return "leftdown";
                    }else{
                        return "downleft";
                    }

                }else{
                    const line = new VLine(0,0, this.height, this.width);
                    if(line.contains(speakerDiffX, speakerDiffY)){
                        return "upleft";
                    }else{
                        return "leftup";
                    }
                }
            }

        }

    }
}