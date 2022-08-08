<template>
	<div>
		<h3 class="header">Home</h3>
		<button @click="searchChangeHealth">ChangeHealthCare</button>
		<div class="w-2/3">
			<p v-if="serviceTypeCodes.length > 0">{{ serviceTypeCodes }}</p>
			<p v-if="serviceTypes.length > 0">{{ serviceTypes }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const serviceTypeCodes = ref([]);
const serviceTypes = ref([]);
const searchChangeHealth = async () => {
	const res = await $fetch("/api/changeApi");
	const data = res.data;
	console.log(data);
	serviceTypeCodes.value = data.benefitsInformation[1].serviceTypeCodes;
	serviceTypes.value = data.benefitsInformation[1].serviceTypes;
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
