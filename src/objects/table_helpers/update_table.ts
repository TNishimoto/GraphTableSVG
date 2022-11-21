
//namespace GraphTableSVG {

import { nearlyEqual, round100 } from "../../common/vline"
import { Debugger } from "../../common/debugger"
import { DirectionType, BorderCoodinateType, Cell } from "./cell"
import { CellRow } from "./row";
import { CellColumn } from "./column";
export class UpdateTable {
    public static tryUpdateBorderCoodinateWithUpdateFlag(cell: Cell, borderType: DirectionType, newValue: number, type: BorderCoodinateType, withUpdate: boolean): boolean {
        let b = false;
        const oldValue = cell.getBorderPosition(borderType, type);
        const newValue100 = round100(newValue);

        if (!nearlyEqual(oldValue, newValue100)) {
            b = true;
            if (withUpdate) {
                Debugger.updateLog(cell, UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag, `Border = ${borderType}, Position = ${type}: ${oldValue}->${newValue100}`)

                UpdateTable.setBorderPosition(cell, borderType, type, newValue100);
            }
            if (!withUpdate && b) {
                Debugger.updateFlagLog(cell, UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag, `Border = ${borderType}, Position = ${type}: ${oldValue}->${newValue100}`)
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
                const b1 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", x1, "x1", withUpdate);
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateBottomBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.x + cell.computeBorderLength2("bottom");
                const b2 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", x2, "x2", withUpdate);
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateBottomBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }


                const y1 = cell.y + cell.height;
                const b3 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", y1, "y1", withUpdate);

                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateBottomBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }


                const y2 = cell.getBorderPosition("bottom", "y1");
                const b4 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell, "bottom", y2, "y2", withUpdate);
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateBottomBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;
            } else if (cell.bottomCell != null && cell.bottomCell.isMaster) {
                const b = UpdateTable.tryRelocateTopBorderWithUpdateFlag(cell.bottomCell,withUpdate);
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
                const b1 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", x1, "x1", withUpdate);
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateTopBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                //const x2 = cell.x;
                const x2 = cell.x + cell.computeBorderLength2("top");
                const b2 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", x2, "x2", withUpdate);
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateTopBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", y1, "y1", withUpdate);
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateTopBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }


                const y2 = cell.getBorderPosition("top", "y1");
                const b4 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"top", y2, "y2", withUpdate);
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateTopBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;

            } else if (cell.topCell != null && cell.topCell.isMaster) {
                const b = UpdateTable.tryRelocateBottomBorderWithUpdateFlag(cell.topCell, withUpdate);
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
                const b1 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", x1, "x1", withUpdate);
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateLeftBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.getBorderPosition("left", "x1");;
                const b2 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", x2, "x2", withUpdate);
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateLeftBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", y1, "y1", withUpdate);
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateLeftBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }

                const y2 = cell.y + cell.computeBorderLength2("left");
                const b4 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"left", y2, "y2", withUpdate);
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateLeftBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;

            } else if (cell.leftCell != null && cell.leftCell.isMaster) {
                const b = UpdateTable.tryRelocateRightBorderWithUpdateFlag(cell.leftCell, withUpdate);
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
                const b1 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", x1, "x1", withUpdate);
                if (!withUpdate && b1) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateRightBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x1`)
                    return true;
                }

                const x2 = cell.x + cell.width;
                const b2 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", x2, "x2", withUpdate);
                if (!withUpdate && b2) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateRightBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} x2`)
                    return true;
                }

                const y1 = cell.y;
                const b3 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", y1, "y1", withUpdate);
                if (!withUpdate && b3) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateRightBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y1`)
                    return true;
                }

                const y2 = cell.y + cell.computeBorderLength2("right");
                const b4 = UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag(cell,"right", y2, "y2", withUpdate);
                if (!withUpdate && b4) {
                    Debugger.updateFlagLog(cell, UpdateTable.tryRelocateRightBorderWithUpdateFlag, `${UpdateTable.tryUpdateBorderCoodinateWithUpdateFlag.name} y2`)
                    return true;
                }
                return b1 || b2 || b3 || b4;
            } else if (cell.rightCell != null && cell.rightCell.isMaster) {
                const b = UpdateTable.tryRelocateLeftBorderWithUpdateFlag(cell.rightCell, withUpdate);
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

        
        const b1 = UpdateTable.tryRelocateTopBorderWithUpdateFlag(cell, withUpdate);
        if (!withUpdate && b1) {
            Debugger.updateFlagLog(cell, UpdateTable.tryUpdateBordersWithUpdateFlag, `${UpdateTable.tryRelocateTopBorderWithUpdateFlag.name}`)
            return true;
        }

        

        const b2 = UpdateTable.tryRelocateLeftBorderWithUpdateFlag(cell, withUpdate);
        if (!withUpdate && b2) {
            Debugger.updateFlagLog(cell, UpdateTable.tryUpdateBordersWithUpdateFlag, `${UpdateTable.tryRelocateLeftBorderWithUpdateFlag.name}`)
            return true;
        }

        const b3 = UpdateTable.tryRelocateRightBorderWithUpdateFlag(cell, withUpdate);
        if (!withUpdate && b3) {
            Debugger.updateFlagLog(cell, UpdateTable.tryUpdateBordersWithUpdateFlag, `${UpdateTable.tryRelocateRightBorderWithUpdateFlag.name}`)

            return true;
        }

        const b4 = UpdateTable.tryRelocateBottomBorderWithUpdateFlag(cell, withUpdate);
        if (!withUpdate && b4) {
            Debugger.updateFlagLog(cell, UpdateTable.tryUpdateBordersWithUpdateFlag, `${UpdateTable.tryRelocateBottomBorderWithUpdateFlag.name}`)
            return true;
        }
        


        return b1 || b2 || b3 || b4;
    }
    public static tryUpdateBorders(cellArray : Cell[], withUpdate : boolean) : boolean{
        let b  = false;

        const date1 = new Date();
        cellArray.forEach((v) =>{
            if(v.isMaster){
                b = UpdateTable.tryUpdateBordersWithUpdateFlag(v, withUpdate) || b;
            }
        })
        const date2 = new Date();
        Debugger.showTime(date1, date2, `Table: X`, "updateBorders")

        return b;
    }

    public static updateCellSizeAfterUpdatingRowsAndColumns(rows : CellRow[], columns : CellColumn[], withUpdate : boolean) : boolean{
        let b = false;

        for(let y = 0;y<rows.length;y++){
            const height = Math.max(rows[y].height, rows[y].minimumHeight);

            for(let x = 0;x<rows[y].length;x++){
                const width = Math.max(columns[x].width, columns[x].minimumWidth);

                const cell = rows[y].cells[x];
                if (cell.isMasterCellOfRowCountOne && !nearlyEqual(cell.height, height)) {
                    b = true;
                    if(withUpdate){
                        Debugger.updateLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.height} != ${height}`)

                        cell.height = height;
                    }
                    if(!withUpdate && b){
                        Debugger.updateFlagLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.height} != ${height}`)
    
                        return b;
                    }
                }
                if (cell.isMasterCellOfColumnCountOne && !nearlyEqual(cell.width, width)) {
                    b = true;
                    if (withUpdate) {
                        Debugger.updateLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.width} != ${width} y = ${y}`)
    
                        cell.width = width;
                    }
    
                    if (!withUpdate && b) {
                        Debugger.updateFlagLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.width} != ${width} y = ${y}`)
    
                        return true;
                    }
                }
                

                if (!cell.isMasterCellOfRowCountOne) {
                    b = cell.tryUpdateWithUpdateFlag(withUpdate)  || b;
    
                    if(!withUpdate && b){
                        Debugger.updateFlagLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.tryUpdateWithUpdateFlag.name} x = ${x}`)
                        return b;
                    }
                }
                if (!cell.isMasterCellOfColumnCountOne) {

                    b = cell.tryUpdateWithUpdateFlag(withUpdate)  || b;
                    if (!withUpdate && b) {
                        Debugger.updateFlagLog(cell, UpdateTable.updateCellSizeAfterUpdatingRowsAndColumns, `${cell.tryUpdateWithUpdateFlag.name} y = ${y}`)
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
                Debugger.updateFlagLog(rows[i], UpdateTable.relocateCellsAfterUpdatingCellSize, rows[i].setYWithUpdate.name)
                return b;
            }
            height += rows[i].height;

        }

        let width = 0;

        for(let i=0;i<columns.length;i++){
            b = columns[i].setXWithUpdate(width, withUpdate)  || b;
            if(!withUpdate && b){
                Debugger.updateFlagLog(columns[i], UpdateTable.relocateCellsAfterUpdatingCellSize, columns[i].setXWithUpdate.name)


                return b;
            }
            width += columns[i].width;

        }

        return b;
    }
    public static tryUpdateRowHeightAndColumnWidthWithUpdateFlag(rows : CellRow[], columns : CellColumn[], allowShrink: boolean, withUpdate : boolean) : boolean {
        let b = false;
        for(let i = 0;i<rows.length;i++){
            b = rows[i].tryUpdateHeightWithUpdateFlag(allowShrink, withUpdate) || b;
            if(!withUpdate && b){
                return b;
            }
        }
        for(let i = 0;i<columns.length;i++){
            b = columns[i].tryUpdateWidthWithUpdateFlag(allowShrink, withUpdate) || b;
            if(!withUpdate && b){
                return b;
            }
        }
        return b;
    }

}