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
import countingSortVisualization from "./countingSortVisualization";
import radixSortVisualization from "./radixSortVisualization";
import insertionSortVisualization from "./insertionSortVisualization";
import shakerSortVisualization from "./shakerSortVisualization";
import shellSortVisualization from "./shellSortVisualization";
import flashSortVisualization from "./flashSortVisualization";
import stoogeSortVisualization from "./stoogeSortVisualization";
import combSortVisualization from "./combSortVisualization";
import gnomeSortVisualization from "./gnomeSortVisulization";
import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import SpeedIcon from "@mui/icons-material/Speed";
import MergeIcon from "@mui/icons-material/Merge";
import MemoryIcon from "@mui/icons-material/Memory";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import TerminalIcon from "@mui/icons-material/Terminal";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CategoryIcon from "@mui/icons-material/Category";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { blue } from "@mui/material/colors";

function App() {
  // eslint-disable-next-line
  const [sortingTimes, setSortingTimes] = useState([]);
  const [averageSortingTime, setAverageSortingTime] = useState(null);
  const [showMergeSortModal, setShowMergeSortModal] = useState(false);
  const [showHeapSortModal, setShowHeapSortModal] = useState(false);
  const [showBubbleSortModal, setShowBubbleSortModal] = useState(false);
  const [showSelectionSortModal, setShowSelectionSortModal] = useState(false);
  const [showQuickSortModal, setShowQuickSortModal] = useState(false);
  const [showCountingSortModal, setShowCountingSortModal] = useState(false);
  const [showRadixSortModal, setShowRadixSortModal] = useState(false);
  const [showInsertionSortModal, setShowInsertionSortModal] = useState(false);
  const [showShakerSortModal, setShowShakerSortModal] = useState(false);
  const [showShellSortModal, setShowShellSortModal] = useState(false);
  const [showFlashSortModal, setShowFlashSortModal] = useState(false);
  const [showStoogeSortModal, setShowStoogeSortModal] = useState(false);
  const [showCombSortModal, setShowCombSortModal] = useState(false);
  const [showGnomeSortModal, setShowGnomeSortModal] = useState(false);
  const [mergeSortArray, setMergeSortArray] = useState([]);
  const [heapSortArray, setHeapSortArray] = useState([]);
  const [bubbleSortArray, setBubbleSortArray] = useState([]);
  const [selectionSortArray, setSelectionSortArray] = useState([]);
  const [quickSortArray, setQuickSortArray] = useState([]);
  const [countingSortArray, setCountingSortArray] = useState([]);
  const [radixSortArray, setRadixSortArray] = useState([]);
  const [InsertionSortArray, setInsertionSortArray] = useState([]);
  const [shakerSortArray, setShakerSortArray] = useState([]);
  const [shellSortArray, setShellSortArray] = useState([]);
  const [flashSortArray, setFlashSortArray] = useState([]);
  const [stoogeSortArray, setStoogeSortArray] = useState([]);
  const [combSortArray, setCombSortArray] = useState([]);
  const [gnomeSortArray, setGnomeSortArray] = useState([]);
  // eslint-disable-next-line
  const [isSorting, setIsSorting] = useState(false);
  const gridStyle = { minHeight: 550, marginTop: "10px" };

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

  const startCountingSortVisualization = () => {
    setShowCountingSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    countingSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setCountingSortArray(sortedArray);
    });
  };

  const startRadixSortVisualization = () => {
    setShowRadixSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    radixSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setRadixSortArray(sortedArray);
    });
  };

  const startInsertionSortVisualization = () => {
    setShowInsertionSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    insertionSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setInsertionSortArray(sortedArray);
    });
  };

  const startShakerSortVisualization = () => {
    setShowShakerSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    shakerSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setShakerSortArray(sortedArray);
    });
  };

  const startShellSortVisualization = () => {
    setShowShellSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    shellSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setShellSortArray(sortedArray);
    });
  };

  const startFlashSortVisualization = () => {
    setShowFlashSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    flashSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setFlashSortArray(sortedArray);
    });
  };

  const startStoogeSortVisualization = () => {
    setShowStoogeSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    stoogeSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setStoogeSortArray(sortedArray);
    });
  };
  const startCombSortVisualization = () => {
    setShowCombSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    combSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setCombSortArray(sortedArray);
    });
  };

  const startGnomeSortVisualization = () => {
    setShowGnomeSortModal(true);
    setIsSorting(true);
    const randomArray = generateRandomArray();
    gnomeSortVisualization([...randomArray], (sortedArray) => {
      setIsSorting(false);
      setGnomeSortArray(sortedArray);
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

  function playAudio() {
    const audio = document.getElementById("mergeSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudio() {
    const audio = document.getElementById("mergeSortAudio");
    if (audio) {
      audio.pause();
    }
  }

  function playAudioHeap() {
    const audio = document.getElementById("heapSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudioHeap() {
    const audio = document.getElementById("heapSortAudio");
    if (audio) {
      audio.pause();
    }
  }

  function playAudioBubble() {
    const audio = document.getElementById("bubbleSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudioBubble() {
    const audio = document.getElementById("bubbleSortAudio");
    if (audio) {
      audio.pause();
    }
  }

  function playAudioSelection() {
    const audio = document.getElementById("selectionSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudioSelection() {
    const audio = document.getElementById("selectionSortAudio");
    if (audio) {
      audio.pause();
    }
  }

  function playAudioQuick() {
    const audio = document.getElementById("quickSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudioQuick() {
    const audio = document.getElementById("quickSortAudio");
    if (audio) {
      audio.pause();
    }
  }

  function playAudioRadix() {
    const audio = document.getElementById("radixSortAudio");
    if (audio) {
      audio.play();
    }
  }

  function pauseAudioRadix() {
    const audio = document.getElementById("radixSortAudio");
    if (audio) {
      audio.pause();
    }
  }

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
      <Typography
        variant="h3"
        style={{ marginTop: "40px", fontFamily: "monospace" }}
      >
        Sorting Algorithms Visualization
      </Typography>
      <Divider variant="middle" style={{ marginTop: "40px" }} />
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={generateRandomArrays} startIcon={<SpeedIcon />}>
          reTest Sort Algorithm Scores
        </Button>
      </ButtonGroup>
      <Divider variant="middle" />
      <div>
        <ButtonGroup
          variant="text"
          color="secondary"
          aria-label="text button group"
          style={{ marginTop: "10px" }}
        >
          <Button
            onClick={startMergeSortVisualization}
            startIcon={<MergeIcon />}
          >
            Merge Sort Visualization
          </Button>
          <Button
            onClick={startHeapSortVisualization}
            startIcon={<MemoryIcon />}
          >
            Heap Sort Visualization
          </Button>
          <Button
            onClick={startBubbleSortVisualization}
            startIcon={<BubbleChartIcon />}
          >
            Bubble Sort Visualization
          </Button>
          <Button
            onClick={startSelectionSortVisualization}
            startIcon={<SelectAllIcon />}
          >
            Selection Sort Visualization
          </Button>
          <Button
            onClick={startQuickSortVisualization}
            startIcon={<FastForwardIcon />}
          >
            Quick Sort Visualization
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ButtonGroup
          variant="text"
          color="secondary"
          aria-label="text button group"
          style={{ marginTop: "10px" }}
        >
          <Button
            onClick={startCountingSortVisualization}
            startIcon={<LooksOneIcon />}
            disabled
          >
            Counting Sort Visualization
          </Button>
          <Button
            onClick={startRadixSortVisualization}
            startIcon={<ArrowUpwardIcon />}
          >
            Radix Sort Visualization
          </Button>
          <Button
            onClick={startInsertionSortVisualization}
            startIcon={<DoubleArrowIcon />}
          >
            Insertion Sort Visualization
          </Button>
          <Button
            onClick={startShakerSortVisualization}
            startIcon={<ShuffleOnIcon />}
          >
            Shaker Sort Visualization
          </Button>
          <Button
            onClick={startShellSortVisualization}
            startIcon={<TerminalIcon />}
          >
            Shell Sort Visualization
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <ButtonGroup
          variant="text"
          color="secondary"
          aria-label="text button group"
          style={{ marginTop: "10px" }}
        >
          <Button
            onClick={startFlashSortVisualization}
            startIcon={<OfflineBoltIcon />}
          >
            Flash Sort Visualization
          </Button>

          <Button
            onClick={startStoogeSortVisualization}
            startIcon={<EmojiEmotionsIcon />}
          >
            Stooge Sort Visualization
          </Button>

          <Button
            onClick={startCombSortVisualization}
            startIcon={<CategoryIcon />}
          >
            Comb Sort Visualization
          </Button>

          <Button
            onClick={startGnomeSortVisualization}
            startIcon={<ViewQuiltIcon />}
          >
            Gnome Sort Visualization
          </Button>
        </ButtonGroup>
      </div>

      <Divider
        variant="middle"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      />
      {averageSortingTime !== null && (
        <>
          <Typography variant="h5">Average Sorting Times (ms)</Typography>
          <Typography variant="body1">
            The results represent the average sorting times (in milliseconds) of
            "100" arrays, each containing "100" randomly generated numbers.
          </Typography>
          <DataGrid
            idProperty="sortingType"
            columns={averageSortingColumns}
            dataSource={averageSortingTimes}
            style={gridStyle}
            className="custom-data-grid"
          />
        </>
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
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Merge Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <MergeIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="mergeSortAudio" src="/mergesort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudio}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudio}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Merge Sort is another widely used "divide and conquer" algorithm
              among sorting algorithms. This algorithm relies on the logic of
              breaking a given array into smaller sub-arrays and then merging
              these sub-arrays in a sorted manner. The basic operation of Merge
              Sort involves the following steps: First, the input array is
              divided into two equal parts. Each of the two sub-arrays is sorted
              using the same Merge Sort algorithm. Then, in the merging step,
              these two sorted sub-arrays are combined into a single sorted
              array. An important advantage of Merge Sort is its time complexity
              of O(n * log(n)), making it a fast sorting algorithm.
              Additionally, Merge Sort ensures reliable sorting in any
              situation. It is a stable sorting algorithm that performs
              excellently on large data sets. Moreover, this algorithm is
              preferred in applications that require external memory sorting or
              parallel sorting.
            </Typography>
          </CardContent>
        </Card>
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
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Heapsort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <MemoryIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="heapSortAudio" src="/heapsort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudioHeap}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudioHeap}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Heapsort is an efficient sorting algorithm with a constant amount
              of additional memory usage. This algorithm operates using a
              "heapify" process and requires very little extra memory during the
              sorting process. The basic operation of Heapsort involves the
              following steps: Firstly, the input array is transformed into a
              sorted binary heap data structure. This heap structure holds the
              largest or smallest element at the root node. Next, the root
              element is removed and placed at the end of the sorted array. This
              process is repeated by reducing the size of the array from the
              end. When this process is complete, the entire array is sorted.
              Heapsort is a fast sorting algorithm with a time complexity of O(n
              * log(n)). Its advantage also lies in its constant memory usage,
              which can be beneficial, particularly in systems with limited
              memory or embedded systems. Heapsort is typically considered an
              in-place sorting algorithm and is stable. Therefore, it is a
              preferred choice for applications that require sorting large
              datasets or involve external memory usage.
            </Typography>
          </CardContent>
        </Card>

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
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload();
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Bubble Sort:"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <BubbleChartIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="bubbleSortAudio" src="/bubblesort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudioBubble}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudioBubble}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Bubble Sort is one of the simplest sorting algorithms among
              sorting algorithms. Its basic idea is to traverse an array by
              comparing consecutive elements and arranging them in order. If two
              consecutive elements are out of order, they swap places, and the
              process is repeated until the end of the array. Bubble Sort gets
              its name because in each pass, the largest element "bubbles up" to
              the end of the array. With each pass, the largest unsorted element
              moves to its correct position. However, Bubble Sort has a time
              complexity of O(n^2) in the best, worst, and average cases, making
              it inefficient for large datasets. Other sorting algorithms
              provide faster results. Nevertheless, Bubble Sort can be useful
              for educational purposes or when sorting small datasets. It can
              also perform better in cases where the array is nearly sorted.
              Bubble Sort is a stable sorting algorithm that performs in-place
              sorting, meaning it uses minimal additional memory and doesn't
              change the original data.
            </Typography>
          </CardContent>
        </Card>

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
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload();
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Selection Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <SelectAllIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="selectionSortAudio" src="/selectionsort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudioSelection}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudioSelection}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Selection Sort is a simple and efficient sorting algorithm among
              sorting algorithms. Its fundamental idea is to traverse an array
              by comparing consecutive elements and selecting the smallest (or
              largest) element to move it to the beginning of the array. In each
              pass, it finds the smallest (or largest) element in the array and
              swaps it with the element at the beginning of the array. This
              process continues from the beginning to the end of the array, and
              the sorted portion of the array gradually increases. Selection
              Sort has a time complexity of O(n^2) in the best, worst, and
              average cases, making it inefficient for large datasets. However,
              it uses minimal additional memory and performs an in-place sort.
              Selection Sort is suitable for relatively small datasets or for
              educational purposes when learning about sorting algorithms. For
              large datasets, faster sorting algorithms are preferred.
            </Typography>
          </CardContent>
        </Card>

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
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Quick Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <FastForwardIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="quickSortAudio" src="/quicksort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudioQuick}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudioQuick}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Quick Sort is a fast and efficient sorting algorithm that is
              widely used. This algorithm is based on the "divide and conquer"
              strategy. Quick Sort sorts an array by dividing it. During the
              process, a pivot element is selected, and on its left, you gather
              all elements smaller than the pivot element, while on its right,
              you gather all elements greater than the pivot element. The basic
              operation of Quick Sort follows these steps: First, a pivot
              element is selected, determining which element of the array will
              serve as the pivot. Elements smaller than the pivot are collected
              on its left, and elements greater than the pivot are collected on
              its right. Sorting is applied recursively to these two sub-arrays.
              In other words, these sub-arrays also select and divide with a
              pivot element in the same way. Once the sub-arrays are sorted,
              they are merged to complete the process. Quick Sort is generally
              considered a fast sorting algorithm because it has a time
              complexity of n*log(n) even in the worst-case scenario. However,
              the performance can be influenced by the choice of the pivot
              element, which is essential to achieve the best results. Quick
              Sort is available in many programming languages and is included in
              various sorting libraries. It can be an ideal choice for quickly
              sorting large datasets.
            </Typography>
          </CardContent>
        </Card>

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
      <Modal
        isOpen={showCountingSortModal}
        onRequestClose={() => setShowCountingSortModal(false)}
        contentLabel="Counting Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Counting Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <LooksOneIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Counting Sort is a simple and efficient sorting algorithm that
              works well when sorting a limited range of non-negative integers.
              It counts the occurrences of each element, which helps it place
              the elements in their correct positions in linear time complexity
              O(n), making it suitable for specific use cases where its
              assumptions are met. However, it may not perform efficiently for
              datasets with a wide range of values or floating-point numbers.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {countingSortArray.map((value, index) => (
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
        isOpen={showRadixSortModal}
        onRequestClose={() => setShowRadixSortModal(false)}
        contentLabel="Radix Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Radix Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <ArrowUpwardIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <audio id="radixSortAudio" src="/radixsort.wav"></audio>
          <div>
            <IconButton aria-label="Play" onClick={playAudioRadix}>
              <PlayArrowIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
            <IconButton aria-label="Pause" onClick={pauseAudioRadix}>
              <PauseIcon sx={{ height: 50, width: 50 }} />
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Radix Sort is an efficient sorting algorithm for integers with a
              known maximum number of digits. It distributes elements into
              buckets based on each digit's value and processes from the least
              significant digit (LSD) to the most significant digit (MSD). Radix
              Sort has a time complexity of O(k * n), where "k" is the number of
              digits, and "n" is the number of elements. It's most effective
              when "k" is relatively small and constant. For larger "k," other
              sorting algorithms like Quick Sort or Merge Sort may be preferred.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {radixSortArray.map((value, index) => (
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
        isOpen={showInsertionSortModal}
        onRequestClose={() => {
          setShowInsertionSortModal(false);
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Insertion Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Insertion Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <DoubleArrowIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Insertion Sort is a simple and straightforward sorting algorithm
              that works efficiently for relatively small datasets. It
              repeatedly takes an element from the unsorted part of the array
              and places it in its correct position within the sorted part of
              the array. It's like sorting a hand of playing cards where you
              insert each card into its proper place as you go. The time
              complexity of Insertion Sort is O(n^2) in the worst and average
              cases, making it less efficient for large datasets. However, for
              small datasets, it can outperform more complex sorting algorithms
              due to its simplicity and low overhead. Insertion Sort is
              particularly useful when the array is nearly sorted, as it
              requires fewer comparisons and swaps in such cases. It's also an
              in-place sorting algorithm, which means it sorts the array without
              requiring additional memory. For larger datasets or scenarios
              where time efficiency is crucial, faster sorting algorithms like
              Quick Sort or Merge Sort are generally preferred due to their more
              favorable time complexity.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {InsertionSortArray.map((value, index) => (
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
        isOpen={showShakerSortModal}
        onRequestClose={() => {
          setShowShakerSortModal(false);
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Shaker Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShakerSortModal(false);
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Shaker Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <ShuffleOnIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Shaker Sort is a simple and straightforward sorting algorithm that
              works efficiently for relatively small datasets. It repeatedly
              takes an element from the unsorted part of the array and places it
              in its correct position within the sorted part of the array. It's
              like sorting a hand of playing cards where you insert each card
              into its proper place as you go. The time complexity of Shaker
              Sort is O(n^2) in the worst and average cases, making it less
              efficient for large datasets. However, for small datasets, it can
              outperform more complex sorting algorithms due to its simplicity
              and low overhead. Shaker Sort is particularly useful when the
              array is nearly sorted, as it requires fewer comparisons and swaps
              in such cases. It's also an in-place sorting algorithm, which
              means it sorts the array without requiring additional memory. For
              larger datasets or scenarios where time efficiency is crucial,
              faster sorting algorithms like Quick Sort or Merge Sort are
              generally preferred due to their more favorable time complexity.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {shakerSortArray.map((value, index) => (
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
        isOpen={showShellSortModal}
        onRequestClose={() => {
          setShowShakerSortModal(false);
          window.location.reload();
        }}
        contentLabel="Shell Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            setShowShellSortModal(false);
            window.location.reload();
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Shell Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <TerminalIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Shell Sort is an efficient sorting algorithm that works well for
              relatively small datasets. It's an extension of the Insertion Sort
              algorithm, designed to improve its performance by sorting elements
              at varying intervals. Shell Sort repeatedly divides the list into
              smaller sublists and sorts them independently using an insertion
              sort. The unique feature of Shell Sort is that it gradually
              reduces the interval between elements to be compared and swapped,
              which leads to a more efficient sorting process. The time
              complexity of Shell Sort depends on the chosen sequence of
              intervals but is generally better than O(n^2) for the worst and
              average cases, making it suitable for moderate-sized datasets. In
              situations where you have large datasets, more advanced sorting
              algorithms like Quick Sort or Merge Sort are preferred for their
              better time complexity. However, Shell Sort's simplicity and low
              overhead make it a viable choice for small to medium-sized
              datasets. It's also an in-place sorting algorithm, which means it
              sorts the array without requiring additional memory.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {shellSortArray.map((value, index) => (
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
        isOpen={showFlashSortModal}
        onRequestClose={() => {
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Flash Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Flash Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <OfflineBoltIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Flash Sort is an efficient sorting algorithm for relatively small
              datasets. It works by dividing the list into smaller sublists and
              independently sorting them using insertion sort. Flash Sort
              reduces the interval between elements to be compared, resulting in
              a more efficient sorting process. Its time complexity depends on
              the chosen interval sequence but is generally better than O(n^2)
              for worst and average cases. This makes it suitable for
              moderate-sized datasets. Flash Sort is an in-place sorting
              algorithm, meaning it sorts the array without requiring additional
              memory.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {flashSortArray.map((value, index) => (
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
        isOpen={showStoogeSortModal}
        onRequestClose={() => {
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Stooge Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Stooge Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <EmojiEmotionsIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Stooge Sort is a relatively inefficient sorting algorithm that
              works by dividing the list into three parts, recursively sorting
              the first two-thirds and the last two-thirds, and then recursively
              sorting the first two-thirds again. Its time complexity is less
              efficient than more popular sorting algorithms, making it suitable
              mainly for educational or illustrative purposes rather than
              practical use. Stooge Sort is an in-place sorting algorithm,
              meaning it doesn't require additional memory to sort the array.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {stoogeSortArray.map((value, index) => (
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
        isOpen={showCombSortModal}
        onRequestClose={() => {
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Comb Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Comb Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <CategoryIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Combsort is an improvement over the Bubble Sort algorithm. It
              reduces the amount of time spent comparing and swapping elements
              by gradually decreasing the gap between elements compared. This
              results in a more efficient sorting process compared to Bubble
              Sort. Combsort's time complexity depends on the gap sequence used,
              but it generally performs better than O(n^2) for the worst and
              average cases. This makes Combsort suitable for sorting
              moderate-sized datasets. It is an in-place sorting algorithm,
              meaning it sorts the array without requiring additional memory.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {combSortArray.map((value, index) => (
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
        isOpen={showGnomeSortModal}
        onRequestClose={() => {
          window.location.reload(); // Sayfayı yenile
        }}
        contentLabel="Gnome Sort Visualization"
      >
        <button
          className="modal-close-button"
          onClick={() => {
            window.location.reload(); // Sayfayı yenile
          }}
        >
          Close
        </button>
        <Card>
          <CardHeader
            title="What is Gnome Sort"
            avatar={
              <Avatar sx={{ bgcolor: blue[500], width: 50, height: 50 }}>
                <ViewQuiltIcon sx={{ fontSize: 40 }} />
              </Avatar>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Gnome Sort is an improvement over the Bubble Sort algorithm. It
              optimizes the time spent comparing and swapping elements by
              gradually reducing the gap between elements compared. This results
              in a more efficient sorting process compared to Bubble Sort. Gnome
              Sort's time complexity depends on the chosen gap sequence, but it
              generally performs better than O(n^2) for the worst and average
              cases. This makes Gnome Sort suitable for sorting moderate-sized
              datasets. It is an in-place sorting algorithm, meaning it sorts
              the array without requiring additional memory.
            </Typography>
          </CardContent>
        </Card>

        <div className="array-visualization">
          {gnomeSortArray.map((value, index) => (
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
