<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<div class="flex justify-center gap-6">
			<label
				for=""
				class="cursor-pointer dark:hover:bg-darkBg hover:bg-slate-100 rounded-lg p-2 trans"
				:class="{ selected: profileType === 'practice' }"
				@click="handleRadio('practice')"
				>Practice
			</label>
			<label
				for=""
				class="cursor-pointer dark:hover:bg-darkBg hover:bg-slate-100 rounded-lg p-2 trans"
				:class="{ selected: profileType === 'salesRep' }"
				@click="handleRadio('salesRep')"
				>Sales Rep
			</label>
			<label
				for=""
				class="cursor-pointer dark:hover:bg-darkBg hover:bg-slate-100 rounded-lg p-2 trans"
				:class="{ selected: profileType === 'admin' }"
				@click="handleRadio('admin')"
				>Admin
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
type ProfileType = "practice" | "salesRep" | "admin";

const profileType = ref<ProfileType>("practice");

const handleRadio = (type: ProfileType) => {
	profileType.value = type;
};
</script>

<style scoped>
.selected {
	@apply dark:bg-darkBg bg-secondary text-white;
}
</style>
