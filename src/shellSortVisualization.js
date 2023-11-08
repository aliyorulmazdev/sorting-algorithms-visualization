const shellSortVisualization = async (arr, callback) => {
    const animations = [];
    const n = arr.length;
    let gap = Math.floor(n / 2); // Aralık başlangıcı

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const currentElement = arr[i];
            let j = i;

            // Visualize comparison step
            animations.push({ type: "comparison", indices: [j - gap, j] });

            while (j >= gap && arr[j - gap] > currentElement) {
                // Visualize swap/overwrite step
                animations.push({ type: "swap", indices: [j, j - gap], values: [arr[j - gap], currentElement] });

                arr[j] = arr[j - gap];
                j -= gap;

                if (j >= gap) {
                    // Visualize comparison step within the loop
                    animations.push({ type: "comparison", indices: [j - gap, j] });
                }
            }

            arr[j] = currentElement;

            // Notify that the sorting is completed for this step
            callback([...arr], animations.length);

            // Introduce a delay here to control the animation speed
            await new Promise((resolve) => setTimeout(resolve, 10)); // 100 millisecond delay
        }

        gap = Math.floor(gap / 2); // Aralığı küçült
    }

    // Notify that the sorting is completed
    callback([...arr], animations.length);
};

export default shellSortVisualization;
