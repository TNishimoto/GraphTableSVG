var SimpleAttributeObserver = /** @class */ (function () {
    function SimpleAttributeObserver(obj) {
        var _this = this;
        this.sourceObserverFunc = function (x) {
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
            if (_this.element.nodeName == "INPUT") {
                var t = _this.element;
                var value = t.value;
                _this.watchedAttribute = value;
            }
        };
        this.onChanged = null;
        this.element = obj.element;
        this.watchedAttributeName = obj.watchedAttribute;
        this.element.oninput = this.targetChangeFunc;
        this._sourceObserver = new MutationObserver(this.sourceObserverFunc);
        var option1 = { attributes: true };
        this._sourceObserver.observe(this.element, option1);
    }
    Object.defineProperty(SimpleAttributeObserver.prototype, "watchedAttribute", {
        get: function () {
            return this.element.getAttribute(this.watchedAttributeName);
        },
        set: function (value) {
            if (this.watchedAttribute != value) {
                if (value == null) {
                    this.element.removeAttribute(this.watchedAttributeName);
                }
                else {
                    this.element.setAttribute(this.watchedAttributeName, value);
                }
            }
            if (this.element.nodeName == "INPUT" && this.watchedAttributeName == "value") {
                this.element.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SimpleAttributeObserver;
}());
var HTMLFunctions;
(function (HTMLFunctions) {
    function getAncestorAttribute(e, attr) {
        if (e.hasAttribute(attr)) {
            return e.getAttribute(attr);
        }
        else {
            if (e.parentElement == null) {
                return null;
            }
            else {
                return getAncestorAttribute(e.parentElement, attr);
            }
        }
    }
    HTMLFunctions.getAncestorAttribute = getAncestorAttribute;
    function getDescendants(e) {
        var r = [];
        r.push(e);
        for (var i = 0; i < e.children.length; i++) {
            var p = e.children.item(i);
            if (p instanceof HTMLElement) {
                getDescendants(p).forEach(function (v) { return r.push(v); });
            }
        }
        return r;
    }
    HTMLFunctions.getDescendants = getDescendants;
})(HTMLFunctions || (HTMLFunctions = {}));
var SimpleTwowayBinding = /** @class */ (function () {
    function SimpleTwowayBinding(obj) {
        var _this = this;
        this.sourceChangedFunc = function () {
            if (_this.sourceToTarget) {
                _this.target.watchedAttribute = _this.source.watchedAttribute;
            }
        };
        this.targetChangedFunc = function () {
            if (_this.targetToSource) {
                _this.source.watchedAttribute = _this.target.watchedAttribute;
            }
        };
        if (obj.watchedSourceAttribute != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceAttributeName, obj.watchedSourceAttribute);
        }
        if (obj.watchedTargetAttribute != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindTargetAttributeName, obj.watchedTargetAttribute);
        }
        if (obj.sourceElement != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.targetElement.getAttribute("id"));
        }
        obj.watchedTargetAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindTargetAttributeName);
        obj.watchedSourceAttribute = obj.targetElement.getAttribute(SimpleTwowayBinding.bindSourceAttributeName);
        if (obj.watchedTargetAttribute == null) {
            throw Error("No " + SimpleTwowayBinding.bindTargetAttributeName);
        }
        if (obj.watchedSourceAttribute == null) {
            throw Error("No " + SimpleTwowayBinding.bindSourceAttributeName);
        }
        var id = HTMLFunctions.getAncestorAttribute(obj.targetElement, SimpleTwowayBinding.bindSourceID);
        if (id == null) {
            throw Error("No ID!");
        }
        obj.sourceElement = document.getElementById(id);
        this.target = new SimpleAttributeObserver({ element: obj.targetElement, watchedAttribute: obj.watchedTargetAttribute });
        this.source = new SimpleAttributeObserver({ element: obj.sourceElement, watchedAttribute: obj.watchedSourceAttribute });
        this.sourceToTarget = true;
        this.targetToSource = true;
        if (obj.targetToSource != undefined)
            this.targetToSource = obj.targetToSource;
        if (obj.sourceToTarget != undefined)
            this.sourceToTarget = obj.sourceToTarget;
        this.source.onChanged = this.sourceChangedFunc;
        this.target.onChanged = this.targetChangedFunc;
        this.sourceChangedFunc();
    }
    SimpleTwowayBinding.prototype.dispose = function () {
    };
    SimpleTwowayBinding.isBinderElement = function (e) {
        return e.hasAttribute(SimpleTwowayBinding.bindSourceAttributeName) || e.hasAttribute(SimpleTwowayBinding.bindTargetAttributeName);
    };
    SimpleTwowayBinding.autoBind = function (obj) {
        if (obj.bindID != undefined) {
            obj.targetElement.setAttribute(SimpleTwowayBinding.bindSourceID, obj.bindID);
        }
        return HTMLFunctions.getDescendants(obj.targetElement).filter(function (v) { return SimpleTwowayBinding.isBinderElement(v); }).map(function (v) { return new SimpleTwowayBinding({ targetElement: v }); });
    };
    SimpleTwowayBinding.bindTargetAttributeName = "g-bind:t-attr";
    SimpleTwowayBinding.bindSourceAttributeName = "g-bind:s-attr";
    SimpleTwowayBinding.bindSourceID = "g-bind:s-id";
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
/*
interface Window {
    Vue?: any;
}
declare var window: Window
const Vue = window.Vue
*/
window.onload = function () {
    var inputBox = document.getElementById('inputOB');
    var circle = document.getElementById('circle');
    //const tw = new SimpleTwowayBinding({sourceElement: circle, targetElement: inputBox, watchedTargetAttribute: "value", watchedSourceAttribute: "cx"} )
    //const tw = new SimpleTwowayBinding({targetElement: inputBox} )
    var positionFieldSet = document.getElementById('position-field');
    var pg = SimpleTwowayBinding.autoBind({ targetElement: positionFieldSet, bindID: "circle" });
    //inputBox.setAttribute("value", "hogehgoe");
    inputBox.value = "hgohgoe";
    console.log(circle);
    console.log(inputBox);
    var box = document.getElementById('svgbox');
    box.onclick = function (e) {
        circle.setAttribute("cx", e.x.toString());
        circle.setAttribute("cy", e.y.toString());
    };
    var item1 = new GraphTableSVG.CallOut(box, { cx: 200, cy: 200, text: "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText: false, className: "callout" });
    item1.width = 200;
    item1.height = 100;
    item1.svgGroup.onclick = onObjectClick;
    items.push(item1);
    var arrow = new GraphTableSVG.ShapeArrow(box, { cx: 100, cy: 100, text: "hoghogeaaaaaaaaaaaaaa", isAutoSizeShapeToFitText: true, className: "callout" });
    arrow.svgGroup.onclick = onObjectClick;
    items.push(arrow);
    //box.onmousemove = mouseMoveEvent
};
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
function onObjectClick(e) {
    var p = getObject(this);
    mouseMoveItem = p;
}
function mouseMoveEvent(e) {
    if (e.buttons == 1 && mouseMoveItem != null) {
        if (mouseMoveItem instanceof GraphTableSVG.PPTextBoxShapeBase) {
            mouseMoveItem.cx = e.x;
            mouseMoveItem.cy = e.y;
        }
    }
}
