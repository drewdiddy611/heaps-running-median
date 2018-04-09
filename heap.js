class Heap {
	constructor(items = []) {
		this.items = [];
		for (let i = 0; i < items.length; i++) {
			const item = items[i];
			this.add(item);
		}
	}

	add(item) {
		this.items.push(item);
		console.log('POST-ADD', this);
		this._heapIt();
	}

	peek() {
		if (!this.size) throw new Error('Heap is empty.');
		return this.items[0];
	}

	poll() {
		if (!this.size) throw new Error('Heap is empty.');
		if (this.size === 1) return this.items.pop();
		const item = this.items[0];
		this.items[0] = this.items.pop();
		this._heapIt(Heap.HEAP_DOWN);
		return item;
	}

	sort() {
		const sorted = [],
			tempHeap = new MinHeap(this.arrayItems);
		while (tempHeap.size > 0) sorted.push(tempHeap.poll());
		return sorted;
	}

	_getLeftChildIndex(parentIdx) {
		return 2 * parentIdx + 1;
	}
	_getRightChildIndex(parentIdx) {
		return 2 * parentIdx + 2;
	}
	_getParentIndex(childIdx) {
		return Math.ceil((childIdx - 2) / 2);
	}

	_hasLeftChild(idx) {
		return this._getLeftChildIndex(idx) < this.size;
	}
	_hasRightChild(idx) {
		return this._getRightChildIndex(idx) < this.size;
	}
	_hasParent(idx) {
		return this._getParentIndex(idx) >= 0;
	}

	_leftChild(idx) {
		return this.items[this._getLeftChildIndex(idx)];
	}

	_rightChild(idx) {
		return this.items[this._getRightChildIndex(idx)];
	}

	_parent(idx) {
		return this.items[this._getParentIndex(idx)];
	}

	_swap(leftIdx, rightIdx) {
		const temp = this.items[leftIdx];
		this.items[leftIdx] = this.items[rightIdx];
		this.items[rightIdx] = temp;
	}

	// ABSTRACT
	_heapIt(dir = Heap.HEAP_UP) {}

	get size() {
		return this.items.length;
	}

	get arrayItems() {
		return this.items.slice();
	}
}
Heap.HEAP_UP = 0;
Heap.HEAP_DOWN = 1;

class MinHeap extends Heap {
	_heapIt(dir = Heap.HEAP_UP) {
		let idx;
		switch (dir) {
			case Heap.HEAP_UP:
				idx = this.size - 1;
				while (this._hasParent(idx) && this._parent(idx) > this.items[idx]) {
					console.log(
						'(MIN highers) SWAPPING',
						this.items[this._getParentIndex(idx)],
						'with',
						this.items[idx]
					);
					this._swap(this._getParentIndex(idx), idx);
					idx = this._getParentIndex(idx);
				}
				return;
			case Heap.HEAP_DOWN:
				idx = 0;
				while (this._hasLeftChild(idx)) {
					let smallerIdx = this._getLeftChildIndex(idx);
					if (
						this._hasRightChild(idx) &&
						this._rightChild(idx) < this._leftChild(idx)
					)
						smallerIdx = this._getRightChildIndex(idx);

					if (this.items[idx] < this.items[smallerIdx]) break;

					this._swap(idx, smallerIdx);
					idx = smallerIdx;
				}
				return;
		}
	}
}

class MaxHeap extends Heap {
	_heapIt(dir = Heap.HEAP_UP) {
		let idx;
		switch (dir) {
			case Heap.HEAP_UP:
				idx = this.size - 1;
				while (this._hasParent(idx) && this._parent(idx) < this.items[idx]) {
					console.log(
						'(MAX lowers) SWAPPING',
						this.items[this._getParentIndex(idx)],
						'with',
						this.items[idx]
					);
					this._swap(this._getParentIndex(idx), idx);
					idx = this._getParentIndex(idx);
				}
				return;
			case Heap.HEAP_DOWN:
				idx = 0;
				while (this._hasLeftChild(idx)) {
					let largerIdx = this._getLeftChildIndex(idx);
					if (
						this._hasRightChild(idx) &&
						this._rightChild(idx) > this._leftChild(idx)
					)
						largerIdx = this._getRightChildIndex(idx);

					if (this.items[idx] > this.items[largerIdx]) break;

					this._swap(largerIdx, idx);
					idx = largerIdx;
				}
				return;
		}
	}
}

module.exports = { Heap, MinHeap, MaxHeap };
