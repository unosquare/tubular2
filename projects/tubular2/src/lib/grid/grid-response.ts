export interface GridResponse {
    Counter: number;
    Payload: AnalyserNode[];
    TotalRecordCount: number;
    FilteredRecordCount: number;
    TotalPages: number;
    CurrentPage: number;
    AggregationPayload: any;
}
