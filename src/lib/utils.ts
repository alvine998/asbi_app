export const formatThousand = (input: string) => {
    // Remove non-numeric characters except dots
    const numericValue = input.replace(/[^0-9.]/g, '');
    // Format with thousand separator
    return numericValue === '' ? '' : new Intl.NumberFormat('en-US').format(Number(numericValue));
};

export function multiReplace(str: string, replacements: { [key: string]: string }) {
    return Object.entries(replacements).reduce((acc, [key, value]) =>
        acc.replace(new RegExp(key, "g"), value), str);
}

export const handleChange = (e: any, name: string, payload: any, setPayload: any) => {
    setPayload({ ...payload, [name]: e });
};