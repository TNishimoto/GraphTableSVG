class FooterButton {

    static activeColor: string = "#31c8aa";
    static nonActiveColor: string = "#524b4b";

    get isActive(): boolean {
        const b = this.button_.getAttribute("data-active");
        if(b == "true"){
            return true;
        }else{
            return false;
        }
    }
    set isActive(value: boolean) {
        if (value) {
            this.content_.style.display = "block";
            this.button_.style.backgroundColor = FooterButton.activeColor;
            this.content_.style.backgroundColor = FooterButton.activeColor;
        } else {

            this.content_.style.display = "none";
            this.button_.style.backgroundColor = FooterButton.nonActiveColor;
            this.content_.style.backgroundColor = FooterButton.nonActiveColor;
        }
        this.button_.setAttribute("data-active", value ? "true" : "false");

    }
    private button_: HTMLElement;
    private content_: HTMLElement;

    public static getFooterButton(name : string, id : number) : HTMLElement | null {
        const r = document.getElementsByName(name);
        for(let i=0;i<r.length;i++){
            const e = r.item(i);
            if(e.getAttribute("data-type") == "footer-button" && e.getAttribute("data-id") == id.toString() ){
                return e;
            }
        }
        return null;
    }
    public static getFooterContent(name : string, id : number) : HTMLElement | null {
        const r = document.getElementsByName(name);
        for(let i=0;i<r.length;i++){
            const e = r.item(i);
            if(e.getAttribute("data-type") == "footer-content" && e.getAttribute("data-id") == id.toString()){
                return e;
            }
        }
        return null;
    }
    /*
    public static clickButton(buttonName : string, id : number) : void {
        const button = FooterButton.getFooterButton(buttonName, id);
        const content = FooterButton.getFooterContent(buttonName, id);
        const p = new FooterButton(button!, content!);
    }
    */
    public static create(buttonName : string, id : number) : FooterButton | null {
        const button = FooterButton.getFooterButton(buttonName, id);
        const content = FooterButton.getFooterContent(buttonName, id);
        if(button == null || content == null){
            return null;
        }else{
            const p = new FooterButton(button!, content!);
            return p;
        }
    }

    constructor(button : HTMLElement, content : HTMLElement) {

        this.button_ = button;
        this.content_ = content;
        if(!this.button_.hasAttribute("data-active")){
            this.button_.setAttribute("data-active", "false");
        }
    }
    public static call(name : string, num: number): void {
        const pushedItem = FooterButton.create(name, num);
        if(pushedItem == null){
            return;
        }else{
            if (pushedItem.isActive) {
                pushedItem.isActive = false;
            } else {
                let i=0;
                while(true){
                    const item = FooterButton.create(name, i);                        
                    if (item != null) {
                        item.isActive = false;
                    }else{
                        break;
                    }
                    i++;
                }
                pushedItem.isActive = true;
            }        
        }

    }
}