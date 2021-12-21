

// 分页对象
export interface Page<T> {
    current: number;
    hitCount: boolean;
    optimizeCountSql: boolean;
    orders: [];
    pages: number;
    records: T[];
    searchCount: boolean;
    size: number;
    total: number;
}
