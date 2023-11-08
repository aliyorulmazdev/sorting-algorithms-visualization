const mergeSortVisualization = async (arr, callback) => {
  const animations = [];
  const shuffledArr = [...arr];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
  }

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

  mergeSort(shuffledArr, 0, shuffledArr.length - 1);
  for (const animation of animations) {
    const { type, indices, index, value } = animation;
  
    if (type === "comparison") {
      const comparisonColor = `hsl(0, 100%, 50%)`; // Karşılaştırma için kırmızı
      callback([...arr], { comparisonIndices: indices, comparisonColor: comparisonColor });
    } else if (type === "overwrite") {
      arr[index] = value;
      const color = `hsl(240, 100%, 50%)`; // Mavi tonları kullan
      callback([...arr], { overwriteIndex: index, color: color });
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  }

  callback([...arr], { sorted: true });
};

export default mergeSortVisualization;
