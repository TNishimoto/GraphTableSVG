module GraphTableSVG {
    export class VLine {
        public get smallPoint(): [number, number] {
            if (this.x1 < this.x2) {
                return [this.x1, this.y1];
            } else {
                return [this.x2, this.y2];
            }

        }
        public get largePoint(): [number, number] {
            if (this.x1 < this.x2) {
                return [this.x2, this.y2];
            } else {
                return [this.x1, this.y1];
            }

        }

        constructor(public x1: number, public y1: number, public x2: number, public y2: number) {
        }
        public contains(x: number, y: number): boolean {
            var lineY = this.getY(x);
            if (lineY == null) {
                return x < this.x1;
            } else {
                return y < lineY;
            }
        }

        public getY(x: number): number | null {
            var intercept = this.intercept;
            if (intercept == null) {
                return null;
            } else {
                if (this.slope == null) {
                    return null;
                } else {
                    return (this.slope * x) + intercept;
                }
            }
        }
        public get slope(): number | null {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            if (x2 - x1 == 0) {
                return null;
            } else {
                return (y2 - y1) / (x2 - x1);
            }
        }
        public get intercept(): number | null {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            if (this.slope == null) {
                return null;
            } else {
                return y1 - x1 * this.slope;
            }
        }
        public get inverseSlope(): number | null {
            if (this.slope == 0) {
                return null;
            } else {
                if (this.slope == null) {
                    return null;
                } else {
                    return -1 / this.slope;
                }
            }
        }
        public inverseIntercept(x: number, y: number): number | null {
            if (this.slope == 0) {
                return null;
            } else {
                if (this.inverseSlope == null) {
                    return null;
                } else {
                    return y - (this.inverseSlope * x);
                }
            }
        }
        /*
        public intersectPoint(x: number, y: number): [number, number] {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            if (this.slope == undefined) {
                return [x1, y];
            } else if (this.slope == 0) {
                return [x, y1];
            }
            else {
                var res_x = (this.inverseIntercept(x, y) - this.intercept) / (this.slope - this.inverseSlope);
                var res_y = this.slope * res_x + this.intercept;
                return [res_x, res_y];
            }
        }
        */
        /*
        public distance(x: number, y: number): number {
            var [x1, y1] = this.smallPoint;
            var [x2, y2] = this.largePoint;
            var d1 = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
            var d2 = Math.sqrt((x - x2) * (x - x2) + (y - y2) * (y - y2));
            if (this.slope != undefined) {
                var [i_x, i_y] = this.intersectPoint(x, y);
                if (i_x < x1) {
                    return Math.min(d1, d2);
                } else if (i_x > x2) {
                    return Math.min(d1, d2);
                } else {
                    return Math.sqrt((x - i_x) * (x - i_x) + (y - i_y) * (y - i_y));
                }
            } else if (this.slope == 0) {
                var [i_x, i_y] = this.intersectPoint(x, y);
                if (i_x < x1) {
                    return Math.min(d1, d2);
                } else if (i_x > x2) {
                    return Math.min(d1, d2);
                } else {
                    return Math.sqrt((x - i_x) * (x - i_x) + (y - i_y) * (y - i_y));
                }
            } else {
                var d3 = Math.sqrt((x - x1) * (x - x1));
                var [y3, y4] = y1 < y2 ? [y1, y2] : [y2, y1];
                if (y3 <= y && y <= y4) {
                    return d3;
                } else {
                    return Math.min(d1, d2);
                }
            }
        }
        */
    }
}