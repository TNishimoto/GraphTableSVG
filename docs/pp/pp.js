var SimpleAttributeObserver = /** @class */ (function () {
    function SimpleAttributeObserver(obj) {
        var _this = this;
        this.observerFunc = function (x) {
            var b = false;
            for (var i = 0; i < x.length; i++) {
                var p = x[i];
                if (p.attributeName == _this.watchedAttributeName) {
                    b = true;
                }
            }
            if (b && _this.onChanged != null) {
                _this.onChanged(_this);
            }
        };
        this.targetChangeFunc = function () {
            if (_this.element instanceof HTMLInputElement) {
                if (_this.element.type == "checkbox") {
                    var t = _this.element;
                    var value = t.value;
                    _this.watchedAttributeValue = _this.element.checked.toString();
                }
                else {
                    var t = _this.element;
                    var value = t.value;
                    _this.watchedAttributeValue = value;
                }
            }
        };
        this.onChanged = null;
        this.element = obj.element;
        this.watchedAttributeName = obj.watchedAttribute;
        this.watchedStyleName = obj.watchedStyleName;
        this.element.oninput = this.targetChangeFunc;
        this._observer = new MutationObserver(this.observerFunc);
        var option1 = { attributes: true };
        this._observer.observe(this.element, option1);
    }
    Object.defineProperty(SimpleAttributeObserver.prototype, "watchedAttributeValue", {
        get: function () {
            if (this.watchedAttributeName == "style" && this.watchedStyleName != undefined) {
                return this.element.style.getPropertyValue(this.watchedStyleName);
            }
            else if (this.watchedAttributeName == "@textContent") {
                return this.element.textContent;
            }
            else {
                return this.element.getAttribute(this.watchedAttributeName);
            }
        },
        set: function (value) {
            if (this.watchedAttributeValue != value) {
                if (this.watchedAttributeName == "style" && this.watchedStyleName != undefined) {
                    this.element.style.setProperty(this.watchedStyleName, value);
                }
                else if (this.watchedAttributeName == "@textContent") {
                    if (value == null) {
                        this.element.textContent = "";
                    }
                    else {
                        this.element.textContent = value;
                    }
                }
                else {
                    if (value == null) {
                        this.element.removeAttribute(this.watchedAttributeName);
                    }
                    else {
                        this.element.setAttribute(this.watchedAttributeName, value);
                    }
                }
            }
            if (this.element instanceof HTMLInputElement) {
                if (this.watchedAttributeName == "value") {
                    this.element.value = value;
                }
                if (this.element.type == "radio" && value != null) {
                    this.element.setAttribute(this.watchedAttributeName, value);
                }
                if (this.element.type == "checkbox") {
                    var b = value == "true" ? true : false;
                    this.element.setAttribute(this.watchedAttributeName, b.toString());
                    if (this.element.checked != b)
                        this.element.checked = b;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    SimpleAttributeObserver.prototype.dispose = function () {
        this._observer.disconnect();
    };
    return SimpleAttributeObserver;
}());
/*
namespace HTMLFunctions{
    export function getAncestorAttribute(e : HTMLElement, attr : string) : string | null{
        if(e.hasAttribute(attr)){
            return e.getAttribute(attr);
        }else{
            if(e.parentElement == null){
                return null;
            }else{
                return getAncestorAttribute(e.parentElement, attr);
            }
        }
    }

    export function getDescendants(e : HTMLElement) : HTMLElement[]{
        const r : HTMLElement[] = [];
        r.push(e);
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof HTMLElement){
            getDescendants(p).forEach((v)=>r.push(v));
            }
        }
        return r;
    }
    export function getChildren(e : HTMLElement) : HTMLElement[]{
        const r : HTMLElement[] = [];
        for(let i=0;i<e.children.length;i++){
            const p = e.children.item(i);
            if(p instanceof HTMLElement){
                r.push(p);
            }
        }
        return r;
    }
}
*/ 
var AttributeFunctions;
(function (AttributeFunctions) {
    AttributeFunctions.bindingIf = "n-if";
    function checkIfFunction(e) {
        if (e.hasAttribute(AttributeFunctions.bindingIf)) {
            var value = e.getAttribute(AttributeFunctions.bindingIf);
            var p = Function("v", "return " + value + "(v)");
            var f = Function("source", "target", "return " + value + "(source, target)");
            var source = getSourceElement(e);
            if (source == null)
                return true;
            return f(source, e);
        }
        else {
            return true;
        }
    }
    AttributeFunctions.checkIfFunction = checkIfFunction;
    function getSourceElement(e) {
        var id = HTMLFunctions.getAncestorAttribute(e, SimpleTwowayBinding.bindSourceID);
        if (id != null) {
            return document.getElementById(id);
        }
        else {
            return null;
        }
    }
    AttributeFunctions.getSourceElement = getSourceElement;
    function isBinderElement(e) {
        return e.hasAttribute(SimpleTwowayBinding.bindSourceAttributeName) || e.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName);
    }
    AttributeFunctions.isBinderElement = isBinderElement;
})(AttributeFunctions || (AttributeFunctions = {}));
var SimpleTwowayBinding = /** @class */ (function () {
    function SimpleTwowayBinding(obj) {
        var _this = this;
        //private sourceChangedFunc
        this.sourceChangedFunc = function () {
            if (_this.sourceToTarget) {
                if (_this.sourceValueConverter != null) {
                    _this.target.watchedAttributeValue = _this.sourceValueConverter(_this.source.watchedAttributeValue, _this);
                }
                else {
                    if (_this.target.element instanceof HTMLInputElement && _this.target.element.type == "radio") {
                        _this.target.element.checked = _this.source.watchedAttributeValue == _this.target.element.value;
                    }
                    else {
                        _this.target.watchedAttributeValue = _this.source.watchedAttributeValue;
                    }
                }
            }
        };
        this.targetChangedFunc = function () {
            if (_this.targetToSource) {
                if (_this.targetValueConverter != null) {
                    _this.source.watchedAttributeValue = _this.targetValueConverter(_this.target.watchedAttributeValue, _this);
                }
                else {
                    if (_this.target.element instanceof HTMLInputElement && _this.target.element.type == "radio") {
                        if (_this.target.element.checked) {
                            _this.source.watchedAttributeValue = _this.target.element.value;
                        }
                    }
                    else {
                        _this.source.watchedAttributeValue = _this.target.watchedAttributeValue;
                    }
                }
            }
        };
        this.sourceValueConverter = null;
        this.targetValueConverter = null;
        if (obj.watchedSourceAttribute != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceAttributeName, obj.watchedSourceAttribute);
        }
        if (obj.watchedTargetAttribute != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindTargetAttributeName, obj.watchedTargetAttribute);
        }
        if (obj.sourceElement != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.targetElement.getAttribute("id"));
        }
        if (!obj.targetElement.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName)) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindTargetAttributeName, "value");
        }
        obj.watchedTargetAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindTargetAttributeName);
        obj.watchedSourceAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceAttributeName);
        if (obj.targetElement.hasAttribute(SimpleTwowayBinding.bindSourceStyleName)) {
            obj.watchedSourceStyle = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceStyleName);
        }
        if (obj.watchedTargetAttribute == null) {
            throw Error("No " + SimpleTwowayBinding.bindTargetAttributeName);
        }
        if (obj.watchedSourceAttribute == null) {
            throw Error("No " + SimpleTwowayBinding.bindSourceAttributeName);
        }
        /*
        const id = HTMLFunctions.getAncestorAttribute(obj.targetElement,SimpleTwowayBinding.bindSourceID);
        if(id == null){
            throw Error("No ID!");
        }
        obj.sourceElement = document.getElementById(id)!;
        */
        var sourceElement = SimpleTwowayBinding.getSourceElement(obj.targetElement);
        if (sourceElement == null) {
            console.log(obj.targetElement);
            throw Error("No Source Element!");
        }
        this.target = new SimpleAttributeObserver({ element: obj.targetElement, watchedAttribute: obj.watchedTargetAttribute });
        this.source = new SimpleAttributeObserver({ element: sourceElement, watchedAttribute: obj.watchedSourceAttribute, watchedStyleName: obj.watchedSourceStyle });
        if (!obj.targetElement.hasAttribute(SimpleTwowayBinding.sourceToTargetName)) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.sourceToTargetName, "true");
        }
        if (!obj.targetElement.hasAttribute(SimpleTwowayBinding.targetToSourceName)) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.targetToSourceName, "true");
        }
        if (obj.targetToSource != undefined)
            this.targetToSource = obj.targetToSource;
        if (obj.sourceToTarget != undefined)
            this.sourceToTarget = obj.sourceToTarget;
        this.source.onChanged = this.sourceChangedFunc;
        this.target.onChanged = this.targetChangedFunc;
        if (this.target.element.hasAttribute(SimpleTwowayBinding.bindTargetConverterName)) {
            var value = this.target.element.getAttribute(SimpleTwowayBinding.bindTargetConverterName);
            var p = Function("v", "return " + value + "(v)");
            this.targetValueConverter = Function("v", "a", "b", "return " + value + "(v, a, b)");
        }
        if (this.target.element.hasAttribute(SimpleTwowayBinding.bindSourceConverterName)) {
            var value = this.target.element.getAttribute(SimpleTwowayBinding.bindSourceConverterName);
            //this.sourceValueConverter = value;
            this.sourceValueConverter = Function("v", "a", "b", "return " + value + "(v, a, b)");
        }
        this.sourceChangedFunc();
    }
    Object.defineProperty(SimpleTwowayBinding.prototype, "sourceToTarget", {
        get: function () {
            return this.target.element.getAttribute(SimpleTwowayBinding.sourceToTargetName) == "true";
        },
        set: function (value) {
            this.target.element.setAttribute(SimpleTwowayBinding.sourceToTargetName, value ? "true" : "false");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SimpleTwowayBinding.prototype, "targetToSource", {
        get: function () {
            return this.target.element.getAttribute(SimpleTwowayBinding.targetToSourceName) == "true";
        },
        set: function (value) {
            this.target.element.setAttribute(SimpleTwowayBinding.targetToSourceName, value ? "true" : "false");
        },
        enumerable: true,
        configurable: true
    });
    SimpleTwowayBinding.prototype.dispose = function () {
        this.source.dispose();
        this.target.dispose();
    };
    SimpleTwowayBinding.autoBind = function (obj) {
        var _this = this;
        var r = [];
        if (obj.bindID != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.bindID);
        }
        if (AttributeFunctions.checkIfFunction(obj.targetElement)) {
            obj.targetElement.style.removeProperty("display");
            //obj.targetElement.style.display = "inline";
            if (AttributeFunctions.isBinderElement(obj.targetElement)) {
                var item = new SimpleTwowayBinding({ targetElement: obj.targetElement });
                r.push(item);
            }
            else {
            }
            HTMLFunctions.getChildren(obj.targetElement).forEach(function (v) {
                if (v instanceof HTMLElement) {
                    _this.autoBind({ targetElement: v }).forEach(function (w) { return r.push(w); });
                }
            });
        }
        else {
            obj.targetElement.style.display = "none";
        }
        return r;
    };
    SimpleTwowayBinding.getSourceElement = function (target) {
        var id = HTMLFunctions.getAncestorAttribute(target, SimpleTwowayBinding.bindSourceID);
        var xpath = HTMLFunctions.getAncestorAttribute(target, SimpleTwowayBinding.bindSourceXPath);
        var idElement = id == null ? null : document.getElementById(id);
        var root = idElement == null ? document.body : idElement;
        if (xpath != null) {
            var result = document.evaluate(xpath, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return result.singleNodeValue;
            /*
            if(result.singleNodeValue instanceof HTMLElement){
                return result.singleNodeValue;
            }else{
                return null;
            }
            */
        }
        else {
            return root;
        }
    };
    SimpleTwowayBinding.bindTargetAttributeName = "n-bind:t-attr";
    SimpleTwowayBinding.bindSourceAttributeName = "n-bind:s-attr";
    SimpleTwowayBinding.bindSourceStyleName = "n-bind:s-style";
    SimpleTwowayBinding.bindSourceConverterName = "n-bind:s-converter";
    SimpleTwowayBinding.bindTargetConverterName = "n-bind:t-converter";
    SimpleTwowayBinding.bindTargetConverterValueName = "n-bind:t-value";
    SimpleTwowayBinding.bindSourceID = "n-bind:s-id";
    SimpleTwowayBinding.bindSourceXPath = "n-bind:s-xpath";
    SimpleTwowayBinding.sourceToTargetName = "n-source-to-target";
    SimpleTwowayBinding.targetToSourceName = "n-target-to-source";
    return SimpleTwowayBinding;
}());
var FooterButton = /** @class */ (function () {
    function FooterButton(button, content) {
        this.button_ = button;
        this.content_ = content;
        if (!this.button_.hasAttribute("data-active")) {
            this.button_.setAttribute("data-active", "false");
        }
    }
    Object.defineProperty(FooterButton.prototype, "isActive", {
        get: function () {
            var b = this.button_.getAttribute("data-active");
            if (b == "true") {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            if (value) {
                this.content_.style.display = "block";
                this.button_.style.backgroundColor = FooterButton.activeColor;
                this.content_.style.backgroundColor = FooterButton.activeColor;
            }
            else {
                this.content_.style.display = "none";
                this.button_.style.backgroundColor = FooterButton.nonActiveColor;
                this.content_.style.backgroundColor = FooterButton.nonActiveColor;
            }
            this.button_.setAttribute("data-active", value ? "true" : "false");
        },
        enumerable: true,
        configurable: true
    });
    FooterButton.getFooterButton = function (name, id) {
        var r = document.getElementsByName(name);
        for (var i = 0; i < r.length; i++) {
            var e = r.item(i);
            if (e.getAttribute("data-type") == "footer-button" && e.getAttribute("data-id") == id.toString()) {
                return e;
            }
        }
        return null;
    };
    FooterButton.getFooterContent = function (name, id) {
        var r = document.getElementsByName(name);
        for (var i = 0; i < r.length; i++) {
            var e = r.item(i);
            if (e.getAttribute("data-type") == "footer-content" && e.getAttribute("data-id") == id.toString()) {
                return e;
            }
        }
        return null;
    };
    /*
    public static clickButton(buttonName : string, id : number) : void {
        const button = FooterButton.getFooterButton(buttonName, id);
        const content = FooterButton.getFooterContent(buttonName, id);
        const p = new FooterButton(button!, content!);
    }
    */
    FooterButton.create = function (buttonName, id) {
        var button = FooterButton.getFooterButton(buttonName, id);
        var content = FooterButton.getFooterContent(buttonName, id);
        if (button == null || content == null) {
            return null;
        }
        else {
            var p = new FooterButton(button, content);
            return p;
        }
    };
    FooterButton.call = function (name, num) {
        var pushedItem = FooterButton.create(name, num);
        if (pushedItem == null) {
            return;
        }
        else {
            if (pushedItem.isActive) {
                pushedItem.isActive = false;
            }
            else {
                var i = 0;
                while (true) {
                    var item = FooterButton.create(name, i);
                    if (item != null) {
                        item.isActive = false;
                    }
                    else {
                        break;
                    }
                    i++;
                }
                pushedItem.isActive = true;
            }
        }
    };
    FooterButton.activeColor = "#31c8aa";
    FooterButton.nonActiveColor = "#524b4b";
    return FooterButton;
}());
var items = [];
window.onload = function () {
    var box = document.getElementById('svgbox');
    if (box instanceof SVGSVGElement) {
        var p = GraphTableSVG.openSVG(box);
        p.forEach(function (v) {
            if (v instanceof GraphTableSVG.PPTextBoxShapeBase) {
                v.svgGroup.onclick = onObjectClick;
                items.push(v);
            }
        });
    }
    /*
    positionFieldSet = <HTMLElement>document.getElementById('position-field');
    xyFieldSet = <HTMLElement>document.getElementById('xy-field');
    calloutFieldSet = <HTMLElement>document.getElementById('callout-field');
    arrowFieldSet = <HTMLElement>document.getElementById('arrow-field');
    */
    FooterButton.call('footer-button', 0);
};
function sconv(value) {
    var _a = GraphTableSVG.Common.parseUnit(value), v = _a[0], unit = _a[1];
    return v.toString();
}
function tconv(value) {
    return value + "pt";
}
function transformSconv(value, binder) {
    var source = binder.source.element;
    if (source instanceof SVGGElement) {
        if (binder.target.element.getAttribute("name") == "x") {
            return source.getX().toString();
        }
        else {
            return source.getY().toString();
        }
    }
    console.log(source);
    throw Error("error");
}
function transformTconv(value, binder) {
    var source = binder.source.element;
    if (source instanceof SVGGElement) {
        var a = source.transform.baseVal.getItem(0).matrix.a;
        var b = source.transform.baseVal.getItem(0).matrix.b;
        var c = source.transform.baseVal.getItem(0).matrix.c;
        var d = source.transform.baseVal.getItem(0).matrix.d;
        if (binder.target.element.getAttribute("name") == "x") {
            var e = value;
            var f = source.transform.baseVal.getItem(0).matrix.f;
            return "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")";
        }
        else {
            var e = source.transform.baseVal.getItem(0).matrix.e;
            var f = value;
            return "matrix(" + a + " " + b + " " + c + " " + d + " " + e + " " + f + ")";
        }
    }
    console.log(source);
    throw Error("error");
}
function getObject(svg) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item instanceof GraphTableSVG.PPTextBoxShapeBase) {
            if (item.hasDescendant(svg)) {
                return item;
            }
        }
    }
    return null;
}
var mouseMoveItem = null;
/*
let positionFieldSet : HTMLElement;
let xyFieldSet : HTMLElement;
let calloutFieldSet : HTMLElement;
let arrowFieldSet : HTMLElement;
*/
var binderObjects = [];
function setOption(e) {
    binderObjects.forEach(function (v) { return v.dispose(); });
    binderObjects = [];
    var optionFieldSet = document.getElementById('option-field');
    if (e instanceof GraphTableSVG.Callout) {
        var id = e.svgGroup.getAttribute("id");
        if (id == null)
            throw Error("No ID");
        SimpleTwowayBinding.autoBind({ targetElement: optionFieldSet, bindID: id }).forEach(function (v) { return binderObjects.push(v); });
    }
    else if (e instanceof GraphTableSVG.ShapeArrowCallout) {
        var id = e.svgGroup.getAttribute("id");
        if (id == null)
            throw Error("error");
        SimpleTwowayBinding.autoBind({ targetElement: optionFieldSet, bindID: id }).forEach(function (v) { return binderObjects.push(v); });
    }
}
function onObjectClick(e) {
    var p = getObject(this);
    mouseMoveItem = p;
    if (mouseMoveItem != null) {
        setOption(mouseMoveItem);
    }
}
function mouseMoveEvent(e) {
    if (e.buttons == 1 && mouseMoveItem != null) {
        if (mouseMoveItem instanceof GraphTableSVG.PPTextBoxShapeBase) {
            mouseMoveItem.cx = e.x;
            mouseMoveItem.cy = e.y;
        }
    }
}
function plus() {
    var circle = document.getElementById('circle');
    circle.style.strokeWidth = "8pt";
}
function optionIf(source, target) {
    var id = target.getAttribute("id");
    if (source instanceof SVGElement) {
        var e = getObject(source);
        if (e instanceof GraphTableSVG.Callout) {
            switch (id) {
                case "position-field": return false;
                case "xy-field": return true;
                case "arrow-field": return false;
                case "callout-field": return true;
                case "callout-direction-field": return false;
                case "shrink-field": return true;
                case "size-field": return true;
                case "margin-field": return true;
                case "vertical-field": return true;
                case "horizontal-field": return true;
                case "text-field": return true;
            }
            return false;
        }
        else if (e instanceof GraphTableSVG.ShapeArrowCallout) {
            switch (id) {
                case "position-field": return false;
                case "xy-field": return true;
                case "arrow-field": return true;
                case "callout-field": return false;
                case "callout-direction-field": return true;
                case "shrink-field": return true;
                case "size-field": return true;
                case "margin-field": return true;
                case "vertical-field": return true;
                case "horizontal-field": return true;
                case "text-field": return true;
            }
            return false;
        }
    }
    return false;
}
//# sourceMappingURL=pp.js.map