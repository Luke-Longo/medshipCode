<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<div class="flex flex-wrap">
			<div class="flex items-center mr-4">
				<input
					id="red-radio"
					type="radio"
					value=""
					name="colored-radio"
					class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="red-radio"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Red</label
				>
			</div>
			<div class="flex items-center mr-4">
				<input
					id="green-radio"
					type="radio"
					value=""
					name="colored-radio"
					class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="green-radio"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Green</label
				>
			</div>
			<div class="flex items-center mr-4">
				<input
					id="purple-radio"
					type="radio"
					value=""
					name="colored-radio"
					class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				<label
					for="purple-radio"
					class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>Purple</label
				>
			</div>
		</div>

		<UiCard class="mx-auto"> </UiCard>
	</div>
</template>

<script setup lang="ts">
type ProfileType = "practice" | "salesRep" | "admin";

const profileType = ref<ProfileType>("practice");
</script>

<style scoped></style>
