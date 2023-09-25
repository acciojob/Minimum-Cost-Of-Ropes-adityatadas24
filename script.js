function minCostOfRopes(ropes) {
    // Create a min heap using an array
    const minHeap = [...ropes];

    // Build the min heap
    for (let i = Math.floor(minHeap.length / 2) - 1; i >= 0; i--) {
        heapify(minHeap, i);
    }

    let totalCost = 0;

    // Combine ropes until there is only one rope left in the heap
    while (minHeap.length > 1) {
        const min1 = extractMin(minHeap);
        const min2 = extractMin(minHeap);
        const combinedCost = min1 + min2;
        totalCost += combinedCost;
        insert(minHeap, combinedCost);
    }

    return totalCost;
}

// Helper function to maintain the min heap property
function heapify(arr, i) {
    const n = arr.length;
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) {
        smallest = left;
    }

    if (right < n && arr[right] < arr[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
        heapify(arr, smallest);
    }
}

// Extract the minimum element from the min heap
function extractMin(arr) {
    const min = arr[0];
    const last = arr.pop();
    if (arr.length > 0) {
        arr[0] = last;
        heapify(arr, 0);
    }
    return min;
}

// Insert a new element into the min heap
function insert(arr, val) {
    arr.push(val);
    let i = arr.length - 1;
    while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (arr[i] >= arr[parent]) {
            break;
        }
        [arr[i], arr[parent]] = [arr[parent], arr[i]];
        i = parent;
    }
}

// Get input from the user and calculate the minimum cost
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = document.querySelector('input[type="text"]').value;
    const ropes = input.split(',').map(Number);
    const result = minCostOfRopes(ropes);
    document.querySelector('#result').textContent = result;
});

