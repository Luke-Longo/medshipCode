<template>
	<div class="mx-4">
		<div
			class="grid xl:grid-cols-3 sm:grid-cols-2 gap-5 mt-10"
			v-if="!!profileStore.practice"
		>
			<p v-for="field in fields" :key="field">
				{{ field.camel2title() }}: {{ input[field as keyof typeof input].val }}
			</p>
		</div>
		<div v-else class="flex justify-center mt-20">
			<p>Please contact an admin to setup your profile details</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PracticeInput } from "~/types/types";
import { useProfileStore } from "~/stores/profile";
import { Practice } from "~/types/types";

const profileStore = useProfileStore();

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
	npi: {
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

const fields = Object.keys(input);

const practice = ref<Practice>();

onBeforeMount(() => {
	if (!!profileStore.practice) {
		practice.value = profileStore.practice;
		for (let key in input) {
			// error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'PracticeInput'.
			input[key as keyof typeof input].val =
				practice.value[key as keyof typeof input];
		}
	}
});
</script>

<style scoped>
.input {
	border: 1px solid #ccc;
	border-radius: 3px;
	@apply border shadow-sm border-slate-300 placeholder-slate-400 dark:bg-darkBg dark:focus:outline-darkPrimary;
}

p {
	font-size: 1.1rem;
}
</style>
