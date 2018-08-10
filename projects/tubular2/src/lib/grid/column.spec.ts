// import { ColumnFilterMode } from './column';
import { ColumnModel, ColumnDataType } from 'tubular-common';
describe('Column Model', () => {
    let columnModel: ColumnModel;

    beforeAll(() => {
        columnModel = new ColumnModel('mock');
    });

    describe('constructor', () => {

        it('should not be searchable', () => {
            expect(columnModel.Searchable).toBeFalsy();
        });

        it('should not be sortable', () => {
            expect(columnModel.Sortable).toBeFalsy();
        });
    });

    describe('get input type', () => {

        it('should be number', () => {
            columnModel.Filter = ColumnDataType.NUMERIC;
            expect(columnModel.DataType).toBe('number');
        });

        it('should be date', () => {
            columnModel.Filter = ColumnDataType.DATE;
            expect(columnModel.DataType).toBe('date');
        });

        it('should be datetime-local', () => {
            columnModel.Filter = ColumnDataType.DATE_TIME;
            expect(columnModel.DataType).toBe('datetime-local');
        });

        it('should be text', () => {
            columnModel.Filter = null;
            expect(columnModel.DataType).toBe('text');
            columnModel.Filter = ColumnDataType.STRING;
            expect(columnModel.DataType).toBe('text');
            columnModel.Filter = ColumnDataType.BOOLEAN;
            expect(columnModel.DataType).toBe('text');
        });
    });

    describe('get Operators', () => {
        let operators;

        it('by String', () => {
            columnModel.Filter = ColumnDataType.STRING;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(9);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[8].name).toBe('Not Ends With');
            expect(operators[8].value).toBe('NotEndsWith');
        });

        it('by Number', () => {
            columnModel.Filter = ColumnDataType.NUMERIC;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(7);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[6].name).toBe('<');
            expect(operators[6].value).toBe('Lt');
        });

        it('by Date', () => {
            columnModel.Filter = ColumnDataType.DATE;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });

        it('by DateTime', () => {
            columnModel.Filter = ColumnDataType.DATE_TIME;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(8);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[7].name).toBe('<');
            expect(operators[7].value).toBe('Lt');
        });

        it('by Boolean', () => {
            columnModel.Filter = ColumnDataType.BOOLEAN;
            operators = columnModel.getOperators();
            expect(operators.length).toBe(3);
            expect(operators[0].name).toBe('None');
            expect(operators[0].value).toBe('None');
            expect(operators[2].name).toBe('Not Equals');
            expect(operators[2].value).toBe('NotEquals');
        });
    });
});
