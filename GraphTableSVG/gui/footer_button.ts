class FooterButton {

    static activeColor: string = "#31c8aa";
    static nonActiveColor: string = "#524b4b";
    //static buttonIDPrefix: string = "fb";
    //static contentIDPrefix: string = "fc";
    private button_: HTMLElement;
    private content_: HTMLElement;

    /*
    static isActive(content: HTMLDivElement) {
        return content.style.display == "block";
    }
    
    static getContent(_contentIDPrefix: string, id: number): HTMLDivElement {
        var content: HTMLDivElement = <HTMLDivElement>document.getElementById(`${_contentIDPrefix}${id}`);
        return content;
    }
    static getButton(_buttonIDPrefix: string, id: number): HTMLDivElement {
        var content: HTMLDivElement = <HTMLDivElement>document.getElementById(`${_buttonIDPrefix}${id}`);
        return content;
    }
    static setMode(value: boolean) {
        if (value) {
            this.content_.style.display = "block";
            this.button_.style.backgroundColor = FooterButton.activeColor;
            this.content_.style.backgroundColor = FooterButton.activeColor;
        } else {

            this.content_.style.display = "none";
            this.button_.style.backgroundColor = FooterButton.nonActiveColor;
            this.content_.style.backgroundColor = FooterButton.nonActiveColor;
        }
        this.isActive_ = value;

    }
    */

    

    get isActive(): boolean {
        return this.content_.style.display == "block";
    }
    get isExist(): boolean {
        return this.content_ != null;
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
    }
    constructor(_buttonIDPrefix: string, _contentIDPrefix, id: number) {
        var content = document.getElementById(`${_contentIDPrefix}${id}`);
        var button = document.getElementById(`${_buttonIDPrefix}${id}`)

        this.button_ = button;
        this.content_ = content;
        //this.isActive = isActive;
    }
    
    public static call(_buttonIDPrefix: string, _contentIDPrefix, id: number): void {
        var i = 0;
        while (true) {            
            var item = new FooterButton(_buttonIDPrefix, _contentIDPrefix, i);
            if (!item.isExist) break;
            item.isActive = i == id;
            i++;
        }
    }
    /*
    public static createFooterButtons() {
        for (var i = 0; i < 14; i++) {
            var content = document.getElementById(`fc${i}`);
            var button = document.getElementById(`fb${i}`)
            if (content != null && button != null) {
                FooterButtons[i] = new FooterButton(button, content, false);
            }
        }
        FooterButtons[1].isActive = true;
    }
    */
}