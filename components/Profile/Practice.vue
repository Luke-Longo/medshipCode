<template>
	<div>
		<div class="my-8 grid grid-cols-3 sm:gap-2 lg:grid-cols-4">
			<FormElementGrid
				class="lg:w-full"
				v-for="formElement in formElements"
				:key="formElement.title"
				:title="formElement.title"
				v-model="formElement.modelValue"
				:is-valid="formElement.isValid"
				:error="formElement.error"
				:placeholder="formElement.title"
			/>
		</div>
		<div class="flex justify-center">
			<button class="w-2/3 mx-auto reverse">Create Profile</button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Element {
	title: string;
	modelValue: string;
	isValid: boolean;
	error?: string;
	placeholder?: string;
}
const input = reactive({
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
	zip: {
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
		let text = key.replace(/([A-Z])/g, " $1");
		let title = text.charAt(0).toUpperCase() + text.slice(1);
		if (key === "ptan") {
			title = "PTAN";
		}
		if (key === "groupNpi") {
			title = "Group NPI";
		}
		if (key === "ein") {
			title = "EIN";
		}
		formElements.value.push({
			title: title,
			modelValue: input[key].val,
			isValid: input[key].isValid,
			error: input[key].error,
			placeholder: input[key].placeholder,
		} as Element);
	}
};
createElements();
</script>
