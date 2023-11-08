const countingSortVisualization = async (arr, callback) => {
  const max = Math.max(...arr);
  const min = Math.min(...arr);

  const count = new Array(max - min + 1).fill(0);
  const output = new Array(arr.length);
  const animations = [];

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
    // Visualize counting step
    animations.push({ type: "count", index: i, value: arr[i] });
  }

  let index = 0;

  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[index] = i + min;
      output[index] = i + min;
      count[i]--;
      index++;
      // Visualize placement step
      animations.push({ type: "placement", index });
    }
  }

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];
    if (animation.type === "count") {
      // Highlight the element being counted (e.g., change its color)
      // eslint-disable-next-line
      const { index, value } = animation;
      // Use the callback function to update the state in the main component
      callback([...arr], output.slice(0, index + 1), i);
    } else if (animation.type === "placement") {
      // Highlight the element being placed in its sorted position (e.g., change its color)
      const { index } = animation;
      // Use the callback function to update the state in the main component
      callback([...arr], output.slice(0, index + 1), i);

      // Introduce a delay here to control the animation speed
      // You can use async/await or setTimeout
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay time as needed
    }
  }

  // Notify that the sorting is completed
  callback([...arr], output, animations.length);
};

export default countingSortVisualization;
