<template>
	<div>
		<div class="p-4 dark:bg-darkBg w-5/6 mx-auto rounded-lg">
			<table class="w-full">
				<thead class="grid gap-3" :class="gridCols">
					<tr v-for="col in cols">
						{{
							col
						}}
					</tr>
				</thead>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	cols: string[];
	gridCols?: string;
}>();
</script>

<style scoped>
* {
	@apply text-primary dark:text-darkSecondary text-lg;
}
</style>
