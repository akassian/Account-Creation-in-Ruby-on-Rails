export const UNEXPECTED_ERROR_MESSAGE = "An unexpected error occurred. Please try again later.";

export function getFirstErrorMessage(obj: Record<string, string[]> | null): any {
    if (!obj) return UNEXPECTED_ERROR_MESSAGE;

    const firstKey = Object.keys(obj)[0];
    if (firstKey && Array.isArray(obj[firstKey])) {
        return obj[firstKey][0];
    }

    return UNEXPECTED_ERROR_MESSAGE;
}