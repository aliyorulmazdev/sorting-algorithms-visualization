import React, { useEffect, useState } from "react";
import _ from "lodash";
import Modal from "react-modal";
import mergeSortVisualization from "./mergeSortVisualization";
import heapSortVisualization from "./heapSortVisualization";
import bubbleSortVisualization from "./bubbleSortVisualization";
import quickSortVisualization from "./quickSortVisualization";
import DataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import "./App.css";
import selectionSortVisualization from "./selectionSortVisualization";
import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";

function App() {
  // eslint-disable-next-line
  const [sortingTimes, setSortingTimes] = useState([]);
  const [averageSortingTime, setAverageSortingTime] = useState(null);
  const [showMergeSortModal, setShowMergeSortModal] = useState(false);
  const [showHeapSortModal, setShowHeapSortModal] = useState(false);
  const [showBubbleSortModal, setShowBubbleSortModal] = useState(false);
  const [showSelectionSortModal, setShowSelectionSortModal] = useState(false);
  const [showQuickSortModal, setShowQuickSortModal] = useState(false);
  const [mergeSortArray, setMergeSortArray] = useState([]);
  const [heapSortArray, setHeapSortArray] = useState([]);
  const [bubbleSortArray, setBubbleSortArray] = useState([]);
  const [selectionSortArray, setSelectionSortArray] = useState([]);
  const [quickSortArray, setQuickSortArray] = useState([]);
  // eslint-disable-next-line
  const [isSorting, setIsSorting] = useState(false);
  const gridStyle = { minHeight: 550 };

  const startHeapSortVisualization = () => {
    setShowHeapSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    heapSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setHeapSortArray(sortedArray);
    });
  };

  const startBubbleSortVisualization = () => {
    setShowBubbleSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    bubbleSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setBubbleSortArray(sortedArray);
    });
  };

  const startMergeSortVisualization = () => {
    setShowMergeSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    mergeSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setMergeSortArray(sortedArray);
    });
  };

  const startSelectionSortVisualization = () => {
    setShowSelectionSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    selectionSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setSelectionSortArray(sortedArray);
    });
  };

  const startQuickSortVisualization = () => {
    setShowQuickSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    quickSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setQuickSortArray(sortedArray);
    });
  };

  const generateRandomArray = () => {
    const array = Array.from(
      { length: 100 },
      () => Math.floor(Math.random() * 100) + 1
    );
    return _.shuffle(array);
  };

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

  useEffect(() => {
    generateRandomArrays();
    // eslint-disable-next-line
  }, []);

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
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={generateRandomArrays} startIcon={<SpeedIcon />}>
          reTest Sort Algorithms
        </Button>
      </ButtonGroup>
      <Divider variant="middle" />
      <ButtonGroup
        variant="text"
        color="secondary"
        aria-label="text button group"
        style={{ marginTop: "10px" }}
      >
        <Button onClick={startMergeSortVisualization}>
          Merge Sort Visualization
        </Button>
        <Button onClick={startHeapSortVisualization}>
          Heap Sort Visualization
        </Button>
        <Button onClick={startBubbleSortVisualization}>
          Bubble Sort Visualization
        </Button>
        <Button onClick={startSelectionSortVisualization}>
          Selection Sort Visualization
        </Button>
        <Button onClick={startQuickSortVisualization}>
          Quick Sort Visualization
        </Button>
      </ButtonGroup>
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
      <Divider variant="middle" />
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        style={{ marginTop: "10px" }}
      >
        <Button
          color="info"
          onClick={() =>
            window.open("https://www.linkedin.com/in/ali-yorulmaz-1a67a518a/")
          }
        >
          LinkedIn
        </Button>
        <Button
          onClick={() => window.open("https://github.com/aliyorulmazdev")}
        >
          GitHub
        </Button>
        <Button onClick={() => window.open("https://instagram.com/kuprag_ali")}>
          Instagram
        </Button>
      </ButtonGroup>
      <Modal
        isOpen={showMergeSortModal}
        onRequestClose={() => setShowMergeSortModal(false)}
        contentLabel="Merge Sort Visualization"
      >
        <Typography variant="h3">What is Merge Sort:</Typography>
        <Typography variant="body1">
          Merge Sort is another widely used "divide and conquer" algorithm among
          sorting algorithms. This algorithm relies on the logic of breaking a
          given array into smaller sub-arrays and then merging these sub-arrays
          in a sorted manner. The basic operation of Merge Sort involves the
          following steps: First, the input array is divided into two equal
          parts. Each of the two sub-arrays is sorted using the same Merge Sort
          algorithm. Then, in the merging step, these two sorted sub-arrays are
          combined into a single sorted array. An important advantage of Merge
          Sort is its time complexity of O(n * log(n)), making it a fast sorting
          algorithm. Additionally, Merge Sort ensures reliable sorting in any
          situation. It is a stable sorting algorithm that performs excellently
          on large data sets. Moreover, this algorithm is preferred in
          applications that require external memory sorting or parallel sorting.
        </Typography>

        <div className="array-visualization">
          {mergeSortArray.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value * 3}px` }}
            >
              <div className="array-bar-label">{value}</div>
            </div>
          ))}
        </div>
      </Modal>
      {/* Heap Sort Modal */}
      <Modal
        isOpen={showHeapSortModal}
        onRequestClose={() => setShowHeapSortModal(false)}
        contentLabel="Heap Sort Visualization"
      >
        <Typography variant="h3">What is Heapsort:</Typography>
        <Typography variant="body1">
          Heapsort is an efficient sorting algorithm with a constant amount of
          additional memory usage. This algorithm operates using a "heapify"
          process and requires very little extra memory during the sorting
          process. The basic operation of Heapsort involves the following steps:
          Firstly, the input array is transformed into a sorted binary heap data
          structure. This heap structure holds the largest or smallest element
          at the root node. Next, the root element is removed and placed at the
          end of the sorted array. This process is repeated by reducing the size
          of the array from the end. When this process is complete, the entire
          array is sorted. Heapsort is a fast sorting algorithm with a time
          complexity of O(n * log(n)). Its advantage also lies in its constant
          memory usage, which can be beneficial, particularly in systems with
          limited memory or embedded systems. Heapsort is typically considered
          an in-place sorting algorithm and is stable. Therefore, it is a
          preferred choice for applications that require sorting large datasets
          or involve external memory usage.
        </Typography>

        <div className="array-visualization">
          {heapSortArray.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value * 3}px` }}
            >
              <div className="array-bar-label">{value}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showBubbleSortModal}
        onRequestClose={() => setShowBubbleSortModal(false)}
        contentLabel="Bubble Sort Visualization"
      >
        <Typography variant="h3">What is Bubble Sort:</Typography>
        <Typography variant="body1">
          Bubble Sort is one of the simplest sorting algorithms among sorting
          algorithms. Its basic idea is to traverse an array by comparing
          consecutive elements and arranging them in order. If two consecutive
          elements are out of order, they swap places, and the process is
          repeated until the end of the array. Bubble Sort gets its name because
          in each pass, the largest element "bubbles up" to the end of the
          array. With each pass, the largest unsorted element moves to its
          correct position. However, Bubble Sort has a time complexity of O(n^2)
          in the best, worst, and average cases, making it inefficient for large
          datasets. Other sorting algorithms provide faster results.
          Nevertheless, Bubble Sort can be useful for educational purposes or
          when sorting small datasets. It can also perform better in cases where
          the array is nearly sorted. Bubble Sort is a stable sorting algorithm
          that performs in-place sorting, meaning it uses minimal additional
          memory and doesn't change the original data.
        </Typography>

        <div className="array-visualization">
          {bubbleSortArray.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value * 3}px` }}
            >
              <div className="array-bar-label">{value}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showSelectionSortModal}
        onRequestClose={() => setShowSelectionSortModal(false)}
        contentLabel="Selection Sort Visualization"
      >
        <Typography variant="h3">What is Selection Sort:</Typography>
        <Typography variant="body1">
          Selection Sort is a simple and efficient sorting algorithm among
          sorting algorithms. Its fundamental idea is to traverse an array by
          comparing consecutive elements and selecting the smallest (or largest)
          element to move it to the beginning of the array. In each pass, it
          finds the smallest (or largest) element in the array and swaps it with
          the element at the beginning of the array. This process continues from
          the beginning to the end of the array, and the sorted portion of the
          array gradually increases. Selection Sort has a time complexity of
          O(n^2) in the best, worst, and average cases, making it inefficient
          for large datasets. However, it uses minimal additional memory and
          performs an in-place sort. Selection Sort is suitable for relatively
          small datasets or for educational purposes when learning about sorting
          algorithms. For large datasets, faster sorting algorithms are
          preferred.
        </Typography>

        <div className="array-visualization">
          {selectionSortArray.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value * 3}px` }}
            >
              <div className="array-bar-label">{value}</div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showQuickSortModal}
        onRequestClose={() => setShowQuickSortModal(false)}
        contentLabel="Quick Sort Visualization"
      >
        <Typography variant="h3">What is Quick Sort:</Typography>
        <Typography variant="body1">
          Quick Sort is a fast and efficient sorting algorithm that is widely
          used. This algorithm is based on the "divide and conquer" strategy.
          Quick Sort sorts an array by dividing it. During the process, a pivot
          element is selected, and on its left, you gather all elements smaller
          than the pivot element, while on its right, you gather all elements
          greater than the pivot element. The basic operation of Quick Sort
          follows these steps: First, a pivot element is selected, determining
          which element of the array will serve as the pivot. Elements smaller
          than the pivot are collected on its left, and elements greater than
          the pivot are collected on its right. Sorting is applied recursively
          to these two sub-arrays. In other words, these sub-arrays also select
          and divide with a pivot element in the same way. Once the sub-arrays
          are sorted, they are merged to complete the process. Quick Sort is
          generally considered a fast sorting algorithm because it has a time
          complexity of n*log(n) even in the worst-case scenario. However, the
          performance can be influenced by the choice of the pivot element,
          which is essential to achieve the best results. Quick Sort is
          available in many programming languages and is included in various
          sorting libraries. It can be an ideal choice for quickly sorting large
          datasets.
        </Typography>

        <div className="array-visualization">
          {quickSortArray.map((value, index) => (
            <div
              key={index}
              className="array-bar"
              style={{ height: `${value * 3}px` }}
            >
              <div className="array-bar-label">{value}</div>
            </div>
          ))}
        </div>
      </Modal>
      {/* Will implement search and other components */}
    </div>
  );
}

export default App;
