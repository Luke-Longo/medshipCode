<template>
	<div>
		<h2 class="header">Add Doctor</h2>
		<div class="flex flex-col gap-4 ml-4">
			<FormElement
				:title="'First Name'"
				class="w-2/3"
				v-model="input.firstName.val"
				:is-valid="input.firstName.isValid"
				@reset-validity="resetValidity('firstName')"
			/>
			<FormElement
				:title="'Last Name'"
				class="w-2/3"
				v-model="input.lastName.val"
				:is-valid="input.lastName.isValid"
				@reset-validity="resetValidity('lastName')"
			/>
			<div class="row-2">
				<FormElement
					:title="'NPI'"
					class="w-2/3"
					v-model="input.npi.val"
					:is-valid="input.npi.isValid"
					@reset-validity="resetValidity('npi')"
				/>
				<FormElement
					:title="'DEA'"
					class="w-2/3"
					v-model="input.dea.val"
					:is-valid="input.dea.isValid"
					@reset-validity="resetValidity('dea')"
				/>
			</div>
			<FormElement
				:title="'Street'"
				class="w-2/3"
				v-model="input.street.val"
				:is-valid="input.street.isValid"
				@reset-validity="resetValidity('street')"
			/>
			<div class="row-3">
				<FormElement
					:title="'City'"
					class=""
					v-model="input.city.val"
					:is-valid="input.city.isValid"
					@reset-validity="resetValidity('city')"
				/>
				<FormElement
					:title="'State'"
					class=""
					v-model="input.state.val"
					:is-valid="input.state.isValid"
					@reset-validity="resetValidity('state')"
					:error="'Please enter a valid state abbreviation'"
				/>
				<FormElement
					:title="'Zip'"
					class=""
					v-model="input.zip.val"
					:is-valid="input.zip.isValid"
					@reset-validity="resetValidity('zip')"
				/>
			</div>
			<div class="row-3">
				<FormElement
					:title="'Date of Birth'"
					class=""
					v-model="input.dob.val"
					:is-valid="input.dob.isValid"
					:placeholder="'ex: 01/01/1990'"
					@reset-validity="resetValidity('dob')"
					:error="'Please match this format: 01/01/2000'"
				/>
				<FormElement
					:title="'Gender'"
					class=""
					v-model="input.gender.val"
					:is-valid="input.gender.isValid"
					:placeholder="'M or F'"
					@reset-validity="resetValidity('gender')"
					:error="'Please enter M or F'"
				/>
				<FormElement
					:title="'Phone'"
					class=""
					v-model="input.phone.val"
					:is-valid="input.phone.isValid"
					:placeholder="'111-111-1111'"
					@reset-validity="resetValidity('phone')"
					:error="'Please enter a 10 digit phone number'"
				/>
			</div>
			<div class="flex justify-end my-4">
				<button class="w-1/4 mr-4" @click="addDoctor">Save Doctor</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Doctor, DoctorInput } from "~~/types/types";
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~~/stores/auth";
import { useDoctorsStore } from "~~/stores/doctors";

const uiStore = useUiStore();
const authStore = useAuthStore();
const doctorsStore = useDoctorsStore();
const formIsValid = ref(true);
const router = useRouter();

const input: DoctorInput = reactive({
	firstName: {
		val: "",
		isValid: true,
	},
	lastName: {
		val: "",
		isValid: true,
	},
	npi: {
		val: "",
		isValid: true,
	},
	dea: {
		val: "",
		isValid: true,
	},
	street: {
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
	zip: {
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
});

const clearInputs = () => {
	for (let key in input) {
		input[key].val = "";
	}
};

const getDigits = (p) => {
	let digits = p.replace(/\D/g, "");
	return digits;
};

const validateInput = async () => {
	formIsValid.value = true;
	for (let key in input) {
		input[key].val = input[key].val?.toString().toLowerCase();
		if (input[key].val === "") {
			input[key].isValid = false;
			formIsValid.value = false;
		}
	}
	if (input.state.val.length !== 2) {
		input.state.isValid = false;
		formIsValid.value = false;
	}
	if (input.zip.val.length !== 5) {
		input.zip.isValid = false;
		formIsValid.value = false;
	}
	const phoneIsValid = (p) => {
		let phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
		let digits = getDigits(p);
		return phoneRe.test(digits);
	};
	if (!phoneIsValid(input.phone.val)) {
		input.phone.isValid = false;
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
	const npiIsValid = (npi) => {
		let npiRe = /^[0-9]{10}$/;
		return npiRe.test(npi);
	};
	if (!npiIsValid(input.npi.val)) {
		input.npi.isValid = false;
		formIsValid.value = false;
	}
	if (input.dea.val.length !== 9) {
		input.dea.isValid = false;
		formIsValid.value = false;
	}
};

const resetValidity = (key) => {
	input[key].isValid = true;
};

const addDoctor = async () => {
	validateInput();
	if (formIsValid.value) {
		uiStore.toggleFunctionLoading(true);
		console.log("adding doctor");
		let doctor: Doctor = reactive({
			firstName: input.firstName.val,
			lastName: input.lastName.val,
			npi: input.npi.val,
			dea: input.dea.val,
			street: input.street.val,
			city: input.city.val,
			state: input.state.val,
			zip: input.zip.val,
			phone: getDigits(input.phone.val),
			gender: input.gender.val,
			dob: input.dob.val,
			user_id: authStore.user_id,
			doctor_id: useUuid(),
			date_added: new Date(),
		});

		await doctorsStore.addDoctor(doctor);

		clearInputs();
		router.push("/doctors");
		uiStore.toggleFunctionLoading(false);
	}
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
.row-2 {
	@apply flex w-2/3 lg:w-2/3 lg:mx-auto lg:gap-4;
}
.row-3 {
	@apply flex lg:w-2/3 lg:mx-auto lg:gap-4;
}
</style>
