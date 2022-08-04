<template>
	<div class="my-6 w-full">
		<h3 class="header">Orders</h3>
		<div class="card">
			<div class="flex gap-6">
				<div
					class="p-2"
					:class="{ selected: selectedStatus === status }"
					v-for="status in statuses"
				>
					{{ status }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const selectedStatus = ref("Ready");
const statuses = [
	"Ready",
	"Not Ready",
	"Payment Due",
	"Completed",
	"Held Orders",
];
</script>

<style scoped>
.card {
	@apply items-center justify-center trans text-primary dark:text-darkSecondary dark:bg-darkBg bg-white m-6;
}

.selected {
	border: solid;
	bottom: 2px;
	@apply dark:text-darkPrimary;
}
</style>
