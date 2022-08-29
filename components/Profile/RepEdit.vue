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
import { SalesRepList } from "~~/.nuxt/components";

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
	businessName: {
		val: "",
		isValid: true,
	},
});
const formIsValid = ref(true);
const listTitles = ref(["firstName", "email"]);

const handleSearch = async () => {
	// await salesRepStore.search(repSearchInput.value);
};

const salesRep: SalesRep = reactive({
	user_id: "",
	firstName: "",
	lastName: "",
	email: "",
	phone: "",
	children: [] as string[],
	practices: [] as string[],
	parent_id: "",
	businessName: "",
	created_at: null,
	modified_at: null,
});
const route = useRoute();

// rendering prior to component mounting
onMounted(async () => {
	await setInputs();
});

const setInputs = async () => {
	let salesRep = await profileStore.salesRep;
	console.log(salesRep);
	if (!!salesRep) {
		if (authStore.isAdmin) {
			console.log("runing");
			for (let key in input) {
				input[key].val = salesRep[key];
			}
		} else {
			for (let key in input) {
				input[key].val = salesRep[key];
			}
		}
		if (salesRep.parent_id !== null) {
			repSelected.value = true;
			let parentRep = await profileStore.getParentRep(salesRep.parent_id);
			selectedRep.value = parentRep;
		}
	}
};

const repSelected = ref(false);
const repSearchInput = ref("");

const selectedRep = ref(null as SalesRep | null);

const { formElements, resetValidity } = useFormElements(input);

const reps = ref([] as SalesRep[]);

const validateRep = () => {};

const saveProfile = async () => {
	formIsValid.value = true;
	validateRep();
	if (formIsValid) {
		let updatedSalesRep: SalesRep = {
			user_id: route.params.id,
			firstName: input.firstName.val,
			lastName: input.lastName.val,
			email: input.email.val,
			phone: input.phone.val,
			businessName: input.businessName.val,
			children: salesRep.children,
			practices: salesRep.practices,
			parent_id: selectedRep.value !== null ? selectedRep.value.user_id : null,
			created_at: salesRep.created_at ? salesRep.created_at : new Date(),
			modified_at: new Date(),
		};
		console.log(updatedSalesRep);
		await profileStore.adminAddSalesRep(updatedSalesRep);
	}
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
