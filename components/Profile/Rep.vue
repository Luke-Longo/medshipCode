<template>
	<div>
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
				/>
				<button
					class="reverse text-center justify-center mx-auto mt-4"
					@click="handleSelected(null)"
				>
					Add Without Rep
				</button>
			</div>
			<div v-else>
				<p class="my-4 flex gap-4 items-center">
					Selected Rep: {{ selectedRep !== null ? selectedRep.name : "None" }}
					<span
						class="p-2 rounded-md dark:hover:bg-darkBg cursor-pointer border border-darkBg trans hover:bg-darkSecondary"
						@click="changeRep"
						>Change Rep</span
					>
				</p>
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
import { Element } from "~/types/types";
const input = reactive({
	name: {
		val: "",
		isValid: false,
	},
	email: {
		val: "",
		isValid: false,
	},
	phone: {
		val: "",
		isValid: false,
	},
});
const listTitles = ref(["name", "email"]);

const handleSearch = async () => {
	// await salesRepStore.search(repSearchInput.value);
};

const repSelected = ref(false);
const repSearchInput = ref("");
const selectedRep = ref(null);
const formElements = ref([] as Element);

const reps = ref([
	{
		id: "1",
		name: "John Doe",
		email: "",
	},
]);

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

const changeRep = () => {
	repSelected.value = false;
	selectedRep.value = null;
};

const handleSelected = async (rep) => {
	repSelected.value = true;
	selectedRep.value = rep;
};
</script>
