const gnomeSortVisualization = async (arr, callback) => {
  const animations = [];
  let index = 0;

  while (index < arr.length) {
    if (index === 0 || arr[index] >= arr[index - 1]) {
      index++;
    } else {
      // Swap the elements
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];

      animations.push({
        type: "swap",
        indices: [index, index - 1],
        values: [arr[index], arr[index - 1]],
      });

      // Decrement the index to go back one step
      index--;
    }

    // Visualize the current state of the array
    callback([...arr], animations.length);

    // Introduce a delay here to control the animation speed
    await new Promise((resolve) => setTimeout(resolve, 1)); // Adjust the delay time as needed
  }

  // Notify that the sorting is completed
  callback([...arr], animations.length);
};

export default gnomeSortVisualization;
