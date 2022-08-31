<template>
	<div class="mx-4">
		<h3 class="header">Profile</h3>
		<div class="grid grid-cols-"></div>
	</div>
</template>

<script setup lang="ts">
import { PracticeInput, SalesRep } from "~/types/types";
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

const practice = ref<Practice>({
	user_id: "",
	practiceName: "",
	legalName: "",
	contactPhone: "",
	contactEmail: "",
	contactName: "",
	accountsPayableContact: "",
	accountsPayableEmail: "",
	accountsPayablePhone: "",
	clinicalContact: "",
	clinicalEmail: "",
	clinicalPhone: "",
	npi: "",
	ein: "",
	ptan: "",
	address: { address1: "", address2: "", city: "", state: "", postalCode: "" },
	modified_at: null,
	created_at: null,
});

const setPractice = async () => {
	practice.value = await profileStore.practice;
};
</script>

<style scoped>
.input {
	border: 1px solid #ccc;
	border-radius: 3px;
	@apply border shadow-sm border-slate-300 placeholder-slate-400 dark:bg-darkBg dark:focus:outline-darkPrimary;
}
</style>
