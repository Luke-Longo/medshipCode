<template>
	<div class="">
		<h3 class="header">Insurance Details</h3>
		<div class="flex flex-col justify-center items-center gap-4">
			<p class="text-2xl">
				Patient: {{ patient?.first_name.toTitle() }}
				{{ patient?.last_name.toTitle() }}
			</p>
			<p class="text-2xl">Date of Birth: {{ patient?.dob }}</p>
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
			>
				<div
					class="flex flex-col gap-2 p-3"
					v-for="benefit in patient!.insurance.benefitsInformation"
				>
					<p>Plan: {{ benefit.name }}</p>
					<p>{{ checkCoverage(benefit as BenefitsInformation) }}</p>
					<div class="flex justify-center p-2">
						<button class="reverse">View Benefit</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { usePatientStore } from "~~/stores/patients";
import { BenefitsInformation } from "~~/types/change";

const patientStore = usePatientStore();

const router = useRouter();
const route = useRoute();

const patient = await patientStore.getPatientById(route.params.id as string);

const insurance = patient!.insurance;

const checkCoverage = (benefit: BenefitsInformation) => {
	if (benefit.serviceTypes.includes("Durable Medical Equipment Purchase")) {
		const index = benefit.serviceTypes.findIndex(
			(code) => code === "Durable Medical Equipment Purchase"
		);
		return `${benefit.serviceTypes[index]} Covered`;
	} else {
		return "No DME Purchase Coverage";
	}
};
</script>
