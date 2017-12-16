
module Grammar {
    class VariablePair {
        constructor(public left: number, public right: number) {

        }
        public toHash(): string {
            return `${this.left}/${this.right}`;
        }
    };
    export class RepairCompressor {
        slp: SLPDictionary;
        private occurrenceDic: { [key: string]: number[]; } = {};

        constructor(text: string) {
            this.slp = new SLPDictionary();
            for (var i = 0; i < text.length; i++) {
                var v = this.slp.addChar(text[i]);
                this.slp.startVariables.push(v);
            }
        }
        private collect() {
            this.occurrenceDic = {};
            for (var i = 0; i < this.slp.startVariables.length - 1; i++) {
                var pair = new VariablePair(this.slp.startVariables[i], this.slp.startVariables[i + 1]);
                if (i > 0 && this.slp.startVariables[i - 1] == this.slp.startVariables[i] && this.slp.startVariables[i] == this.slp.startVariables[i + 1]) {

                } else {
                    var str = pair.toHash();
                    if (!(str in this.occurrenceDic)) this.occurrenceDic[str] = [];
                    this.occurrenceDic[str].push(i);
                }
            }
        }
        public compress() {
            while (this.slp.startVariables.length > 1) {
                this.collect();
                var i = 0;
                var max = 0;
                for (var key in this.occurrenceDic) {
                    var size = this.occurrenceDic[key].length;
                    if (size > max) {
                        max = size;
                        i = this.occurrenceDic[key][0];
                    }
                }
                var pair = new VariablePair(this.slp.startVariables[i], this.slp.startVariables[i + 1]);
                this.repair(pair);
            }
        }
        private repair(pair: VariablePair) {
            var arr = this.occurrenceDic[pair.toHash()];
            var newNumber = this.slp.addVariable(pair.left, pair.right);
            for (var i = arr.length-1; i >= 0; i--) {

                var x = arr[i];
                this.slp.startVariables.splice(x, 2, newNumber);
            }
        }
    }
}