const radixSortVisualization = async (arr, callback) => {
    const maxNumber = Math.max(...arr);
    const maxLength = maxNumber.toString().length;
  
    for (let i = 0; i < maxLength; i++) {
      const buckets = Array.from({ length: 10 }, () => []);
  
      for (let j = 0; j < arr.length; j++) {
        const digit = Math.floor(arr[j] / Math.pow(10, i)) % 10;
        buckets[digit].push(arr[j]);
      }
  
      arr = buckets.flat();
      
      // Visualize the current bucket arrangement
      callback([...arr], i);
  
      // Introduce a delay here to control the animation speed
      // You can use async/await or setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay time as needed
    }
  
    // Notify that the sorting is completed
    callback([...arr], maxLength);
  };
  
  export default radixSortVisualization;
  