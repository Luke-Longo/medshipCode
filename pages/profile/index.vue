<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<UiRadio :radioTypes="radioTypes" v-model="selectedRadio" />
	</div>
</template>

<script setup lang="ts">
const radioTypes = [
	{
		id: "practice",
		label: "Practice",
	},
	{
		id: "salesRep",
		label: "Sales Rep",
	},
	{
		id: "admin",
		label: "Admin",
	},
];
const selectedRadio = ref(radioTypes[0].id);
</script>

<style scoped></style>
