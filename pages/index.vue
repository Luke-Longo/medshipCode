<template>
	<div>
		<h3 class="header">Home</h3>
		<button @click="searchChangeHealth">ChangeHealthCare</button>
		<!-- <div class="w-2/3">
			<p>{{ eligibility }}</p>
		</div> -->
		<div
			class="grid grid-cols-5"
			v-for="benefit in benefitsInformation"
			v-if="benefitsInformation.length > 0"
		>
			<p>{{ benefit.planCoverage }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const eligibility = ref({});
const benefitsInformation = ref([]);

const searchChangeHealth = async () => {
	// looking for medical service type codes 12 or DM
	const res = await $fetch("/api/changeApi");
	const data = res.data;
	eligibility.value = data;
	benefitsInformation.value = data.benefitsInformation;

	console.log(data);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
