export function deepTrim(value: any): any {
    if (typeof value === 'string') {
        return value.trim();
    }
    if (Array.isArray(value)) {
        return value.map((v) => deepTrim(v));
    }
    if (value && typeof value === 'object') {
        const result: any = {};
        Object.keys(value).forEach((key) => {
            result[key] = deepTrim(value[key]);
        });
        return result;
    }
    return value; // number, boolean, null 등은 그대로
}
