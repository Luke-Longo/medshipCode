<template>
	<div>
		<h3 class="header">Edit NDC</h3>
		<div class="flex flex-col gap-6 ml-4 items-center">
			<div class="flex w-full justify-center">
				<div class="flex gap-8">
					<label for="">NDC</label>
					<input
						type="text"
						class="p-1"
						v-model="input.ndc_id.val"
						placeholder="ex: 00000-0000"
						:class="{ 'invalid-input': !input.ndc_id.isValid }"
						@blur="resetValidity('ndc_id')"
					/>
				</div>
			</div>
			<!-- <button class="btn reverse mx-auto mt-auto" @click="searchNdc">
				Search
			</button>
			<div class="grid grid-cols-2 gap-4 mx-auto">
				<p>Name: {{ searchedNdc.generic_name }}</p>
				<p>Brand: {{ searchedNdc.brand_name.toLowerCase().toTitle() }}</p>
				<p>Manufacturer: {{ searchedNdc.labeler_name }}</p>
				<p>Pack Size: {{ searchedNdc.packaging.length }}</p>
				<p>Dose Form: {{ searchedNdc.dosage_form.toLowerCase().toTitle() }}</p>
				<p>Therapeutic Class: {{}}</p>
				<p>MedGuide: {{}}</p> -->
			<div class="grid grid-cols-2 gap-4 mx-auto">
				<p>Name: {{ selectedNdc.genericName }}</p>
				<p>Brand: {{ selectedNdc.name.toTitle() }}</p>
				<p>Manufacturer: {{ selectedNdc.manufacturer.toTitle() }}</p>
				<p>Pack Size: {{}}</p>
				<p>Dose Form: {{ selectedNdc.doseForm.toTitle() }}</p>
				<p>Therapeutic Class: {{}}</p>
				<p>MedGuide: {{}}</p>
				<div></div>
				<div class="form-group">
					<label for="">Inventory</label>
					<input
						type="text"
						class="p-1"
						placeholder="Total Units"
						v-model="input.inventory.val"
						:class="{ 'invalid-input': !input.inventory.isValid }"
						@blur="resetValidity('inventory')"
					/>
				</div>
				<div class="form-group">
					<label for="">Cost</label>
					<input
						type="text"
						class="p-1"
						placeholder="Cost per Total"
						v-model="input.cost.val"
						:class="{ 'invalid-input': !input.cost.isValid }"
						@blur="resetValidity('cost')"
					/>
				</div>
				<div class="form-group">
					<label for="">AWP</label>
					<input
						type="text"
						class="p-1"
						placeholder="AWP"
						v-model="input.awp.val"
						:class="{ 'invalid-input': !input.awp.isValid }"
						@blur="resetValidity('awp')"
					/>
				</div>
				<div class="form-group">
					<label for="">Lot Number</label>
					<input
						type="text"
						class="p-1"
						placeholder="ex: EKF1267"
						v-model="input.lotNumber.val"
						:class="{ 'invalid-input': !input.lotNumber.isValid }"
						@blur="resetValidity('lotNumber')"
					/>
				</div>
				<div class="form-group">
					<label for="">Expiration Date</label>
					<input
						type="text"
						class="p-1"
						placeholder="01/01/2030"
						v-model="input.expDate.val"
						:class="{ 'invalid-input': !input.expDate.isValid }"
						@blur="resetValidity('expDate')"
					/>
				</div>
			</div>
			<div class="flex w-full">
				<button class="btn w-1/3 lg:w-1/4 mr-auto ml-6 reverse" @click="deleteNdc">
					Delete NDC
				</button>
				<button class="btn w-1/3 lg:w-1/4 ml-auto mr-6" @click="saveNdc">
					Save NDC
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
import { useNdcStore } from "~~/stores/ndc";
import { useUiStore } from "~~/stores/ui";
import { NDC } from "~~/types/types";

const ndcStore = useNdcStore();
const authStore = useAuthStore();
const uiStore = useUiStore();
const router = useRouter();
const formIsValid = ref(true);
const input = reactive({
	ndc_id: {
		val: "",
		isValid: true,
	},
	lotNumber: {
		val: "",
		isValid: true,
	},
	expDate: {
		val: "",
		isValid: true,
	},
	cost: {
		val: "",
		isValid: true,
	},
	inventory: {
		val: "",
		isValid: true,
	},
	awp: {
		val: "",
		isValid: true,
	},
});

const selectedNdc: NDC = ndcStore.selectedNdc;

const setNdc = () => {
	for (const key in input) {
		input[key].val = selectedNdc[key];
	}
};

onMounted(() => {
	setNdc();
});

// const searchedNdc: OpenNDC = reactive({
// 	active_ingredients: [],
// 	application_number: "",
// 	brand_name: "",
// 	brand_name_base: "",
// 	dosage_form: "",
// 	finished: true,
// 	generic_name: "",
// 	labeler_name: "",
// 	listing_expiration_date: "",
// 	marketing_category: "",
// 	marketing_start_date: "",
// 	openfda: {},
// 	packaging: [],
// 	pharm_class: [],
// 	product_id: "",
// 	product_ndc: "",
// 	product_type: "",
// 	route: [],
// 	spl_id: "",
// });

const resetValidity = (field: string) => {
	input[field].isValid = true;
};

// const searchNdc = async () => {
// 	// setting the searched ndc but we need a way of preserving and setting the data
// 	try {
// 		const res: {
// 			data: OpenNDC[];
// 		} = await $fetch(`/api/ndc?ndc=${input.ndc_id.val}`);
// 		const ndcs = res.data;
// 		// ignoring the chance that multiple ndcs come back because we will change where we get this information from
// 		let ndc = ndcs[0];
// 		for (let key in ndc) {
// 			searchedNdc[key] = ndc[key];
// 			if (typeof ndc[key] === "string") {
// 				searchedNdc[key] = ndc[key].toLowerCase();
// 			}
// 		}
// 		console.log(searchedNdc);
// 	} catch (error) {
// 		input.ndc_id.isValid = false;
// 		console.log(error);
// 	}
// };

const validateInput = () => {
	for (let key in input) {
		if (input[key].val === "") {
			input[key].isValid = false;
			formIsValid.value = false;
		}
	}
};

const saveNdc = () => {
	validateInput();
	if (formIsValid.value) {
		uiStore.toggleAppLoading(true);
		// make sure to include the pack size and other factors
		console.log(input.ndc_id.val);
		const ndc: NDC = {
			ndc_id: input.ndc_id.val,
			lotNumber: input.lotNumber.val,
			expDate: input.expDate.val,
			cost: Number(input.cost.val),
			inventory: Number(input.inventory.val),
			awp: Number(input.awp.val),
			name: selectedNdc.name,
			genericName: selectedNdc.genericName,
			manufacturer: selectedNdc.manufacturer,
			doseForm: selectedNdc.doseForm,
			date_added: new Date(),
			user_id: authStore.user_id,
		};
		ndcStore.addNdc(ndc);
		uiStore.toggleAppLoading(false);
		router.push("/dispense");
	}
};

const deleteNdc = () => {
	uiStore.toggleAppLoading(true);
	ndcStore.deleteNdc(input.ndc_id.val);
	uiStore.toggleAppLoading(false);
	router.push("/dispense");
};
</script>

<style scoped>
.invalid-input {
	color: rgb(255, 108, 108);
	border: 1px solid rgb(255, 108, 108);
	outline: 1px solid rgb(255, 108, 108);
	border-radius: 3px;
}
.invalid-text {
	color: rgb(255, 108, 108);
}

.form-group label {
	@apply text-lg font-semibold items-start;
}
.form-group input {
	padding: 0.5rem;
	border: 1px solid;
	border-radius: 3px;
	@apply border shadow-sm  placeholder-slate-400 dark:bg-darkBg;
}

.form-group {
	@apply flex justify-between gap-2;
}
p {
	@apply text-lg;
}
</style>
