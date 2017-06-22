import { ColumnFilterMode } from './column.model';
import { ColumnModel } from './column.model';

describe('Column Model', () => {
    let columnModel: ColumnModel;

    beforeAll(() => {
        columnModel = new ColumnModel('mock', false, false);
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
            columnModel.filterMode = ColumnFilterMode.Number;
            expect(columnModel.getInputType()).toBe('number');
        });

        it('should be date', () => {
            columnModel.filterMode = ColumnFilterMode.Date;
            expect(columnModel.getInputType()).toBe('date');
        });

        it('should be datetime-local', () => {
            columnModel.filterMode = ColumnFilterMode.DateTime;
            expect(columnModel.getInputType()).toBe('datetime-local');
        });

        it('should be text', () => {
            columnModel.filterMode = ColumnFilterMode.None;
            expect(columnModel.getInputType()).toBe('text');
            columnModel.filterMode = ColumnFilterMode.String;
            expect(columnModel.getInputType()).toBe('text');
            columnModel.filterMode = ColumnFilterMode.Boolean;
            expect(columnModel.getInputType()).toBe('text');
        });
    });

    describe('get Operators', () => {
        let operators;

        it('by String', () => {
            columnModel.filterMode = ColumnFilterMode.String;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(9);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[8].name).toBe('Not Ends With');
            expect(operators[8].value).toBe('NotEndsWith');
        });

        it('by Number', () => {
            columnModel.filterMode = ColumnFilterMode.Number;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(7);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[6].name).toBe('<');
            expect(operators[6].value).toBe('Lt');
        });

        it('by Date', () => {
            columnModel.filterMode = ColumnFilterMode.Date;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });

        it('by DateTime', () => {
            columnModel.filterMode = ColumnFilterMode.DateTime;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });

        it('by Boolean', () => {
            columnModel.filterMode = ColumnFilterMode.Boolean;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(3);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[2].name).toBe('Not Equals');
            expect(operators[2].value).toBe('NotEquals');
        });
    });
});
