export const formatThousand = (input: string) => {
    // Remove non-numeric characters except dots
    const numericValue = input.replace(/[^0-9.]/g, '');
    // Format with thousand separator
    return numericValue === '' ? '' : new Intl.NumberFormat('en-US').format(Number(numericValue));
};