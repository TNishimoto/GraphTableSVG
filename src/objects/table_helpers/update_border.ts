
//namespace GraphTableSVG {

import { nearlyEqual, round100 } from "../../common/vline"
import { Debugger } from "../../common/debugger"
import { DirectionType, BorderCoodinateType, Cell } from "./cell"
export class UpdateBorder {
    public static tryUpdateBorderCoodinateWithUpdateFlag(cell: Cell, borderType: DirectionType, newValue: number, type: BorderCoodinateType, withUpdate: boolean): boolean {
        let b = false;
        const oldValue = cell.getBorderPosition(borderType, type);
        const newValue100 = round100(newValue);

        if (!nearlyEqual(oldValue, newValue100)) {
            b = true;
            if (withUpdate) {
                Debugger.updateLog(this, UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag, `Border = ${borderType}, Position = ${type}: ${oldValue}->${newValue}`)

                UpdateBorder.setBorderPosition(cell, borderType, type, newValue100);
            }
            if (!withUpdate && b) {
                Debugger.updateFlagLog(this, UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag, `Border = ${borderType}, Position = ${type}: ${oldValue}->${newValue}`)
            }
        }
        return b;
    }
    public static setBorderPosition(cell: Cell, borderType: DirectionType, positionType: BorderCoodinateType, newValue: number) {

        let border = cell.svgTopBorder;
        switch (borderType) {
            case "top":
                border = cell.svgTopBorder;
                break;
            case "left":
                border = cell.svgLeftBorder;
                break;
            case "right":
                border = cell.svgRightBorder;
                break;
            case "bottom":
                border = cell.svgBottomBorder;
                break;
        }

        switch (positionType) {
            case "x1":
                border.x1.baseVal.value = round100(newValue);
            case "x2":
                border.x2.baseVal.value = round100(newValue);
            case "y1":
                border.y1.baseVal.value = round100(newValue);
            case "y2":
                border.y2.baseVal.value = round100(newValue);

        }
    }
    public static tryRelocateBottomBorderWithUpdateFlag(cell : Cell, withUpdate: boolean): boolean {

        if (!cell.isMaster) {
            return false;
        }
        if (cell.table.svgGroup.contains(cell.svgBottomBorder)) {
            if (cell.isMaster) {
                const x1 = cell.x;
                const b1 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", x1, "x1", withUpdate);
                if (withUpdate && b1) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                }

                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.x + cell.computeBorderLength2("bottom");
                const b2 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", x2, "x2", withUpdate);
                if (withUpdate && b2) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                }
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }


                const y1 = cell.y + cell.height;
                const b3 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", y1, "y1", withUpdate);
                if (withUpdate && b3) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                }

                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }


                const y2 = cell.getBorderPosition("bottom", "y1");
                const b4 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", y2, "y2", withUpdate);
                if (withUpdate && b4) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                }
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateBottomBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;
            } else if (cell.bottomCell != null && cell.bottomCell.isMaster) {
                const b = UpdateBorder.tryRelocateTopBorderWithUpdateFlag(cell.bottomCell,withUpdate);
                return b;
            } else {
                throw Error("error");
            }
        }else{
            return false;
        }

    }


    public static tryRelocateTopBorderWithUpdateFlag(cell : Cell,withUpdate: boolean): boolean {
        //let b = false;
        if (!cell.isMaster) return false;

        if (cell.table.svgGroup.contains(cell.svgTopBorder)) {
            if (cell.isMaster) {
                const x1 = cell.x;
                const b1 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", x1, "x1", withUpdate);
                if (withUpdate && b1) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                }
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.x + cell.computeBorderLength2("top");
                const b2 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", x2, "x2", withUpdate);
                if (withUpdate && b2) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                }
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", y1, "y1", withUpdate);
                if (withUpdate && b3) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                }
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }


                const y2 = cell.getBorderPosition("top", "y1");
                const b4 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", y2, "y2", withUpdate);
                if (withUpdate && b4) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                }
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateTopBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;

            } else if (cell.topCell != null && cell.topCell.isMaster) {
                const b = UpdateBorder.tryRelocateBottomBorderWithUpdateFlag(cell.topCell, withUpdate);
                return b;
            } else {
                throw Error("error");
            }
        } else {
            return false;
        }

    }
    public static tryRelocateLeftBorderWithUpdateFlag(cell : Cell,withUpdate: boolean): boolean {
        if (!cell.isMaster) {
            return false;
        }

        if (cell.table.svgGroup.contains(cell.svgLeftBorder)) {
            if (cell.isMaster) {
                const x1 = cell.x;
                const b1 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", x1, "x1", withUpdate);
                if (withUpdate && b1) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                }
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.getBorderPosition("left", "x1");;
                const b2 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", x2, "x2", withUpdate);
                if (withUpdate && b2) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                }

                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", y1, "y1", withUpdate);
                if (withUpdate && b3) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                }
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }

                const y2 = cell.y + cell.computeBorderLength2("left");
                const b4 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", y2, "y2", withUpdate);
                if (withUpdate && b4) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                }

                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateLeftBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;

            } else if (cell.leftCell != null && cell.leftCell.isMaster) {
                const b = UpdateBorder.tryRelocateRightBorderWithUpdateFlag(cell.leftCell, withUpdate);
                return b;
            } else {
                throw Error("error");
            }
        }else{
            return false;
        }
    }
    public static tryRelocateRightBorderWithUpdateFlag(cell : Cell,withUpdate: boolean): boolean {
        if (!cell.isMaster) {
            return false;
        }

        if (cell.table.svgGroup.contains(cell.svgRightBorder)) {
            if (cell.isMaster) {
                const x1 = cell.x + cell.width;
                const b1 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", x1, "x1", withUpdate);
                if (withUpdate && b1) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                }
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.x + cell.width;
                const b2 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", x2, "x2", withUpdate);
                if (withUpdate && b2) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                }
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", y1, "y1", withUpdate);
                if (withUpdate && b3) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                }
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }

                const y2 = cell.y + cell.computeBorderLength2("right");
                const b4 = UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", y2, "y2", withUpdate);
                if (withUpdate && b4) {
                    Debugger.updateLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                }

                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(this, UpdateBorder.tryRelocateRightBorderWithUpdateFlag, `${UpdateBorder.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;
            } else if (cell.rightCell != null && cell.rightCell.isMaster) {
                const b = UpdateBorder.tryRelocateLeftBorderWithUpdateFlag(cell.rightCell, withUpdate);
                return b;
            } else {
                throw Error("error");
            }
        }else{
            return false;
        }
    }
     /**
     *セルの位置を再計算します。
     */
     public static tryRelocateWithUpdateFlag(cell : Cell, withUpdate: boolean): boolean {
        //let b = false;

        const b1 = UpdateBorder.tryRelocateTopBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b1) {
            Debugger.updateLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateTopBorderWithUpdateFlag.name}`)
        }
        if (!withUpdate && b1) {
            Debugger.updateFlagLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateTopBorderWithUpdateFlag.name}`)
            return true;
        }

        const b2 = UpdateBorder.tryRelocateLeftBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b2) {
            Debugger.updateLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateLeftBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b2) {
            Debugger.updateFlagLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateLeftBorderWithUpdateFlag.name}`)
            return true;
        }

        const b3 = UpdateBorder.tryRelocateRightBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b3) {
            Debugger.updateLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateRightBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b3) {
            Debugger.updateFlagLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateRightBorderWithUpdateFlag.name}`)

            return true;
        }

        const b4 = UpdateBorder.tryRelocateBottomBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b4) {
            Debugger.updateLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateBottomBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b4) {
            Debugger.updateFlagLog(this, UpdateBorder.tryRelocateWithUpdateFlag, `${UpdateBorder.tryRelocateBottomBorderWithUpdateFlag.name}`)
            return true;
        }


        return b1 || b2 || b3 || b4;
    }

}