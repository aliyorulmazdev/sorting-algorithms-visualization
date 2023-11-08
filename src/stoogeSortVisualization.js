const stoogeSortVisualization = async (arr, callback) => {
  const animations = [];
  await stoogeSort(arr, 0, arr.length - 1, animations, callback);
};

const stoogeSort = async (arr, left, right, animations, callback) => {
  if (arr[right] < arr[left]) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    animations.push({
      type: "swap",
      indices: [left, right],
      values: [arr[right], arr[left]],
    });
    callback([...arr], animations.length);
    await new Promise((resolve) => setTimeout(resolve, 1));
  }

  const length = right - left + 1;
  if (length > 2) {
    const third = Math.floor(length / 3);
    await stoogeSort(arr, left, right - third, animations, callback);
    await stoogeSort(arr, left + third, right, animations, callback);
    await stoogeSort(arr, left, right - third, animations, callback);
  }
  // Hızlandırılmış animasyon için bekleme süresini azalt
  await new Promise((resolve) => setTimeout(resolve, 1));
};

export default stoogeSortVisualization;
