<template>
	<div>
		<h2 class="header">Patient Profile</h2>
		<div class="flex flex-col gap-2">
			<div class="form-group">
				<label for="">First Name <span class="text-red-400">*</span></label>
				<input
					class="w-2/3"
					:class="{ 'invalid-input': !input.firstName.isValid }"
					:type="'text'"
					:placeholder="'First Name'"
					v-model.trim="input.firstName.val"
					@blur="resetValidity('firstName')"
				/>
			</div>
			<div class="form-group">
				<label for="">Last Name <span class="text-red-400">*</span></label>
				<input
					class="w-2/3"
					:class="{ 'invalid-input': !input.lastName.isValid }"
					:type="'text'"
					:placeholder="'Last Name'"
					v-model.trim="input.lastName.val"
					@blur="resetValidity('lastName')"
				/>
			</div>
			<div class="row">
				<div class="form-group">
					<label for="">Address 1 <span class="text-red-400">*</span></label>
					<input
						class=""
						:class="{ 'invalid-input': !input.address1.isValid }"
						:type="'text'"
						:placeholder="'Address 1'"
						v-model.trim="input.address1.val"
						@blur="resetValidity('address1')"
					/>
				</div>
				<div class="form-group">
					<label for="">Address 2</label>
					<input
						class="w-2/3"
						:class="{ 'invalid-input': !input.address2.isValid }"
						:type="'text'"
						:placeholder="'ex: Suite 101'"
						v-model.trim="input.address2.val"
						@blur="resetValidity('address2')"
					/>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<label for="">City <span class="text-red-400">*</span></label>
					<input
						:class="{ 'invalid-input': !input.city.isValid }"
						:type="'text'"
						:placeholder="'City'"
						v-model.trim="input.city.val"
						@blur="resetValidity('city')"
					/>
				</div>
				<div class="form-group">
					<label for="">State <span class="text-red-400">*</span></label>
					<input
						:class="{ 'invalid-input': !input.state.isValid }"
						:type="'text'"
						:placeholder="'State: ex (GA)'"
						v-model.trim="input.state.val"
						@blur="resetValidity('state')"
					/>
					<p v-if="!input.state.isValid" class="invalid-text">
						Please enter a valid state abbreviation
					</p>
				</div>
				<div class="form-group">
					<label for="">Zip <span class="text-red-400">*</span></label>
					<input
						:class="{ 'invalid-input': !input.postalCode.isValid }"
						:type="'text'"
						:placeholder="'Zip'"
						v-model.trim="input.postalCode.val"
						@blur="resetValidity('postalCode')"
					/>
				</div>
			</div>
			<div class="row">
				<div class="form-group">
					<label>Date of Birth <span class="text-red-400">*</span></label>
					<input
						:class="{ 'invalid-input': !input.dob.isValid }"
						:type="'text'"
						:placeholder="'DOB: ex 01/05/1973'"
						v-model.trim="input.dob.val"
						@blur="resetValidity('dob')"
					/>
					<p v-if="!input.dob.isValid" class="invalid-text">
						Please match this format: 01/01/2000
					</p>
				</div>
				<div class="form-group">
					<label for="">Gender <span class="text-red-400">*</span></label>
					<input
						:class="{ 'invalid-input': !input.gender.isValid }"
						:type="'text'"
						:placeholder="'Gender: M or F'"
						v-model.trim="input.gender.val"
						@blur="resetValidity('gender')"
					/>
					<p v-if="!input.gender.isValid" class="invalid-text">
						Please enter M or F
					</p>
				</div>
				<div class="form-group">
					<label for="">Member Id</label>
					<input
						type="text"
						:class="{ 'invalid-input': !input.memberId.isValid }"
						:type="'text'"
						:placeholder="'ex: 0001FQ2'"
						v-model.trim="input.memberId.val"
						@blur="resetValidity('memberId')"
					/>
				</div>
			</div>
		</div>
		<div class="flex my-8">
			<button class="mx-auto w-3/4 reverse" @click="insLookup">
				Find Insurance
			</button>
		</div>
		<div class="flex gap-16 justify-center">
			<div class="flex flex-col" v-if="input.insurance.primary">
				<p>Primary:</p>
				<p>{{ input.insurance.primary?.planName }}</p>
			</div>
			<div class="flex flex-col" v-if="input.insurance.secondary">
				<p>Secondary:</p>
				<p>{{ input.insurance.secondary?.planName }}</p>
			</div>
		</div>
		<div class="flex justify-between my-4 mx-2">
			<button class="w-1/4 mr-4 reverse" @click="deletePatient">
				Delete Patient
			</button>
			<button class="w-1/4 mr-4" @click="addPatient">Save Patient</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Patient } from "~~/types/types";
import { Subscriber } from "~~/types/change";
import { usePatientStore } from "~~/stores/patients";
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~~/stores/auth";

const patientStore = usePatientStore();
const uiStore = useUiStore();
const authStore = useAuthStore();
const checkedIns = ref(false);
const router = useRouter();
const { validateInput, input, formIsValid } = useValidatePatientInput();

const patient = patientStore.selectedPatient;

const deletePatient = async () => {
	uiStore.toggleAppLoading(true);
	await patientStore.deletePatient(patient.patient_id);
	router.push("/patients");
	uiStore.toggleAppLoading(false);
};

const setInput = () => {
	for (let key in input) {
		if (key === "insurance") {
			input[key] = patient.insurance;
		} else {
			input[key] = {
				val: patient[key],
				isValid: true,
			};
		}
	}
	for (let key in patient.address) {
		input[key] = {
			val: patient.address[key],
			isValid: true,
		};
	}
	input.memberId.val = patient.insurance.memberId;
};

onMounted(() => {
	setInput();
});

const clearInputs = () => {
	for (let key in input) {
		if (key === "insurance") {
			input.insurance.primary = null;
			input.insurance.secondary = null;
			input.insurance.tertiary = null;
			input.insurance.memberId = "";
		} else {
			input[key].val = "";
		}
	}
};

const resetValidity = (key) => {
	input[key].isValid = true;
};

const insLookup = async () => {
	validateInput();
	if (formIsValid.value) {
		let subscriber: Subscriber = {
			memberId: input.memberId.val,
			firstName: input.firstName.val,
			lastName: input.lastName.val,
			gender: input.gender.val,
			dateOfBirth: input.dob.val,
		};
		uiStore.toggleFunctionLoading(true);
		const res = await $fetch("/api/changeApi", {
			method: "POST",
			body: subscriber,
		});
		const data = res.data;
		input.insurance.benefitsInformation = data.benefitsInformation;
		input.insurance.planStatus = data.planStatus;
		console.log(data);
		checkedIns.value = true;
		uiStore.toggleFunctionLoading(false);
	}
};

const addPatient = async () => {
	validateInput();
	if (formIsValid.value) {
		uiStore.toggleFunctionLoading(true);
		input.insurance.memberId = input.memberId.val;
		let patient: Patient = reactive({
			firstName: input.firstName.val,
			lastName: input.lastName.val,
			address: {
				address1: input.address1.val,
				address2: input.address2.val,
				city: input.city.val,
				state: input.state.val,
				postalCode: input.postalCode.val,
			},
			dob: input.dob.val,
			gender: input.gender.val,
			insurance: input.insurance,
			user_id: authStore.user_id,
			patient_id: useUuid(),
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
