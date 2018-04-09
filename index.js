const ContinuousHeap = require('./continuous-heap');

let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const heap = new ContinuousHeap();

for (let i = 0; i < items.length; i++) {
	console.log(heap.add(items[i]));
}
