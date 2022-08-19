<template>
	<div class="mx-4">
		<transition name="fade" mode="out-in">
			<div class="flex flex-col" v-if="!repSelected">
				<UiSearchInline
					v-model="repSearchInput"
					label="Search Rep"
					@search="handleSearch"
				/>
				<SalesRepList
					:items="reps"
					:list="listTitles"
					:itemName="'Sales Rep'"
					@selected="handleSelected"
					@add="addRep"
				/>
				<button
					class="reverse text-center justify-center mx-auto mt-4"
					@click="handleSelected(null)"
				>
					Add Without Rep
				</button>
			</div>
			<div v-else>
				<p class="my-4">Selected Rep: {{ selectedRep.name }}</p>
				<div class="mt-6 mb-6 grid grid-cols-3 sm:gap-2 lg:grid-cols-4">
					<FormElementGrid
						class="lg:w-full"
						v-for="formElement in formElements"
						:key="formElement.title"
						:title="formElement.title"
						v-model="input[formElement.id].val"
						:is-valid="input[formElement.id].isValid"
						:error="formElement.error"
						:placeholder="formElement.title"
						:required="formElement.required"
						@reset-validity="resetValidity(formElement.id)"
					/>
				</div>
				<div class="flex justify-center">
					<button class="w-2/3 mx-auto reverse" @click="createProfile">
						Create Profile
					</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { PracticeInput } from "~/types/types";
interface Element {
	id: string;
	title: string;
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
const reps = ref([
	{
		id: "1",
		name: "John Doe",
		email: "",
	},
]);
const listTitles = ref(["name", "email"]);
const repSelected = ref(false);
const repSearchInput = ref("");
const selectedRep = ref(null);
const formElements = ref([] as Element[]);

const createElements = () => {
	for (let key in input) {
		let error = "";
		let placeholder = "";
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
		formElements.value.push({
			id: key,
			title: title,
			required: required,
			error: error,
			placeholder: placeholder,
		} as Element);
	}
};
const resetValidity = (id: string) => {
	input[id].isValid = true;
};
createElements();
const emit = defineEmits<{
	(e: "toRep");
}>();

const { validateInput, formIsValid } = useValidatePracticeInput(input);
const createProfile = async () => {
	validateInput();
	console.log(input);
};
const handleSearch = async () => {
	// await salesRepStore.search(repSearchInput.value);
};

const handleSelected = async (rep) => {
	repSelected.value = true;
	selectedRep.value = rep;
};

const addRep = async () => {
	emit("toRep");
};
</script>

<style scoped>
.input {
	border: 1px solid #ccc;
	border-radius: 3px;
	@apply border shadow-sm border-slate-300 placeholder-slate-400 dark:bg-darkBg dark:focus:outline-darkPrimary;
}
</style>
