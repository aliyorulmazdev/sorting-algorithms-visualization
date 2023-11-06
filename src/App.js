import React, { useState } from "react";
import _ from "lodash";
import DataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import "./App.css";

function App() {
  // eslint-disable-next-line
  const [sortingTimes, setSortingTimes] = useState([]);
  const [averageSortingTime, setAverageSortingTime] = useState(null);
  const gridStyle = { minHeight: 550 };
  const generateRandomArrays = () => {
    // first value is how many arrays we test, second is array length.
    const arrays = Array.from({ length: 100 }, () =>
      _.shuffle(_.range(1, 100))
    );

    const bubbleSortTimes = arrays.map((array) => bubbleSort(array));
    const selectionSortTimes = arrays.map((array) => selectionSort(array));
    const quickSortTimes = arrays.map((array) => quickSort(array));
    const mergeSortTimes = arrays.map((array) => mergeSort(array));
    const heapSortTimes = arrays.map((array) => heapSort(array));
    const countingSortTimes = arrays.map((array) => countingSort(array));
    const radixSortTimes = arrays.map((array) => radixSort(array));
    const insertionSortTimes = arrays.map((array) => insertionSort(array));
    const shakerSortTimes = arrays.map((array) => shakerSort(array));
    const shellSortTimes = arrays.map((array) => shellSort(array));
    const bogoSortTimes = arrays.map((array) => bogoSort(array));
    const luckySortTimes = arrays.map((array) => luckySort(array));
    const stoogeSortTimes = arrays.map((array) => stoogeSort(array));
    const flashSortTimes = arrays.map((array) => flashSort(array));
    const combSortTimes = arrays.map((array) => combSort(array));
    const gnomeSortTimes = arrays.map((array) => gnomeSort(array));
    const permutationSortTimes = arrays.map((array) => permutationSort(array));
    const strandSortTimes = arrays.map((array) => strandSort(array));

    const averageBubbleSortTime =
      bubbleSortTimes.reduce((acc, time) => acc + time, 0) /
      bubbleSortTimes.length;
    const averageSelectionSortTime =
      selectionSortTimes.reduce((acc, time) => acc + time, 0) /
      selectionSortTimes.length;
    const averageQuickSortTime =
      quickSortTimes.reduce((acc, time) => acc + time, 0) /
      quickSortTimes.length;
    const averageMergeSortTime =
      mergeSortTimes.reduce((acc, time) => acc + time, 0) /
      mergeSortTimes.length;
    const averageHeapSortTime =
      heapSortTimes.reduce((acc, time) => acc + time, 0) / heapSortTimes.length;
    const averageCountingSortTime =
      countingSortTimes.reduce((acc, time) => acc + time, 0) /
      countingSortTimes.length;
    const averageRadixSortTime =
      radixSortTimes.reduce((acc, time) => acc + time, 0) /
      radixSortTimes.length;
    const averageInsertionSortTime =
      insertionSortTimes.reduce((acc, time) => acc + time, 0) /
      insertionSortTimes.length;
    const averageShakerSortTime =
      shakerSortTimes.reduce((acc, time) => acc + time, 0) /
      shakerSortTimes.length;
    const averageShellSortTime =
      shellSortTimes.reduce((acc, time) => acc + time, 0) /
      shellSortTimes.length;
    const averageBogoSortTime =
      bogoSortTimes.reduce((acc, time) => acc + time, 0) / bogoSortTimes.length;
    const averageLuckySortTime =
      luckySortTimes.reduce((acc, time) => acc + time, 0) /
      luckySortTimes.length;
    const averageStoogeSortTime =
      stoogeSortTimes.reduce((acc, time) => acc + time, 0) /
      stoogeSortTimes.length;
    const averageFlashSortTime =
      flashSortTimes.reduce((acc, time) => acc + time, 0) /
      flashSortTimes.length;
    const averageCombSortTime =
      combSortTimes.reduce((acc, time) => acc + time, 0) / combSortTimes.length;
    const averageGnomeSortTime =
      gnomeSortTimes.reduce((acc, time) => acc + time, 0) /
      combSortTimes.length;
    const averagePermutationSortTime =
      permutationSortTimes.reduce((acc, time) => acc + time, 0) /
      permutationSortTimes.length;
    const averageStrandSortTime =
      strandSortTimes.reduce((acc, time) => acc + time, 0) /
      strandSortTimes.length;

    setSortingTimes([
      ...bubbleSortTimes,
      ...selectionSortTimes,
      ...quickSortTimes,
      ...mergeSortTimes,
      ...heapSortTimes,
      ...countingSortTimes,
      ...radixSortTimes,
      ...insertionSortTimes,
      ...shakerSortTimes,
      ...shellSortTimes,
      ...bogoSortTimes,
      ...luckySortTimes,
      ...stoogeSortTimes,
      ...flashSortTimes,
      ...combSortTimes,
      ...gnomeSortTimes,
      ...permutationSortTimes,
      ...strandSortTimes,
    ]);
    setAverageSortingTime({
      bubbleSort: averageBubbleSortTime,
      selectionSort: averageSelectionSortTime,
      quickSort: averageQuickSortTime,
      mergeSort: averageMergeSortTime,
      heapSort: averageHeapSortTime,
      countingSort: averageCountingSortTime,
      radixSort: averageRadixSortTime,
      insertionSort: averageInsertionSortTime,
      shakerSort: averageShakerSortTime,
      shellSort: averageShellSortTime,
      bogoSort: averageBogoSortTime,
      luckySort: averageLuckySortTime,
      stoogeSort: averageStoogeSortTime,
      flashSort: averageFlashSortTime,
      combSort: averageCombSortTime,
      gnomeSort: averageGnomeSortTime,
      permutationSort: averagePermutationSortTime,
      strandSort: averageStrandSortTime,
    });
  };

  const permutationSort = (arr) => {
    const startTime = new Date().getTime();
    const n = arr.length;
    let isSorted = false;

    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          isSorted = false;
        }
      }
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const gnomeSort = (arr) => {
    const startTime = new Date().getTime();
    const n = arr.length;
    let index = 0;

    while (index < n) {
      if (index === 0) {
        index++;
      }

      if (arr[index] >= arr[index - 1]) {
        index++;
      } else {
        [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
        index--;
      }
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const combSort = (arr) => {
    const startTime = new Date().getTime();
    const n = arr.length;
    const shrinkFactor = 1.3; // Combsort'ta kullanılan katsayı

    let gap = n;
    let swapped = true;

    while (gap > 1 || swapped) {
      gap = Math.floor(gap / shrinkFactor);

      if (gap < 1) {
        gap = 1;
      }

      swapped = false;

      for (let i = 0; i < n - gap; i++) {
        if (arr[i] > arr[i + gap]) {
          [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
          swapped = true;
        }
      }
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const flashSort = (arr) => {
    const startTime = new Date().getTime();

    const n = arr.length;

    if (n <= 1) {
      const endTime = new Date().getTime();
      return endTime - startTime;
    }

    // En büyük ve en küçük değerleri bul
    let max = arr[0];
    let min = arr[0];

    for (let i = 1; i < n; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
      if (arr[i] < min) {
        min = arr[i];
      }
    }

    // Range ve bucket aralığını hesapla
    const range = max - min + 1;
    const bucketSize = Math.ceil(range / n);

    // Boş kovaların oluşturulması
    const buckets = new Array(n).fill(0);

    // Her elemanın kovaya atanması
    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
      buckets[bucketIndex]++;
    }

    // Kovaları güncelle (her kovadaki eleman sayısını bir sonraki kovaya ekler)
    for (let i = 1; i < n; i++) {
      buckets[i] += buckets[i - 1];
    }

    // Geçici bir dizi oluştur ve elemanları yerine koy
    const sortedArr = new Array(n);

    for (let i = 0; i < n; i++) {
      const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
      sortedArr[buckets[bucketIndex] - 1] = arr[i];
      buckets[bucketIndex]--;
    }

    // Sıralanmış diziyi orijinal dizinin yerine koy
    for (let i = 0; i < n; i++) {
      arr[i] = sortedArr[i];
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const stoogeSort = (arr) => {
    const startTime = new Date().getTime();
    stoogeSortRecursive(arr, 0, arr.length - 1);
    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const stoogeSortRecursive = (arr, l, h) => {
    if (l >= h) {
      return;
    }
    if (arr[l] > arr[h]) {
      [arr[l], arr[h]] = [arr[h], arr[l]];
    }
    if (h - l + 1 > 2) {
      const t = Math.floor((h - l + 1) / 3);
      stoogeSortRecursive(arr, l, h - t);
      stoogeSortRecursive(arr, l + t, h);
      stoogeSortRecursive(arr, l, h - t);
    }
  };

  const luckySort = (arr) => {
    const startTime = new Date().getTime();
    while (!isSorted(arr)) {
      shuffleArray(arr);
    }
    const endTime = new Date().getTime();
    return endTime - startTime;
  };
  const bogoSort = (arr) => {
    const startTime = new Date().getTime();
    while (!isSorted(arr)) {
      shuffleArray(arr);
    }
    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const isSorted = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    return true;
  };

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const shellSort = (arr) => {
    const startTime = new Date().getTime();
    const n = arr.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = arr[i];
        let j;
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }
        arr[j] = temp;
      }
    }
    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const shakerSort = (arr) => {
    const startTime = new Date().getTime();
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
      if (!swapped) break;
      swapped = false;
      for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const insertionSort = (arr) => {
    const startTime = new Date().getTime();
    for (let i = 1; i < arr.length; i++) {
      let currentElement = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = currentElement;
    }
    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const radixSort = (arr) => {
    const startTime = new Date().getTime();
    const maxNum = Math.max(...arr);
    const maxLength = maxNum.toString().length;

    for (let i = 0; i < maxLength; i++) {
      const buckets = Array.from({ length: 10 }, () => []);

      for (let j = 0; j < arr.length; j++) {
        const digit = getDigit(arr[j], i);
        buckets[digit].push(arr[j]);
      }

      arr = [].concat(...buckets);
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const getDigit = (num, place) => {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
  };

  const bubbleSort = (arr) => {
    const startTime = new Date().getTime();
    const n = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
        }
      }
    } while (swapped);

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const selectionSort = (arr) => {
    const startTime = new Date().getTime();

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const quickSort = (arr) => {
    const startTime = new Date().getTime();

    if (arr.length <= 1) {
      const endTime = new Date().getTime();
      return endTime - startTime;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === Math.floor(arr.length / 2)) {
        continue;
      }
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    const sortedLeftTime = quickSort(left);
    const sortedRightTime = quickSort(right);

    const endTime = new Date().getTime();
    return endTime - startTime + sortedLeftTime + sortedRightTime;
  };

  const mergeSort = (arr) => {
    const startTime = new Date().getTime();

    if (arr.length <= 1) {
      const endTime = new Date().getTime();
      return endTime - startTime;
    }

    // Diziyi ortadan ikiye bölelim
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // Sol ve sağ dizileri sıralayalım
    const sortedLeftTime = mergeSort(left);
    const sortedRightTime = mergeSort(right);

    // Sıralanmış dizileri birleştirelim
    merge(left, right);

    const endTime = new Date().getTime();
    return endTime - startTime + sortedLeftTime + sortedRightTime;
  };

  const merge = (left, right) => {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  };

  const heapSort = (arr) => {
    const startTime = new Date().getTime();

    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, i, arr.length);
    }

    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, 0, i);
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const heapify = (arr, index, heapSize) => {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < heapSize && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < heapSize && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== index) {
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      heapify(arr, largest, heapSize);
    }
  };

  const countingSort = (arr) => {
    const startTime = new Date().getTime();

    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;

    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }

    for (let i = 1; i < range; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
    }

    for (let i = 0; i < arr.length; i++) {
      arr[i] = output[i];
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const strandSort = (arr) => {
    const startTime = new Date().getTime();

    if (arr.length <= 1) {
      const endTime = new Date().getTime();
      return endTime - startTime;
    }

    let sublists = [];
    let currentSublist = [arr[0]];
    sublists.push(currentSublist);

    for (let i = 1; i < arr.length; i++) {
      const value = arr[i];

      let j = 0;
      let added = false;

      while (j < currentSublist.length) {
        if (value < currentSublist[j]) {
          currentSublist.splice(j, 0, value);
          added = true;
          break;
        }
        j++;
      }

      if (!added) {
        currentSublist.push(value);
      }
    }

    for (let i = 1; i < sublists.length; i++) {
      currentSublist = mergeLists(currentSublist, sublists[i]);
    }

    const endTime = new Date().getTime();
    return endTime - startTime;
  };

  const mergeLists = (list1, list2) => {
    const mergedList = [];
    let i = 0;
    let j = 0;

    while (i < list1.length && j < list2.length) {
      if (list1[i] < list2[j]) {
        mergedList.push(list1[i]);
        i++;
      } else {
        mergedList.push(list2[j]);
        j++;
      }
    }

    while (i < list1.length) {
      mergedList.push(list1[i]);
      i++;
    }

    while (j < list2.length) {
      mergedList.push(list2[j]);
      j++;
    }

    return mergedList;
  };

  // const columns = [
  //   { name: "arrayIndex", header: "Array Index", defaultFlex: 1 },
  //   { name: "sortingTime", header: "Sorting Time (ms)", defaultFlex: 1 },
  //   {
  //     name: "sortingType",
  //     header: "Sorting Type",
  //     defaultFlex: 1,
  //     defaultWidth: 120,
  //   },
  // ];

  // const dataSource = sortingTimes.map((time, index) => ({
  //   arrayIndex: index + 1,
  //   sortingTime: time > 0 ? time : "<1",
  //   sortingType:
  //     index < 30
  //       ? "Bubble Sort"
  //       : index < 60
  //       ? "Selection Sort"
  //       : index < 90
  //       ? "Quick Sort"
  //       : index < 120
  //       ? "Merge Sort"
  //       : index < 150
  //       ? "Heapsort"
  //       : index < 180
  //       ? "Counting Sort"
  //       : index < 210
  //       ? "Radix Sort"
  //       : index < 240
  //       ? "Insertion Sort"
  //       : index < 270
  //       ? "Shaker Sort"
  //       : index < 300
  //       ? "Shell Sort"
  //       : index < 330
  //       ? "Bogo Sort"
  //       : index < 360
  //       ? "Lucky Sort"
  //       : index < 390
  //       ? "Stooge Sort"
  //       : index < 420
  //       ? "Flash Sort"
  //       : index < 450
  //       ? "Comb Sort"
  //       : index < 480
  //       ? "Gnome Sort"
  //       : index < 510
  //       ? "Permutation Sort"
  //       : "Strand Sort"
  // }));

  const averageSortingTimes = averageSortingTime
    ? Object.keys(averageSortingTime).map((key) => ({
        sortingType: key,
        time: averageSortingTime[key],
      }))
    : [];

  const averageSortingColumns = [
    { name: "sortingType", header: "Sorting Type", defaultFlex: 1 },
    { name: "time", header: "Time (ms)", defaultFlex: 1 },
  ];

  return (
    <div className="App">
      <h1 className="main-heading">Sorting Algorithms Visualization</h1>
      <button className="generate-button" onClick={generateRandomArrays}>
        Generate Random Arrays
      </button>
      {averageSortingTime !== null && (
        <div>
          <h2 className="sub-heading">Average Sorting Times (ms)</h2>
          <p className="description">
            The results represent the average sorting times (in milliseconds) of
            "100" arrays, each containing "100" randomly generated numbers.
          </p>
          <DataGrid
            idProperty="sortingType"
            columns={averageSortingColumns}
            dataSource={averageSortingTimes}
            style={gridStyle}
            className="custom-data-grid"
          />
        </div>
      )}
      <button
        className="generate-button"
        color="info"
        onClick={() =>
          window.open("https://www.linkedin.com/in/ali-yorulmaz-1a67a518a/")
        }
      >
        LinkedIn
      </button>
      <button
        className="generate-button"
        onClick={() => window.open("https://github.com/aliyorulmazdev")}
      >
        GitHub
      </button>
      <button
        className="generate-button"
        onClick={() => window.open("https://instagram.com/kuprag_ali")}
      >
        Instagram
      </button>
      {/* Will implement search and other components */}
    </div>
  );
}

export default App;
