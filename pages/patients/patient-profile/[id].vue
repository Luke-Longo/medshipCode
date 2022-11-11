<template>
	<div>
		<h2 class="header">Patient Profile</h2>
		<PatientsInput :input="input" />
		<div class="flex my-8">
			<button class="mx-auto w-3/4 reverse" @click="insLookup">
				Find Insurance
			</button>
		</div>
		<InsuranceList :insurance="insurance" v-if="!insurance.isValid" />
		<div class="flex justify-between my-4 mx-2">
			<button class="w-1/4 mr-4 reverse" @click="deletePatient">
				Delete Patient
			</button>
			<button class="w-1/4 mr-4" @click="addPatient">Save Patient</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Insurance, Patient, PatientInput } from "~~/types/types";
import { EligibilityResponse, Subscriber } from "~~/types/change";
import { usePatientStore } from "~~/stores/patients";
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~~/stores/auth";
import { PatientsInput, InsuranceList } from "~~/.nuxt/components";
import { Address } from "cluster";

const patientStore = usePatientStore();
const uiStore = useUiStore();
const authStore = useAuthStore();
const checkedIns = ref(false);
const router = useRouter();
const id = useRoute().params.id as string;
const { validateInput, input, formIsValid } = useValidatePatientInput();

const patient = await patientStore.getPatientById(id);

const deletePatient = async () => {
	uiStore.toggleAppLoading(true);
	await patientStore.deletePatient(patient.id);
	router.push("/patients");
	uiStore.toggleAppLoading(false);
};

const setInput = () => {
	if (!patient) return;
	for (let key in patient) {
		if (input[key as keyof PatientInput]!.val) {
			input[key as keyof PatientInput]!.val = patient[
				key as keyof Patient
			] as string;
		} else if (key === "first_name") {
			input.firstName.val = patient[key];
		} else if (key === "last_name") {
			input.lastName.val = patient[key];
		}
	}
	for (let key in patient.address) {
		input[key] = {
			val: patient.address[key as keyof typeof patient.address],
			isValid: true,
		};
	}
	input.memberId!.val = patient.insurance.memberId;
};

const insurance = reactive<Insurance>({
	memberId: "",
	isValid: false,
	benefitsInformation: [],
	planStatus: [],
});

onMounted(() => {
	setInput();
});

const clearInputs = () => {
	for (let key in input) {
		if (key === "insurance") {
			input.insurance.benefitsInformation = [];
			input.insurance.planStatus = [];
			input.insurance.memberId = "";
		} else {
			input[key].val = "";
		}
	}
};

const insLookup = async () => {
	validateInput();
	if (formIsValid.value) {
		let subscriber: Subscriber = {
			memberId: input.memberId!.val,
			firstName: input.firstName.val,
			lastName: input.lastName.val,
			gender: input.gender!.val,
			dateOfBirth: input.dob.val,
		};
		uiStore.toggleFunctionLoading(true);
		const res: EligibilityResponse = await $fetch("/api/insurance", {
			method: "POST",
			body: subscriber,
		});
		if (res) {
			insurance.benefitsInformation = res.benefitsInformation;
			insurance.planStatus = res.planStatus;
			checkedIns.value = true;
			insurance.isValid = true;
		}
		uiStore.toggleFunctionLoading(false);
	}
};

const addPatient = async () => {
	validateInput();
	if (formIsValid.value) {
		uiStore.toggleFunctionLoading(true);
		insurance.memberId = input.memberId!.val;
		let patient: Patient = reactive({
			first_name: input.firstName.val,
			last_name: input.lastName.val,
			address: {
				address1: input.address1!.val,
				address2: input.address2!.val,
				city: input.city!.val,
				state: input.state!.val,
				postalCode: input.postalCode!.val,
			},
			dob: input.dob.val,
			gender: input.gender!.val,
			insurance: insurance,
			user_id: authStore.user_id,
			id: useUuid(),
			created_at: new Date(),
			modified_at: new Date(),
		});

		await patientStore.addPatient(patient);

		clearInputs();

		router.push("/patients");

		uiStore.toggleFunctionLoading(false);
	}
};

const viewOrders = async () => {
	// probably best to use a modal pop up and show a list of prescriptions referencing the patient id this would allow for me to reuse the ui for the prescription log
	console.log("view orders");
};
</script>

<style scoped>
.invalid-input {
	color: rgb(255, 108, 108);
	border: none;
	outline: 2px solid rgb(255, 108, 108);
	border-radius: 5px;
}
.invalid-text {
	color: rgb(255, 108, 108);
}
.form-group {
	@apply flex flex-col gap-1 justify-center  ml-7 lg:w-2/3 lg:mx-auto text-primary dark:text-darkSecondary;
}
.row {
	@apply flex lg:w-2/3 lg:mx-auto lg:gap-4;
}
.form-group label {
	@apply font-semibold items-start;
}
.form-group input {
	padding: 0.4rem;
	border: 1px solid #ccc;
	border-radius: 3px;
	@apply border shadow-sm border-slate-300 placeholder-slate-400 dark:bg-darkBg dark:focus:outline-darkPrimary;
}
p {
	@apply text-center mb-2 text-sm;
}
</style>
