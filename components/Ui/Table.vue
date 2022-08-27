<template>
	<div>
		<div
			class="dark:bg-darkBg shadow-lg mx-4 justify-center rounded-lg"
			:class="widths"
		>
			<div
				class="flex gap-6 border-gray-300 border-solid border-t-0 border-r-0 border-l-0 border-b-2"
			>
				<div
					class="p-2 hover:cursor-pointer mb-2 dark:hover:text-darkPrimary hover:text-secondary"
					:class="{ selected: selectedStatus === status }"
					v-for="status in statuses"
					@click="selectedStatus = status"
				>
					{{ status }}
				</div>
			</div>
			<table class="w-full">
				<thead
					class="grid p-4 pb-4 bg-darkSecondary dark:bg-darkBg rounded-t-lg"
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
							<div v-else>
								<UiDropdown
									:dropdownItems="dropdownItems"
									@itemClicked="handleItemClick($event, row)"
								/>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Item {
	id: string;
	label: string;
}

const props = defineProps<{
	cols: string[];
	widths?: string[];
	gridCols: string;
	tableData: any[];
	properties: string[];
	dropdownItems: Item[];
	filters?: string[];
}>();
const selectedFilter = ref(props.filters?.[0] ?? "");

const emits = defineEmits<{
	(e: "item-clicked", item: Item, row: any): void;
}>();

const handleItemClick = (item, row) => {
	emits("item-clicked", item, row);
};
</script>

<style scoped>
* {
	@apply text-primary dark:text-darkSecondary;
}
</style>
