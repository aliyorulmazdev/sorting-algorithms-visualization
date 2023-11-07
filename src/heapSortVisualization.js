const heapSortVisualization = async (arr, callback) => {
  const animations = [];

  const heapify = (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      // Swap arr[i] and arr[largest]
      animations.push({ type: "comparison", indices: [i, largest] });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      animations.push({ type: "overwrite", index: i, value: arr[i] });
      animations.push({ type: "overwrite", index: largest, value: arr[largest] });

      heapify(arr, n, largest);
    }
  };

  const buildMaxHeap = (arr) => {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
  };

  const heapSort = (arr) => {
    const n = arr.length;

    buildMaxHeap(arr);

    for (let i = n - 1; i > 0; i--) {
      animations.push({ type: "comparison", indices: [0, i] });
      [arr[0], arr[i]] = [arr[i], arr[0]];
      animations.push({ type: "overwrite", index: 0, value: arr[0] });
      animations.push({ type: "overwrite", index: i, value: arr[i] });

      heapify(arr, i, 0);
    }
  };

  heapSort(arr);

  for (const animation of animations) {
    if (animation.type === "comparison") {
      // Visualize comparison step
      // Highlight compared elements (e.g., change their color)
      // eslint-disable-next-line
      const [index1, index2] = animation.indices;
      // You can change the appearance of the bar for comparison (e.g., change color)
      // Use the callback function to update the state in the main component
      callback([...arr]);
    } else if (animation.type === "overwrite") {
      // Visualize overwrite step
      arr[animation.index] = animation.value; // Access properties directly
      // Update the array values visually (e.g., adjust the bar heights)
      // Use the callback function to update the state in the main component
      callback([...arr]);

      // Introduce a delay here to control the animation speed
      // You can use async/await or setTimeout
      await new Promise((resolve) => setTimeout(resolve, 5)); // Adjust the delay time as needed
    }
  }

  // Notify that the sorting is completed
  callback([...arr]);
};

export default heapSortVisualization;
