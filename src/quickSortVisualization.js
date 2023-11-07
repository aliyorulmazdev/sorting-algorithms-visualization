const quickSortVisualization = async (arr, callback) => {
  const animations = [];

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Visualize comparison step
      animations.push({ type: "comparison", indices: [j, high] });

      if (arr[j] < pivot) {
        i++;

        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];

        // Visualize swap/overwrite step
        animations.push({
          type: "swap",
          indices: [i, j],
          values: [arr[i], arr[j]],
        });
      }
    }

    // Swap elements
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

    // Visualize swap/overwrite step
    animations.push({
      type: "swap",
      indices: [i + 1, high],
      values: [arr[i + 1], arr[high]],
    });

    return i + 1;
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSort(arr, low, pivotIndex - 1);
      await quickSort(arr, pivotIndex + 1, high);
    }
  };

  await quickSort(arr, 0, arr.length - 1);

  for (const animation of animations) {
    if (animation.type === "comparison") {
      // Highlight compared elements (e.g., change their color)
      // eslint-disable-next-line
      const [index1, index2] = animation.indices;
      // You can change the appearance of the bars for comparison (e.g., change color)
      // Use the callback function to update the state in the main component
      callback([...arr]);
    } else if (animation.type === "swap") {
      const [index1, index2] = animation.indices;
      const [value1, value2] = animation.values;

      // Update the array values visually (e.g., adjust the bar heights and colors)
      arr[index1] = value1;
      arr[index2] = value2;
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

export default quickSortVisualization;
