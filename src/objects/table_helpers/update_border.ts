
//namespace GraphTableSVG {

import { nearlyEqual, round100 } from "../../common/vline"
import { Debugger } from "../../common/debugger"
import { DirectionType, BorderCoodinateType, Cell } from "./cell"
import { CellRow } from "./row";
import { CellColumn } from "./column";
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
                border.setAttribute("x1", round100(newValue).toString());
            case "x2":
                border.setAttribute("x2", round100(newValue).toString());
            case "y1":
                border.setAttribute("y1", round100(newValue).toString());
            case "y2":
                border.setAttribute("y2", round100(newValue).toString());
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

                //const x2 = cell.x;
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
     public static tryUpdateBordersWithUpdateFlag(cell : Cell, withUpdate: boolean): boolean {
        //let b = false;

        
        const b1 = UpdateBorder.tryRelocateTopBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b1) {
            Debugger.updateLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateTopBorderWithUpdateFlag.name}`)
        }
        if (!withUpdate && b1) {
            Debugger.updateFlagLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateTopBorderWithUpdateFlag.name}`)
            return true;
        }

        

        const b2 = UpdateBorder.tryRelocateLeftBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b2) {
            Debugger.updateLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateLeftBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b2) {
            Debugger.updateFlagLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateLeftBorderWithUpdateFlag.name}`)
            return true;
        }

        const b3 = UpdateBorder.tryRelocateRightBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b3) {
            Debugger.updateLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateRightBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b3) {
            Debugger.updateFlagLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateRightBorderWithUpdateFlag.name}`)

            return true;
        }

        const b4 = UpdateBorder.tryRelocateBottomBorderWithUpdateFlag(cell, withUpdate);
        if (withUpdate && b4) {
            Debugger.updateLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateBottomBorderWithUpdateFlag.name}`)
        }

        if (!withUpdate && b4) {
            Debugger.updateFlagLog(this, UpdateBorder.tryUpdateBordersWithUpdateFlag, `${UpdateBorder.tryRelocateBottomBorderWithUpdateFlag.name}`)
            return true;
        }
        


        return b1 || b2 || b3 || b4;
    }
    public static tryUpdateBorders(cellArray : Cell[], withUpdate : boolean) : boolean{
        let b  = false;

        const date1 = new Date();
        cellArray.forEach((v) =>{
            if(v.isMaster){
                b = UpdateBorder.tryUpdateBordersWithUpdateFlag(v, withUpdate) || b;
            }
        })
        const date2 = new Date();
        Debugger.showTime(date1, date2, `Table: X`, "updateBorders")

        return b;
    }

    public static updateCellSizeAfterUpdatingRowsAndColumns(rows : CellRow[], columns : CellColumn[], withUpdate : boolean) : boolean{
        let b = false;

        for(let y = 0;y<rows.length;y++){
            const height = Math.max(rows[y].height, CellRow.defaultHeight);

            for(let x = 0;x<rows[y].length;x++){
                const width = Math.max(columns[x].width, CellColumn.defaultWidth);

                const cell = rows[y].cells[x];
                if (cell.isMasterCellOfRowCountOne && !nearlyEqual(cell.height, height)) {
                    b = true;
                    if(withUpdate){
                        cell.height = height;
                    }
                    if(!withUpdate && b){
                        Debugger.updateFlagLog(this, UpdateBorder.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.height} != ${height}`)
    
                        return b;
                    }
                }
                if (cell.isMasterCellOfColumnCountOne && !nearlyEqual(cell.width, width)) {
                    b = true;
                    if (withUpdate) {
                        cell.width = width;
                    }
    
                    if (!withUpdate && b) {
                        Debugger.updateFlagLog(this, UpdateBorder.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.width} != ${width} y = ${y}`)
    
                        return true;
                    }
                }
                

                if (!cell.isMasterCellOfRowCountOne) {
                    b = cell.tryUpdateWithUpdateFlag(withUpdate)  || b;
    
                    if(!withUpdate && b){
                        Debugger.updateFlagLog(this, UpdateBorder.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.tryUpdateWithUpdateFlag.name} x = ${x}`)
                        return b;
                    }
                }
                if (!cell.isMasterCellOfColumnCountOne) {

                    b = cell.tryUpdateWithUpdateFlag(withUpdate)  || b;
                    if (!withUpdate && b) {
                        Debugger.updateFlagLog(this, UpdateBorder.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.tryUpdateWithUpdateFlag.name} y = ${y}`)
                        return b;
                    }
                }
            }
    
        }

        return b;
    }
    public static relocateCellsAfterUpdatingCellSize(rows : CellRow[], columns : CellColumn[], withUpdate : boolean) : boolean{
        let b = false;
        let height = 0;
        for(let i=0;i<rows.length;i++){
            b = rows[i].setYWithUpdate(height, withUpdate)  || b;
            if(!withUpdate && b){
                Debugger.updateFlagLog(this, UpdateBorder.relocateCellsAfterUpdatingCellSize, rows[i].setYWithUpdate.name)
                return b;
            }
            height += rows[i].height;

        }

        let width = 0;

        for(let i=0;i<columns.length;i++){
            b = columns[i].setXWithUpdate(width, withUpdate)  || b;
            if(!withUpdate && b){
                Debugger.updateFlagLog(this, UpdateBorder.relocateCellsAfterUpdatingCellSize, columns[i].setXWithUpdate.name)


                return b;
            }
            width += columns[i].width;

        }

        return b;
    }

}