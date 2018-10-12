namespace GraphTableSVG {

    export class GObject {

        protected _svgSurface: SVGElement | null = null;
        protected _tag: any;
        private _svgGroup: SVGGElement;
        protected _observer: MutationObserver;
        protected _observerOption : MutationObserverInit;

        public constructor(svgbox: SVGElement | string, option: GObjectAttributes = {}) {

            let parentElement: SVGElement = svgbox instanceof SVGElement ? svgbox : <any>document.getElementById(svgbox);
            /*
            if(!HTMLFunctions.isShow(parentElement)){
                throw Error("The parent element of the instance must be displayed when the instance is created");
            }
            */


            this._svgGroup = SVG.createGroup(parentElement);
            if(option.groupClass !== undefined)this._svgGroup.setAttribute("class", option.groupClass);
            if(option.groupStyle !== undefined)this._svgGroup.setAttribute("style", option.groupStyle);
            
            this.setClassNameOfSVGGroup();

            GObject.setObjectFromObjectID(this);


            this.svgGroup.setAttribute(CustomAttributeNames.GroupAttribute, this.type);
            const _option = this.initializeOption(option);
            this.createSurface(parentElement, _option);
            if (typeof _option.id !== "undefined") this.svgGroup.id = _option.id;
            //if(_option.surfaceClass !== undefined && this.svgSurface !== null) this.svgSurface.setAttribute("class", _option.surfaceClass);

            this.width = _option.width!;
            this.height = _option.height!;
            this.cx = _option.cx!;
            this.cy = _option.cy!;
            if(_option.x !== undefined) this.fixedX = _option.x;
            if(_option.y !== undefined) this.fixedY = _option.y;
            
            this._observer = new MutationObserver(this.observerFunc);
            this._observerOption = { attributes: true, childList: true, subtree: true };
            this._observer.observe(this.svgGroup, this._observerOption);

            this.dispatchObjectCreatedEvent();
            this.addResizeEvent();
        }
        protected groupObserverOption : MutationObserverInit = { attributes: true, childList: true, subtree: true };

        private removeResizeEvent() {
            this.svgGroup.removeEventListener(CustomAttributeNames.resizeName, this.pUpdateFunc);
        }
        private addResizeEvent() {
            this.svgGroup.addEventListener(CustomAttributeNames.resizeName, this.pUpdateFunc);
        }        
        private pUpdateFunc = () => {
            this.resizeUpdate();
        }
        protected resizeUpdate(){
            this.update();
        }
        initializeOption(option: GObjectAttributes): GObjectAttributes {
            const _option = { ...option };
            if (this.svgSurface != null && this.svgSurface.className != null) {
                const width = this.svgSurface.getPropertyStyleNumberValue(CustomAttributeNames.Style.defaultWidth, null);
                const height = this.svgSurface.getPropertyStyleNumberValue(CustomAttributeNames.Style.defaultHeight, null);
                if (width != null) _option.width = width;
                if (height != null) _option.height = height;
            }
            if (_option.width === undefined) _option.width = 25;
            if (_option.height === undefined) _option.height = 25;
            if (_option.cx === undefined) _option.cx = 0;
            if (_option.cy === undefined) _option.cy = 0;
            if(_option.surfaceClass === undefined) _option.surfaceClass = this.svgGroup.gtGetAttributeStringWithUndefined(CustomAttributeNames.Style.defaulSurfaceClass)
            return _option;
        }
        static constructAttributes(e: Element,
            removeAttributes: boolean = false, output: GObjectAttributes = {}): GObjectAttributes {
            output.groupClass = e.gtGetAttributeStringWithUndefined("class");
            if(output.groupClass === undefined) e.gtGetAttributeStringWithUndefined("group:class");
            output.surfaceClass = e.gtGetAttributeStringWithUndefined("surface:class");
            output.groupStyle = e.gtGetAttributeStringWithUndefined("group:style");
            if(e.hasAttribute("style")) output.groupStyle = e.gtGetAttributeStringWithUndefined("style");
            output.surfaceStyle = e.gtGetAttributeStringWithUndefined("surface:style");

            output.cx = e.gtGetAttributeNumberWithUndefined("cx");
            output.cy = e.gtGetAttributeNumberWithUndefined("cy");
            output.width = e.gtGetAttributeNumberWithUndefined("width");
            output.height = e.gtGetAttributeNumberWithUndefined("height");
            output.x = e.gtGetAttributeNumberWithUndefined("x");
            output.y = e.gtGetAttributeNumberWithUndefined("y");


            if (removeAttributes) {
                e.removeAttribute("cx");
                e.removeAttribute("cy");
                e.removeAttribute("x");
                e.removeAttribute("y");
                e.removeAttribute("class");
                e.removeAttribute("surface:class");
                e.removeAttribute("group:class");
                e.removeAttribute("surface:style");
                e.removeAttribute("group:style");
                e.removeAttribute("style");

                e.removeAttribute("width");
                e.removeAttribute("height");
            }
            return output;
        }
        public get tag() {
            return this._tag;
        }
        public set tag(v: any) {
            this._tag = v;
        }
        public get isShow(){
            return HTMLFunctions.isShow(this.svgGroup);
        }

        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }



        get isLocated(): boolean {
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
        }
        public get svgSurface(): SVGElement | null {
            return this._svgSurface;
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
            if(this.hasSize){
                return <number>this.svgGroup.gtGetAttributeNumber("data-width", 0);
            }else{
                return 0;
            }
        }
        set width(value: number) {
            if(this.hasSize){
                if (this.width != value && value != null) this.svgGroup.setAttribute("data-width", value.toString());
            }
        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            if(this.hasSize){
                return <number>this.svgGroup.gtGetAttributeNumber("data-height", 0);
            }else{
                return 0;
            }
        }
        set height(value: number) {
            if(this.hasSize){
                if (this.height != value && value != null) this.svgGroup.setAttribute("data-height", value.toString());
            }
        }
        public get fixedX() : number | null {
            return this.svgGroup.gtGetAttributeNumber("data-fixedX", null);
        }
        public set fixedX(v : number | null)  {
            if(v == null){
                this.svgGroup.removeAttribute("data-fixedX");
            }else{
                this.svgGroup.setAttribute("data-fixedX", v.toString());
            }
        }
        public get fixedY() : number | null {
            return this.svgGroup.gtGetAttributeNumber("data-fixedY", null);
        }
        public set fixedY(v : number | null)  {
            if(v == null){
                this.svgGroup.removeAttribute("data-fixedY");
            }else{
                this.svgGroup.setAttribute("data-fixedY", v.toString());
            }
        }
        
        public get x(): number {
            return this.cx - (this.width / 2);
        }
        public get y(): number {
            return this.cy - (this.height / 2);
        }
        public set x(v : number){
            this.cx = v + (this.width/2);
        }
        public set y(v : number){
            this.cy = v + (this.height/2);
        }

        public get type(): ShapeObjectType {
            return ShapeObjectType.Object;
        }
        protected createSurface(svgbox: SVGElement, option: GObjectAttributes = {}): void {

        }

        protected setClassNameOfSVGGroup() {

        }
        private observerFunc: MutationCallback = (x: MutationRecord[]) => {
            this.observerFunction(x);
        };

        protected observerFunction(x: MutationRecord[]) 
        {
            //throw Error("error1");
            
            let b = false;
            if (!this.isLocated) return;

            for (let i = 0; i < x.length; i++) {
                const p = x[i];
                if (this.updateAttributes.some((v) => v == p.attributeName)) {
                    b = true;
                }

                if (p.attributeName == "transform") {
                    this.dispatchConnectPositionChangedEvent();
                }
            }

            if (b) this.update();
            
        }
        

        /**
         * この頂点を廃棄します。廃棄された頂点はグラフから取り除かれます。
         */
        public dispose() {
        }
        /**
        この頂点が廃棄されていたらTrueを返します。
        */
        get isDisposed(): boolean {
            return false;
            //return this.graph == null;
        }
        /**
        このVertexのObjectIDを返します。
        */
        public get objectID(): string {
            const r = this.svgGroup.getAttribute(CustomAttributeNames.objectIDName);
            if (r == null) {
                throw new Error();
            } else {
                return r;
            }
        }

        public createVBACode(id: number): string[] {
            const lines: string[] = [];
            lines.push(`Sub create${id}(createdSlide As slide)`);
            lines.push(`End Sub`);
            return lines;
        }
        public get VBAObjectNum(): number {
            return 1;
        }

        protected dispatchObjectCreatedEvent(): void {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(CustomAttributeNames.objectCreatedEventName, true, true);
            this.svgGroup.dispatchEvent(event);

        }
        protected _isUpdating: boolean = false;
        protected update() {
            this._isUpdating = true;
            this._isUpdating = false;
        }
        protected updateAttributes = ["style", "transform", "data-speaker-x", "data-speaker-y",
            "data-width", "data-height", "data-arrow-neck-width", "data-arrow-neck-height",
            "data-arrow-head-width", "data-arrow-head-height"]
        protected dispatchConnectPositionChangedEvent(): void {
            if (this.svgSurface != null) {
                var event = document.createEvent("HTMLEvents");
                event.initEvent(CustomAttributeNames.connectPositionChangedEventName, true, true)
                this.svgSurface.dispatchEvent(event);
            }
        }
        public get hasSize() : boolean{
            return false;
        }

        private static objectDic: { [key: string]: GObject; } = {};
        public static getObjectFromObjectID(id: string | SVGElement): GObject | null {
            if (id instanceof SVGElement) {
                if (id.hasAttribute(CustomAttributeNames.objectIDName)) {
                    const _id = id.getAttribute(CustomAttributeNames.objectIDName)!;
                    return GObject.getObjectFromObjectID(_id);
                } else {
                    return null;
                }
            } else {
                if (id in this.objectDic) {
                    return this.objectDic[id];
                } else {
                    return null;
                }
            }
        }
        public static setObjectFromObjectID(obj: GObject) {
            const id = obj.objectID;
            this.objectDic[id] = obj;
        }
        public static getObjectFromID(id: string): GObject | null {
            for (let key in this.objectDic) {
                if (this.objectDic[key].svgGroup.id == id) {
                    return this.objectDic[key];
                }
            }
            return null;
        }
        /**
         * グラフの領域を表すRectangleを返します。位置の基準はグラフが追加されているNodeです。
         */
        public getRegion(): Rectangle {
            let rect = new Rectangle();
            rect.x = this.x;
            rect.y = this.y;
            rect.width = this.width;
            rect.height = this.height;
            return rect;
        }

    }
}