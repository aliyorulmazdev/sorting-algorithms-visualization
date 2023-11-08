const shakerSortVisualization = async (arr, callback) => {
    const animations = [];
    const n = arr.length;
    let left = 0;
    let right = n - 1;
  
    while (left < right) {
      for (let i = left; i < right; i++) {
        // Visualize comparison step (comparing elements i and i+1)
        animations.push({ type: "comparison", indices: [i, i + 1] });
  
        if (arr[i] > arr[i + 1]) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          // Visualize swap/overwrite step
          animations.push({ type: "swap", indices: [i, i + 1], values: [arr[i], arr[i + 1]] });
        }
      }
      right--;
  
      for (let i = right; i > left; i--) {
        // Visualize comparison step (comparing elements i and i-1)
        animations.push({ type: "comparison", indices: [i, i - 1] });
  
        if (arr[i] < arr[i - 1]) {
          // Swap elements
          [arr[i], arr[i - 1]] = [arr[i - 1], arr[i]];
          // Visualize swap/overwrite step
          animations.push({ type: "swap", indices: [i, i - 1], values: [arr[i], arr[i - 1]] });
        }
      }
      left++;
  
      // Visualize the current state of the array
      callback([...arr], animations.length);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 100 milisaniye gecikme
    }
  
    // Notify that the sorting is completed
    callback([...arr], animations.length);
  };
  
  export default shakerSortVisualization;
  