// tslint:disable-next-line: no-namespace
import { LogicGraph, LogicGraphNode } from "./logic_tree"
import { LogicTable } from "./logic_table"

import * as AttributeNames from "../basic/common/attribute_names"
import * as DefaultClassNames from "../basic/common/default_class_names"

export class TableDictionary {
    public static IndexName = "___GraphTableSVG_Console_Index";
    public static ValueName = "___GraphTableSVG_Console_Value";

    private columnMapper: Map<string, number> = new Map();
    private rows: Map<string, any>[] = new Array();
    private objects: any[] = new Array();

    // columnValues: Map<string, (string|undefined)[]>= new Map();
    // itemCount : number = 0;

    constructor() {
        this.columnMapper.set(TableDictionary.IndexName, 0);
        // this.columnValues.set("index", []);
    }
    public construct(item: any) {
        if (item instanceof Array) {
            item.forEach((v) => {
                this.add(v);
            })
        } else {
            this.add(item);
        }
    }

    public addValue(i: number, key: string, value: any) {
        const column = this.columnMapper.get(key);
        if (column === undefined) {
            this.columnMapper.set(key, this.columnMapper.size);
        }
        this.rows[i].set(key, value);

    }
    public add(item: any) {
        this.rows.push(new Map());
        this.objects.push(item);
        const x = this.rows.length - 1;
        this.addValue(x, TableDictionary.IndexName, x.toString());
        if (item instanceof Array) {
            for (let i = 0; i < item.length; i++) {
                const cell = item[i];
                if (cell != undefined) {
                    this.addValue(x, i.toString(), cell);
                }
            }
        } else {
            if (typeof item === "string" || typeof item === "number" || typeof item === "boolean") {
                this.addValue(x, TableDictionary.ValueName, item.toString());
            } else if (typeof item === "object") {
                Object.keys(item).forEach((key) => {
                    const value = item[key];
                    this.addValue(x, key.toString(), value);
                })
            }
        }
    }

    public toLogicTable(): LogicTable {
        const table = new LogicTable({ columnCount: this.columnMapper.size, rowCount: this.rows.length + 1 });

        this.columnMapper.forEach((value, key) => {
            table.cells[0][value].textClass = DefaultClassNames.defaultConsoleColumnTitleCellTextClass;
            table.cells[0][value].backgroundClass = DefaultClassNames.defaultConsoleColumnTitleCellBackgroundClass;
            if (key == TableDictionary.IndexName) {
                table.cells[0][value].text = "(index)";
            } else if (key == TableDictionary.ValueName) {
                table.cells[0][value].text = "(value)";

            } else {
                table.cells[0][value].text = key;
            }

        })
        this.rows.forEach((map, index) => {

            const tableIndex = index + 1;
            for (let i = 0; i < this.columnMapper.size; i++) {
                table.cells[tableIndex][i].text = "undefined";
                table.cells[tableIndex][i].textClass = DefaultClassNames.defaultConsoleColumnTitleCellUndefinedTextClass;
            }
            map.forEach((value, key) => {
                const columnIndex = this.columnMapper.get(key);
                if (columnIndex != undefined) {
                    const cell = this.rows[index].get(key);
                    if (cell == null) {
                        table.cells[tableIndex][columnIndex].text = "null";
                    } else if (cell != undefined) {
                        table.cells[tableIndex][columnIndex].text = cell.toString();
                        table.cells[tableIndex][columnIndex].textClass = DefaultClassNames.defaultTextClass;

                    }
                }
            })
        })
        return table;

    }
    createNode(item: any, graph: LogicGraph, dic: Map<object, LogicGraphNode>): LogicGraphNode {
        if (typeof item === "object") {
            let node = dic.get(item);
            if (node !== undefined) {
                return node;
            } else {
                node = graph.addNode();
                if (item !== undefined && item != null) {
                    dic.set(item, node);

                    Object.keys(item).forEach((key) => {
                        const value = (item as any)[key];
                        const child = this.createNode(value, graph, dic);
                        const edge = graph.createEdge();
                        edge.endNodeIndex = graph.getIndex(child);
                        edge.text = key.toString();

                        node!.addEdge(edge);

                    })
                } else {
                    node.text = "null";
                }
                return node;


            }
        } else {
            const node = graph.addNode();
            if (typeof item === "undefined") {
                node.text = "undefined";
            } else {
                node.text = item.toString();
            }
            return node;

        }

    }
    public toLogicGraph(): LogicGraph {
        const dic: Map<object, LogicGraphNode> = new Map();
        const graph = new LogicGraph();
        this.rows.forEach((v, i) => {
            const obj = this.objects[i];
            this.createNode(obj, graph, dic);
        })
        return graph;
    }

}
