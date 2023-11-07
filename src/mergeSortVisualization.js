const mergeSortVisualization = async (arr, callback) => {
  const animations = [];

  const merge = (arr, left, middle, right) => {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
      animations.push({ type: "comparison", indices: [left + i, left + i] });
    }
    for (let i = 0; i < n2; i++) {
      R[i] = arr[middle + 1 + i];
      animations.push({
        type: "comparison",
        indices: [middle + 1 + i, middle + 1 + i],
      });
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      animations.push({
        type: "comparison",
        indices: [left + i, middle + 1 + j],
      });
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        animations.push({ type: "overwrite", index: k, value: L[i] });
        i++;
      } else {
        arr[k] = R[j];
        animations.push({ type: "overwrite", index: k, value: R[j] });
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      animations.push({ type: "overwrite", index: k, value: L[i] });
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      animations.push({ type: "overwrite", index: k, value: R[j] });
      j++;
      k++;
    }
  };

  const mergeSort = (arr, left, right) => {
    if (left >= right) {
      return;
    }
    const middle = Math.floor((left + right) / 2);
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);
    merge(arr, left, middle, right);
  };

  mergeSort(arr, 0, arr.length - 1);

  for (const animation of animations) {
    if (animation.type === "comparison") {
      // Visualize comparison step
      // Highlight compared elements (e.g., change their color)
      // eslint-disable-next-line
      const [index] = animation.indices;
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

export default mergeSortVisualization;
