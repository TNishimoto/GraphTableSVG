function sconv(value: string): string {
    const [v, unit] = GraphTableSVG.Common.parseUnit(value);
    return v.toString();
}
function tconv(value: string): string {
    return `${value}pt`;
}

function transformSconv(value: string, binder: SimpleTwowayBinding): string {
    const source = binder.source.element;
    if (source instanceof SVGGElement) {
        if (binder.target.element.getAttribute("name") == "x") {
            return source.getX().toString();
        } else {
            return source.getY().toString();
        }
    }
    console.log(source);
    throw Error("error");
}
function transformTconv(value: string, binder: SimpleTwowayBinding): string {
    const source = binder.source.element;
    if (source instanceof SVGGElement) {
        const a = source.transform.baseVal.getItem(0).matrix.a;
        const b = source.transform.baseVal.getItem(0).matrix.b;
        const c = source.transform.baseVal.getItem(0).matrix.c;
        const d = source.transform.baseVal.getItem(0).matrix.d;
        if (binder.target.element.getAttribute("name") == "x") {
            const e = value;
            const f = source.transform.baseVal.getItem(0).matrix.f;
            return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
        } else {
            const e = source.transform.baseVal.getItem(0).matrix.e;
            const f = value;
            return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
        }
    }
    console.log(source);
    throw Error("error");
}
function optionIf(source: HTMLElement, target: HTMLElement): boolean {
    const id = target.getAttribute("id");
    if (source instanceof SVGElement) {
        const e = GraphTableSVG.GObject.getObjectFromObjectID(source);

        if (e instanceof GraphTableSVG.GObject) {
            switch (id) {
                case "xy-field": return true;
                case "object-id-field" : return true;
            }
        }
        if (e instanceof GraphTableSVG.GVertex) {
            switch (id) {
                case "margin-field": return true;
                case "vertical-field": return true;
                case "horizontal-field": return true;
                case "text-field": return true;
                case "shrink-field": return true;
            }
        }
        if(e instanceof GraphTableSVG.GRect){
            switch (id) {
                case "rect-size-field": return true;
            }
        }
        if(e instanceof GraphTableSVG.GEllipse){
            switch (id) {
                case "ellipse-size-field": return true;
            }
        }
        if(e instanceof GraphTableSVG.GEdge){
            switch (id) {
                case "begin-connector-type-field": return true;
                case "end-connector-type-field": return true;
                case "begin-node-field": return true;
                case "end-node-field": return true;

            }

        }

        if (e instanceof GraphTableSVG.GCallout) {
            switch (id) {
                case "arrow-field": return false;
                case "callout-field": return true;
                case "callout-direction-field": return false;
                case "size-field": return true;
            }
        } else if (e instanceof GraphTableSVG.ShapeArrowCallout) {
            switch (id) {
                case "arrow-field": return true;
                case "callout-field": return false;
                case "callout-direction-field": return true;
                case "size-field": return true;
            }
        }
    }
    return false;
}