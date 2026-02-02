<script setup>
import { ref } from "vue";

const count = ref(0);
const previousCount = ref(null);
const step = ref(1);
const max = 10;

const disableDecrement = ref(true);
const disableIncrement = ref(false);
const disableUndo = ref(true);

function updateDisabled() {
	disableDecrement.value = count.value === 0;
	disableIncrement.value = count.value === max;
	disableUndo.value = previousCount.value === null;
}

function savePrevious() {
	previousCount.value = count.value;
	updateDisabled();
}

function increment() {
	if (count.value + step.value >= max) {
		savePrevious();
		count.value = max;
		updateDisabled();
	} else {
		savePrevious();
		count.value += step.value;
		updateDisabled();
	}
}

function decrement() {
	if (count.value - step.value <= 0) {
		savePrevious();
		count.value = 0;
		updateDisabled();
	} else {
		savePrevious();
		count.value -= step.value;
		updateDisabled();
	}
}

function reset() {
	if (count.value !== 0) {
		savePrevious();
		count.value = 0;
		updateDisabled();
	}
}

function undo() {
	if (previousCount.value !== null) {
		count.value = previousCount.value;
		previousCount.value = null;
		updateDisabled();
	}
}
</script>

<template>
	<div class="container">
		<div class="card">
			<h1>Counter App</h1>
			<p>Click button to change the number.</p>
			<h1 style="margin: 1rem 0">{{ count }}</h1>
			<div class="row">
				<button
					class="increment"
					type="button"
					@click="increment"
					:disabled="disableIncrement"
				>
					+ Increase
				</button>
				<button
					class="decrement"
					type="button"
					@click="decrement"
					:disabled="disableDecrement"
				>
					- Decrease
				</button>
			</div>
			<div class="row">
				<button @click="undo" :disabled="disableUndo">Undo</button>
				<button class="reset" type="button" @click="reset">Reset</button>
			</div>
			<div class="row">
				<label for="step">Step:</label>
				<input type="number" name="step" id="step" v-model.number="step" />
			</div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	margin: 0;
	text-align: center;
}

p {
	margin: 0;
	text-align: center;
}

.container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}

.card {
	display: flex;
	flex-direction: column;
	width: 16rem;
	gap: 0.5rem;
	padding: 2rem;
	border: 1px solid #ddd;
	border-radius: 1rem;
}

.row {
	display: flex;
	gap: 0.5rem;
}

.row button {
	width: 100%;
	padding: 0.75rem 0;
	border: 1px solid #ddd;
	border-radius: 0.5rem;
	cursor: pointer;
}

.row label {
	align-self: center;
}

.row input {
	width: 100%;
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 8px;
}

.increment {
	background-color: #e0ecff;
}
.decrement {
	background-color: #ffe2e2;
}
.reset {
	background-color: #f0f0f0;
}
</style>
