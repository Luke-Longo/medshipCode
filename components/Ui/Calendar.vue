<template>
	<div class="w-fit rounded-md">
		<div class="card">
			<div class="flex mb-3 justify-center gap-3">
				<p class="">{{ months[selectedMonth] }}</p>
				<p class="">{{ selectedYear }}</p>
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
const years = [];
// get the current year
const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= currentYear - 10; year--) {
	years.push(year);
}
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
const selectedDay = ref(currentDay);
const selectedMonth = ref(currentMonth);
const selectedYear = ref(currentYear);
const selectedDate = computed(() => {
	return `${months[selectedMonth.value]} ${selectedDay.value}, ${
		selectedYear.value
	}`;
});

// get the name of the first day in the selectedMonth
const firstDay = new Date(selectedYear.value, selectedMonth.value, 1).getDay();
const dayNames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
// get the number of days in the selectedMonth
const daysInMonth = new Date(
	selectedYear.value,
	selectedMonth.value + 1,
	0
).getDate();
const days = [];
for (let day = 1; day <= daysInMonth; day++) {
	days.push(day);
}
const day = computed(() => {
	return days[selectedDay.value - 1];
});
</script>

<style scoped>
div {
	@apply dark:bg-darkBg text-primary dark:text-darkSecondary;
}
</style>
