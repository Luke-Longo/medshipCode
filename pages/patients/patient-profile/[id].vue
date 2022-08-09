<template>
	<div>
		<h2 class="header">Patient Profile</h2>
		<div class="flex justify-center">
			<p
				class="w-1/3 mr-4 rounded-full hover:bg-darkSecondary hover:cursor-pointer dark:hover:bg-darkBg p-2 trans"
				@click="viewOrders"
			>
				View Orders
			</p>
		</div>
		<div class="flex flex-col gap-2">
			<div class="form-group">
				<label for="">First Name</label>
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
				<label for="">Last Name</label>
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
					<label for="">Address 1</label>
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
					<label for="">City</label>
					<input
						:class="{ 'invalid-input': !input.city.isValid }"
						:type="'text'"
						:placeholder="'City'"
						v-model.trim="input.city.val"
						@blur="resetValidity('city')"
					/>
				</div>
				<div class="form-group">
					<label for="">State</label>
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
					<label for="">Zip</label>
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
					<label for="">Phone</label>
					<input
						:class="{ 'invalid-input': !input.phone.isValid }"
						:type="'text'"
						:placeholder="'Phone: ex 111-111-1111'"
						v-model.trim="input.phone.val"
						@blur="resetValidity('phone')"
					/>
					<p v-if="!input.phone.isValid" class="invalid-text">
						Please enter 10 digits for phone number
					</p>
				</div>
				<div class="form-group">
					<label for="">Gender</label>
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
					<label>Date of Birth</label>
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
			</div>
			<div class="form-group justify-center mx-auto">
				<label for="">Member Id</label>
				<input
					type="text"
					class="lg:w-1/3"
					:class="{ 'invalid-input': !input.memberId.isValid }"
					:type="'text'"
					:placeholder="'ex: 0001FQ2'"
					v-model.trim="input.memberId.val"
					@blur="resetValidity('memberId')"
				/>
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
import { PatientInput, Insurance, Patient } from "~~/types/types";
import { usePatientStore } from "~~/stores/patients";
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~~/stores/auth";

const patientStore = usePatientStore();
const uiStore = useUiStore();
const authStore = useAuthStore();
const formIsValid = ref(true);
const checkedIns = ref(false);
const router = useRouter();

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
	input.address1.val = patient.address.address1;
	input.address2.val = patient.address.address2;
	input.city.val = patient.address.city;
	input.state.val = patient.address.state;
	input.postalCode.val = patient.address.postalCode;
	input.memberId.val = patient.insurance.memberId;
};
onMounted(() => {
	setInput();
});

const input: PatientInput = reactive({
	firstName: {
		val: "",
		isValid: true,
	},
	lastName: {
		val: "",
		isValid: true,
	},
	address1: {
		val: "",
		isValid: true,
	},
	address2: {
		val: "",
		isValid: true,
	},
	city: {
		val: "",
		isValid: true,
	},
	state: {
		val: "",
		isValid: true,
	},
	postalCode: {
		val: "",
		isValid: true,
	},
	phone: {
		val: "",
		isValid: true,
	},
	dob: {
		val: "",
		isValid: true,
	},
	gender: {
		val: "",
		isValid: true,
	},
	memberId: {
		val: "",
		isValid: true,
	},
	insurance: <Insurance>{
		memberId: "",
		isValid: false,
		primary: null,
		secondary: null,
		tertiary: null,
	},
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

const getPhoneDigits = (p) => {
	let digits = p.replace(/\D/g, "");
	return digits;
};

const validateInput = async () => {
	formIsValid.value = true;
	for (let key in input) {
		if (key !== "insurance") {
			input[key].val = input[key].val?.toString().toLowerCase();
			if (key !== "address2") {
				if (input[key].val?.length === 0) {
					input[key].isValid = false;
					formIsValid.value = false;
				}
			}
		}
	}

	if (input.state.val.length !== 2) {
		input.state.isValid = false;
		formIsValid.value = false;
	}
	if (input.postalCode.val.length !== 5) {
		input.postalCode.isValid = false;
		formIsValid.value = false;
	}
	const phoneIsValid = (p) => {
		let phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
		let digits = getPhoneDigits(p);
		return phoneRe.test(digits);
	};
	if (!phoneIsValid(input.phone.val)) {
		input.phone.isValid = false;
		formIsValid.value = false;
	}
	if (
		input.gender.val.length !== 1 ||
		!(input.gender.val === "m" || input.gender.val === "f")
	) {
		input.gender.isValid = false;
		formIsValid.value = false;
	}
	const dobIsValid = (dob) => {
		let dobRe = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
		return dobRe.test(dob);
	};

	if (!dobIsValid(input.dob.val)) {
		input.dob.isValid = false;
		formIsValid.value = false;
	}
};

const resetValidity = (key) => {
	input[key].isValid = true;
};

const insLookup = async () => {
	validateInput();
	if (formIsValid.value) {
		uiStore.toggleFunctionLoading(true);
		console.log("looking up ins");
		const res = await $fetch("/api/changeApi");
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
			phone: getPhoneDigits(input.phone.val),
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
