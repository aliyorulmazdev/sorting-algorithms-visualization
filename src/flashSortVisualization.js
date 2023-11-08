const flashSortVisualization = async (arr, callback) => {
    const animations = [];
    const n = arr.length;
    const m = Math.floor(0.45 * n);
  
    let max = 0;
    let min = arr[0];
  
    for (let i = 1; i < n; ++i) {
      if (arr[i] < min) {
        min = arr[i];
      }
      if (arr[i] > arr[max]) {
        max = i;
      }
    }
  
    if (min === arr[max]) {
      // Array is already sorted
      callback([...arr], animations.length);
      return;
    }
  
    const c1 = (m - 1) / (arr[max] - min);
    const l = new Array(m).fill(0);
  
    for (let k = 0; k < m; k++) {
      l[k] = 0;
    }
  
    for (let j = 0; j < n; ++j) {
      const k = Math.floor(c1 * (arr[j] - min));
      ++l[k];
    }
  
    for (let p = 1; p < m; ++p) {
      l[p] = l[p] + l[p - 1];
    }
  
    let hold = arr[max];
    arr[max] = arr[0];
    arr[0] = hold;
  
    // permutation
    let move = 0;
    let t;
    let flash;
    let j = 0;
    let k = m - 1;
  
    while (move < (n - 1)) {
      while (j > (l[k] - 1)) {
        ++j;
        k = Math.floor(c1 * (arr[j] - min));
      }
      if (k < 0) break;
      flash = arr[j];
      while (j !== l[k]) {
        k = Math.floor(c1 * (flash - min));
        hold = arr[t = --l[k]];
        arr[t] = flash;
        flash = hold;
        ++move;
        // Visualize comparison and swap steps here
        animations.push({ type: "comparison", indices: [t, k] });
        animations.push({ type: "swap", indices: [t, k], values: [arr[k], flash] });
        
        // Introduce a delay here to control the animation speed
        await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust the delay time as needed
        // After each animation step, call the callback to update the visualization
        callback([...arr], animations.length);
      }
    }
  
    // insertion
    for (j = 1; j < n; j++) {
      hold = arr[j];
      let i = j - 1;
      while (i >= 0 && arr[i] > hold) {
        arr[i + 1] = arr[i--];
        // Visualize comparison and swap steps here
        animations.push({ type: "comparison", indices: [i + 1, i] });
        animations.push({ type: "swap", indices: [i + 1, i], values: [arr[i], hold] });
        
        // Introduce a delay here to control the animation speed
        await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust the delay time as needed
        // After each animation step, call the callback to update the visualization
        callback([...arr], animations.length);
      }
      arr[i + 1] = hold;
    }
  
    // Notify that the sorting is completed
    callback([...arr], animations.length);
};

export default flashSortVisualization;
