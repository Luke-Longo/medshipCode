<template>
	<div class="w-fit rounded-md">
		<div class="card">
			<div class="flex mb-3 justify-center gap-1 items-center">
				<i class="chevron"><ChevronLeft class="mx-auto text-lg" /></i>
				<p class="">{{ months[selectedMonth] }}</p>
				<i class="chevron"><ChevronRight class="mx-auto text-lg" /></i>
				<i class="chevron"><ChevronLeft class="mx-auto text-lg" /></i>
				<p class="">{{ selectedYear }}</p>
				<i class="chevron"><ChevronRight class="mx-auto text-lg" /></i>
			</div>
			<div class="grid grid-cols-7">
				<div v-for="dayName in dayNames" class="mx-3">
					<p class="">{{ dayName.slice(0, 2) }}</p>
				</div>
				<div class="border m-3" v-for="day in days">
					<p>{{ day }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import ChevronLeft from "~icons/mdi/chevron-left";
import ChevronRight from "~icons/mdi/chevron-right";

const selectedMonth = ref(new Date().getMonth());
const selectedYear = ref(new Date().getFullYear());
const daysInMonth = [
	31,
	selectedYear.value % 4 === 0 ? 29 : 28,
	31,
	30,
	31,
	30,
	31,
	31,
	30,
	31,
	30,
	31,
];
const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const days = computed(() => {
	const days = [];
	const firstDay = new Date(selectedYear.value, selectedMonth.value, 1).getDay();
	const lastDay = daysInMonth[selectedMonth.value];
	for (let i = 0; i < firstDay; i++) {
		days.push("");
	}
	for (let i = 1; i <= lastDay; i++) {
		days.push(i);
	}
	return days;
});
</script>

<style scoped>
div {
	@apply dark:bg-darkBg text-primary dark:text-darkSecondary;
}
.chevron {
	@apply dark:hover:bg-black hover:bg-darkSecondary py-1 px-0 rounded-md hover:cursor-pointer trans;
}
</style>
