const bubbleSortVisualization = async (arr, callback) => {
  const animations = [];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Visualize comparison step
      animations.push({ type: "comparison", indices: [j, j + 1] });

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // Visualize swap/overwrite step
        animations.push({
          type: "swap",
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]],
        });
      }
    }
  }

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

export default bubbleSortVisualization;
