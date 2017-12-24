﻿module GraphTableSVG {
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
       
    }

    export class Rectangle {
        constructor(public x: number = 0, public y: number = 0, public width: number = 0, public height: number = 0) {

        }

        get right(): number {
            return this.x + this.width;
        }
        get bottom(): number {
            return this.y + this.height;
        }
        public addOffset(x: number, y: number) {
            this.x += x;
            this.y += y;
        }
        public static merge(rects: Rectangle[]) {
            var x1 = rects[0].x;
            var y1 = rects[0].y;

            var x2 = rects[0].right;
            var y2 = rects[0].bottom;

            rects.forEach((v) => {
                if (x1 > v.x) x1 = v.x;
                if (y1 > v.y) y1 = v.y;
                if (x2 < v.right) x2 = v.right;
                if (y2 < v.bottom) y2 = v.bottom;
            })
            var rect = new Rectangle();
            rect.x = x1;
            rect.y = y1;
            rect.width = x2 - x1;
            rect.height = y2 - y1;
            return rect;
        }
    }
}