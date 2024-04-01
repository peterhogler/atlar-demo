const formatYAxisTick = (value: number) => {
    if (value >= 1e6) {
        return `${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
        return `${(value / 1e3).toFixed(1)}k`;
    } else {
        return value.toString();
    }
};

const formatDateTick = (tickItem: string) => {
    const date = new Date(tickItem);

    return `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

export { formatDateTick, formatYAxisTick };
