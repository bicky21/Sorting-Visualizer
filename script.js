const arrayContainer = document.getElementById('array-container');
let array = [];

// Generate a new random array
function generateArray() {
    arrayContainer.innerHTML = '';
    array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    renderArray();
}

// Render the array as bars with values
function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        const valueLabel = document.createElement('span');
        valueLabel.textContent = value;
        bar.appendChild(valueLabel);
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort Algorithm
async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray();
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        }
    }
}

// Selection Sort Algorithm
async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray();
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
        }
        array[j + 1] = key;
        renderArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Merge Sort Algorithm
async function mergeSort(start = 0, end = array.length - 1) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(start, mid);
        await mergeSort(mid + 1, end);
        await merge(start, mid, end);
        renderArray();
    }
}

async function merge(start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k++] = leftArray[i++];
        } else {
            array[k++] = rightArray[j++];
        }
        renderArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    while (i < leftArray.length) {
        array[k++] = leftArray[i++];
        renderArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    while (j < rightArray.length) {
        array[k++] = rightArray[j++];
        renderArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}

// Quick Sort Algorithm
async function quickSort(start = 0, end = array.length - 1) {
    if (start < end) {
        const pivotIndex = await partition(start, end);
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
        renderArray();
    }
}

async function partition(start, end) {
    const pivot = array[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        }
        renderArray();
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    return pivotIndex;
}

// Call generateArray on page load
window.onload = generateArray;
