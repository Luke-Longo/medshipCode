<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<UiRadio :radioTypes="radioTypes" v-model="selectedRadio" />
		<transition name="fade" mode="out-in">
			<ProfilePractice
				v-if="selectedRadio === 'practice'"
				@toRep="handleRadioChange('salesRep')"
			/>
			<ProfileRep v-else-if="selectedRadio === 'salesRep'" />
		</transition>
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
const handleRadioChange = (radioType: string) => {
	selectedRadio.value = radioType;
};
</script>

<style scoped></style>
