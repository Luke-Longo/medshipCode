<template>
	<div>
		<div class="p-4 dark:bg-darkBg shadow-lg w-5/6 mx-auto rounded-lg">
			<table class="w-full">
				<thead class="grid text-xl" :class="gridCols">
					<tr v-for="col in cols">
						{{
							col
						}}
					</tr>
				</thead>
				<tbody>
					<tr v-for="row in tableData" class="grid" :class="gridCols">
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
