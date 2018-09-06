namespace GraphTableSVG {

    export class GObject {
        private static objectDic: { [key: string]: GObject; } = {};
        public static getObjectFromObjectID(id: string | SVGElement): GObject | null {
            if(id instanceof SVGElement){
                if(id.hasAttribute(CustomAttributeNames.objectIDName)){
                    const _id = id.getAttribute(CustomAttributeNames.objectIDName)!;
                    return GObject.getObjectFromObjectID(_id);
                }else{
                    return null;
                }
            }else{
                if(id in this.objectDic){
                    return this.objectDic[id];
                }else{
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
        protected _surface : SVGElement | null = null;
        public _tag : any;
        public get tag(){
            return this._tag;
        }
        public set tag(v : any){
            this._tag = v;
        }

        private _svgGroup: SVGGElement;
        /**
        セルを表しているSVGGElementを返します。
        */
        public get svgGroup(): SVGGElement {
            return this._svgGroup;
        }
        get isLocated(): boolean {
            return GraphTableSVG.Common.IsDescendantOfBody(this.svgGroup);
        }
        public get surface(): SVGElement | null {
            return this._surface;
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
            return <number>this.svgGroup.gtGetAttributeNumber("data-width", 0);
        }
        set width(value: number) {            
            if (this.width != value && value != null) this.svgGroup.setAttribute("data-width", value.toString());

        }
        /**
        頂点の高さを返します。
        */
        get height(): number {
            return <number>this.svgGroup.gtGetAttributeNumber("data-height", 0);
        }
        set height(value: number) {
            if (this.height != value && value != null) this.svgGroup.setAttribute("data-height", value.toString());
        }
        public get x(): number {
            return this.cx - (this.width / 2);
        }
        public get y(): number {
            return this.cy - (this.height / 2);
        }
        public get type(): string {
            return "PPTextBoxShapeBase";
        }
        protected createSurface(svgbox: SVGElement, option: TextBoxShapeAttributes = {}): void {

        }
        protected setClassNameOfSVGGroup(){

        }
        public constructor(svgbox: SVGElement | string, option: PPObjectAttributes = {}) {
            let parentElement: SVGElement = svgbox instanceof SVGElement ? svgbox : <any>document.getElementById(svgbox);

            this._svgGroup = SVG.createGroup(parentElement, option.class == undefined ? null : option.class);
            this.setClassNameOfSVGGroup();

            //const objID = PPTextBoxShapeBase.objectIDCounter++;
            //this.svgGroup.setAttribute("objectID", objID.toString());
            GObject.setObjectFromObjectID(this);

            this.svgGroup.setAttribute("data-group-type", this.type);
            this.createSurface(parentElement, option);
            const _option = this.updateOptionByCSS(option);
            if (typeof option.id !== "undefined") this.svgGroup.id = option.id;
            this.width = _option.width!;
            this.height = _option.height!;
            this.cx = _option.cx!;
            this.cy = _option.cy!;

            this.dispatchObjectCreatedEvent();
        }
        updateOptionByCSS(option: PPObjectAttributes) : PPObjectAttributes {
            const _option = {...option};
            if(this.surface != null && this.surface.className != null){
                const width = this.surface.getPropertyStyleNumberValue(CustomAttributeNames.Style.defaultWidthName, null);
                const height = this.surface.getPropertyStyleNumberValue(CustomAttributeNames.Style.defaultHeightName, null);
                if(width != null) _option.width = width;
                if(height != null) _option.height = height;
            }
            if (typeof _option.width === "undefined") _option.width = 50;
            if (typeof _option.height === "undefined") _option.height = 50;
            if (typeof _option.cx === "undefined") _option.cx = 0;
            if (typeof _option.cy === "undefined") _option.cy = 0;
            return _option;
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
        public get VBAObjectNum() : number{
            return 1;
        }
        
        protected dispatchObjectCreatedEvent(): void {
            var event = document.createEvent("HTMLEvents");
            event.initEvent(CustomAttributeNames.objectCreatedEventName, true, true);
            this.svgGroup.dispatchEvent(event);

        }
    }
}