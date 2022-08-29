<template>
	<div class="mx-4">
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
						Selected Rep:
						{{
							selectedRep !== null
								? selectedRep.firstName + selectedRep.lastName
								: "None"
						}}
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
						<button class="w-2/3 mx-auto reverse" @click="saveProfile">
							Save Profile
						</button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~/stores/profile";
import { useAuthStore } from "~/stores/auth";
import { Profile, SalesRep } from "~/types/types";

const profileStore = useProfileStore();
const authStore = useAuthStore();

const input = reactive({
	firstName: {
		val: "",
		isValid: true,
	},
	lastName: {
		val: "",
		isValid: true,
	},
	email: {
		val: "",
		isValid: true,
	},
	phone: {
		val: "",
		isValid: true,
	},
});
const listTitles = ref(["name", "email"]);

const handleSearch = async () => {
	// await salesRepStore.search(repSearchInput.value);
};

onBeforeMount(async () => {
	let salesRep = await profileStore.salesRep;
	console.log(salesRep);
	// if (salesRep !== null || salesRep !== undefined) {
	// 	if (authStore.isAdmin) {
	// 		for (let key in input) {
	// 			input[key].val = salesRep[key];
	// 		}
	// 	} else {
	// 		for (let key in input) {
	// 			input[key].val = salesRep[key];
	// 		}
	// 	}
	// 	if (salesRep.parent_id !== null) {
	// 		repSelected.value = true;
	// 		let parentRep = await profileStore.getParentRep(salesRep.parent_id);
	// 		selectedRep.value = parentRep;
	// 	}
	// }
});

const repSelected = ref(false);
const repSearchInput = ref("");
const selectedRep = ref(null as SalesRep | null);

const { formElements, resetValidity } = useFormElements(input);

const reps = ref([] as SalesRep[]);

const saveProfile = async () => {
	// await profileStore.updateProfile();
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
