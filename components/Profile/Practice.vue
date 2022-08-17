<template>
	<div>
		<div class="mt-6 mb-6 grid grid-cols-3 sm:gap-2 lg:grid-cols-4">
			<FormElementGrid
				class="lg:w-full"
				v-for="formElement in formElements"
				:key="formElement.title"
				:title="formElement.title"
				v-model="formElement.modelValue"
				:is-valid="formElement.isValid"
				:error="formElement.error"
				:placeholder="formElement.title"
				:required="formElement.required"
			/>
		</div>
		<div class="flex justify-center">
			<button class="w-2/3 mx-auto reverse" @click="createProfile">
				Create Profile
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PracticeInput } from "~/types/types";
interface Element {
	title: string;
	modelValue: string;
	isValid: boolean;
	required: boolean;
	error?: string;
	placeholder?: string;
}
const input: PracticeInput = reactive({
	practiceName: {
		val: "",
		isValid: true,
	},
	legalName: {
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
	contactPhone: {
		val: "",
		isValid: true,
	},
	contactEmail: {
		val: "",
		isValid: true,
	},
	contactName: {
		val: "",
		isValid: true,
	},
	accountsPayableContact: {
		val: "",
		isValid: true,
	},
	accountsPayableEmail: {
		val: "",
		isValid: true,
	},
	accountsPayablePhone: {
		val: "",
		isValid: true,
	},
	clinicalContact: {
		val: "",
		isValid: true,
	},
	clinicalEmail: {
		val: "",
		isValid: true,
	},
	clinicalPhone: {
		val: "",
		isValid: true,
	},
	groupNpi: {
		val: "",
		isValid: true,
	},
	ein: {
		val: "",
		isValid: true,
	},
	ptan: {
		val: "",
		isValid: true,
	},
});

const formElements = ref([] as Element[]);

const createElements = () => {
	for (let key in input) {
		let required = true;
		let text = key.replace(/([A-Z])/g, " $1");
		let title = text.charAt(0).toUpperCase() + text.slice(1);
		if (key === "ptan" || key === "ein") {
			title = key.toUpperCase();
		}
		if (key === "groupNpi") {
			title = "Group NPI";
		}
		if (key === "address2") {
			required = false;
		}
		formElements.value.push(
			reactive({
				title: title,
				modelValue: input[key].val,
				isValid: input[key].isValid,
				required: required,
				error: input[key].error,
				placeholder: input[key].placeholder,
			}) as Element
		);
	}
};
createElements();

const { validateInput, formIsValid } = useValidatePracticeInput(input);
const createProfile = async () => {
	console.log(input);
	validateInput();
};
</script>
