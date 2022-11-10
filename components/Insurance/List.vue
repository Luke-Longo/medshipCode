<template>
	<div class="grid grid-cols-4" v-if="insurance.benefitsInformation!.length > 0">
		<div v-for="(benefit, index) in insurance.benefitsInformation">
			<p>Plan {{ index + 1 }}</p>
			<p>{{ benefit.name }}</p>
			<p>{{ benefit.planCoverage }}</p>
		</div>
		<div v-for="(status, index) in insurance.planStatus">
			<p>Plan {{ index + 1 }}</p>
			<p>{{ status.planDetails }}</p>
			<p>{{ status.status }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Insurance } from "~/types/types";

const props = defineProps<{ insurance: Insurance }>();
</script>

<style scoped>
p {
	@apply text-center mb-2 text-sm;
}
</style>
