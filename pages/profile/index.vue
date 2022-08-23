<template>
	<div>
		<h3 class="header">Profile</h3>
		<UiSearchInline
			:label="'Profiles'"
			v-model="searchInput"
			@search="searchProfiles"
		/>
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
const searchInput = ref("");
const radioTypes = [
	{
		id: "practice",
		label: "Practice",
	},
	{
		id: "salesRep",
		label: "Sales Rep",
	},
];
const selectedRadio = ref(radioTypes[0].id);
const handleRadioChange = (radioType: string) => {
	selectedRadio.value = radioType;
};
</script>

<style scoped></style>
