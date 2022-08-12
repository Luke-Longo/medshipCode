<template>
	<div>
		<h3 class="header">Home</h3>
		<button @click="searchChangeHealth">ChangeHealthCare</button>
		<button @click="recovery">recovery</button>
		<!-- <div class="w-2/3">
			<p>{{ eligibility }}</p>
		</div> -->
		<div
			class="grid grid-cols-5"
			v-for="benefit in benefitsInformation"
			v-if="benefitsInformation.length > 0"
		>
			<p>{{ benefit.planCoverage }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EligibilityResponse } from "~~/types/change";
const eligibility = ref({});
const benefitsInformation = ref([]);
const router = useRouter();

const searchChangeHealth = async () => {
	// looking for medical service type codes 12 or DM
	const res: EligibilityResponse = await $fetch("/api/changeEligibility", {
		method: "POST",
		body: {
			medicalServiceTypeCodes: ["12", "DM"],
		},
	});

	eligibility.value = res;
	benefitsInformation.value = res.benefitsInformation;

	console.log(res);
};

const recovery = () => {
	router.push("/recovery");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
