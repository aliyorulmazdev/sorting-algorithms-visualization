const combSortVisualization = async (arr, callback) => {
    const animations = [];
    const n = arr.length;
    let gap = n;
    let swapped = true;
  
    while (gap > 1 || swapped) {
      gap = getNextGap(gap);
  
      swapped = false;
  
      for (let i = 0; i < n - gap; i++) {
        animations.push({ type: "comparison", indices: [i, i + gap] });
  
        if (arr[i] > arr[i + gap]) {
          swapped = true;
          [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
  
          animations.push({
            type: "swap",
            indices: [i, i + gap],
            values: [arr[i + gap], arr[i]],
          });
        }
  
        callback([...arr], animations.length);
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    }
  
    callback([...arr], animations.length);
  };
  
  const getNextGap = (gap) => {
    gap = (gap * 10) / 13;
    return Math.max(1, Math.floor(gap));
  };
  
  export default combSortVisualization;
  