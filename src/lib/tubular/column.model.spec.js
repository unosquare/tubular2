"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_model_1 = require("./column.model");
const column_model_2 = require("./column.model");
describe('Column Model', () => {
    let columnModel;
    beforeAll(() => {
        columnModel = new column_model_2.ColumnModel('mock', false, false);
    });
    describe('constructor', () => {
        it('should not be searchable', () => {
            expect(columnModel.searchable).toBeFalsy();
        });
        it('should not be sortable', () => {
            expect(columnModel.sortable).toBeFalsy();
        });
    });
    describe('get input type', () => {
        it('should be number', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.Number;
            expect(columnModel.getInputType()).toBe("number");
        });
        it('should be date', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.Date;
            expect(columnModel.getInputType()).toBe("date");
        });
        it('should be datetime-local', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.DateTime;
            expect(columnModel.getInputType()).toBe("datetime-local");
        });
        it('should be text', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.None;
            expect(columnModel.getInputType()).toBe("text");
            columnModel.filterMode = column_model_1.ColumnFilterMode.String;
            expect(columnModel.getInputType()).toBe("text");
            columnModel.filterMode = column_model_1.ColumnFilterMode.Boolean;
            expect(columnModel.getInputType()).toBe("text");
        });
    });
    describe('get Operators', () => {
        let operators;
        it('by String', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.String;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(9);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[8].name).toBe('Not Ends With');
            expect(operators[8].value).toBe('NotEndsWith');
        });
        it('by Number', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.Number;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(7);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[6].name).toBe('<');
            expect(operators[6].value).toBe('Lt');
        });
        it('by Date', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.Date;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });
        it('by DateTime', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.DateTime;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });
        it('by Boolean', () => {
            columnModel.filterMode = column_model_1.ColumnFilterMode.Boolean;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(3);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[2].name).toBe('Not Equals');
            expect(operators[2].value).toBe('NotEquals');
        });
    });
});
