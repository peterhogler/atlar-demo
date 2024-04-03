import { useEffect, useState } from "react";

export function useCalculateItemsPerContainer(containerRef: React.RefObject<HTMLElement>, rowHeight: number) {
    const [itemsPerPage, setItemsPerPage] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const calculatedItemsPerPage = Math.floor(containerHeight / rowHeight);

            setItemsPerPage(calculatedItemsPerPage);
        }
    }, [containerRef, rowHeight]); // Dependencies

    return itemsPerPage;
}
