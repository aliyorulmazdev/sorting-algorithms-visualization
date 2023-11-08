const insertionSortVisualization = async (arr, callback) => {
  const animations = [];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    let currentElement = arr[i];
    let j = i - 1;

    // Visualize comparison step
    animations.push({ type: "comparison", indices: [i, j] });

    while (j >= 0 && arr[j] > currentElement) {
      animations.push({ type: "swap", indices: [j + 1, j], values: [arr[j], currentElement] });
      animations.push({ type: "changeAppearance", indices: [j, j + 1], changeType: "comparison" });

      arr[j + 1] = arr[j];
      j--;

      if (j >= 0) {
        animations.push({ type: "comparison", indices: [i, j] });
      }
    }

    arr[j + 1] = currentElement;
  }

  for (let i = 0; i < animations.length; i++) {
    const animation = animations[i];
    if (animation.type === "comparison") {
      // eslint-disable-next-line
      const [index1, index2] = animation.indices;
      callback([...arr], i);
    } else if (animation.type === "swap") {
      const [index1, index2] = animation.indices;
      const [value1, value2] = animation.values;
      arr[index1] = value1;
      arr[index2] = value2;
      callback([...arr], i);
      await new Promise((resolve) => setTimeout(resolve, 100));
      // eslint-disable-next-line
    } else if (animation.type === "changeAppearance") {
      // eslint-disable-next-line
      const [index1, index2] = animation.indices;
      callback([...arr], i, animation.changeType);
    }
  }
  callback([...arr], animations.length);
};

export default insertionSortVisualization;
