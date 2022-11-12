<template>
	<div>
		<div
			class="grid grid-cols-4"
			v-if="insurance.benefitsInformation!.length > 0"
		>
			<div v-for="(benefit, index) in insurance.benefitsInformation">
				<p>Plan {{ index + 1 }}</p>
				<p>{{ benefit.name }}</p>
				<p>{{ benefit.planCoverage }}</p>
			</div>
			<!-- <div v-for="(status, index) in insurance.planStatus">
			<p>Plan {{ index + 1 }}</p>
			<p>{{ status.planDetails }}</p>
			<p>{{ status.status }}</p>
		</div> -->
		</div>
		<div class="flex w-full justify-center">
			<button @click="handleDetails">View Insurance Details</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Insurance } from "~/types/types";

const router = useRouter();
const route = useRoute();

const patientId = route.params.id as string;

const props = defineProps<{ insurance: Insurance }>();

const handleDetails = () => {
	router.push(`/patients/patient-profile/insurance/${patientId}`);
};
</script>

<style scoped>
p {
	@apply text-center mb-2 text-sm;
}
</style>
