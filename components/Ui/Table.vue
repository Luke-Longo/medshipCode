<template>
	<div>
		<div class="dark:bg-darkBg shadow-lg mx-4 justify-center rounded-lg">
			<table class="w-full">
				<thead
					class="grid text-xl p-4 pb-4 bg-darkSecondary dark:bg-darkBg rounded-t-lg"
					:class="gridCols"
				>
					<tr v-for="col in cols">
						{{
							col
						}}
					</tr>
				</thead>
				<tbody class="">
					<tr
						v-for="(row, index) in tableData"
						class="grid p-4 dark:odd:bg-black dark:even:bg-darkBg even:bg-darkSecondary"
						:class="gridCols"
					>
						<td v-for="key in properties">
							<div v-if="key !== 'dropdown'">{{ row[key] }}</div>
							<div v-else><UiDropdown></UiDropdown></div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	cols: string[];
	gridCols: string;
	tableData: any[];
	properties: string[];
}>();
</script>

<style scoped>
* {
	@apply text-primary dark:text-darkSecondary;
}
</style>
