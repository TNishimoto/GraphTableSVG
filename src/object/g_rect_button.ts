namespace GraphTableSVG {
    export class GRectButton extends GRect {
        public constructor(svgbox: SVGElement | string, option: GTextBoxAttributes = {}) {
            super(svgbox, option);


            this.update();
        }
        initializeOption(option: GObjectAttributes): GObjectAttributes {
            let b = false;
            if (option.width !== undefined || option.height !== undefined) {
                b = true;
            }
            if(option.surfaceClass === undefined){
                option.surfaceClass = GraphTableSVG.CustomAttributeNames.StyleValue.defaultRectButtonSurfaceClass;
            }

            const _option = <GTextBoxAttributes>super.initializeOption(option);
            

            return _option;
        }
    }
}