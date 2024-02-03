export const parseDate = (date) => {
    const originalDate = new Date(date);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(originalDate);

    const year = originalDate.getFullYear();

    const result = `${formattedDate}`;

    return result

}

export function formatLargeNumber(number) {
    if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'K';
    } else {
        return number.toString();
    }
}