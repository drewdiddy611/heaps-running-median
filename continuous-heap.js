const { MinHeap, MaxHeap } = require('./heap');

class ContinuousHeap {
	constructor() {
		this.lowers = new MaxHeap();
		this.highers = new MinHeap();
	}

	add(num) {
		if (this.lowers.size === 0 || num < this.lowers.peek())
			this.lowers.add(num);
		else this.highers.add(num);
		this._rebalance();
		return this.runningMedian;
	}

	get runningMedian() {
		this._rebalance();
		const [smaller, larger] = this._getLarger();
		if (smaller.size === larger.size)
			return ((larger.peek() + smaller.peek()) / 2).toFixed(1);
		return larger.peek().toFixed(1);
	}

	_rebalance() {
		const [smaller, larger] = this._getLarger();
		if (larger.size - smaller.size >= 2) {
			const poll = larger.poll();
			smaller.add(poll);
		}
	}

	_getLarger() {
		const lowerSize = this.lowers.size,
			higherSize = this.highers.size;

		const larger = lowerSize > higherSize ? this.lowers : this.highers;
		const smaller = lowerSize > higherSize ? this.highers : this.lowers;

		return [smaller, larger];
	}
}

module.exports = ContinuousHeap;
