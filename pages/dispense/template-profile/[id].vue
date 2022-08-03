<template>
	<div>
		<h3 class="header">Add Script Template</h3>
		<div class="flex flex-col gap-6 ml-4 items-center" v-if="isAddingNdc">
			<div class="grid grid-cols-2 gap-4">
				<div class="flex gap-8 items-center">
					<label class="" for="">NDC</label>
					<input
						type="text"
						class="p-1 py-2"
						v-model="input.ndc_id.val"
						placeholder="ex: 00000-0000"
						:class="{ 'invalid-input': !input.ndc_id.isValid }"
						@blur="resetValidity('ndc_id')"
					/>
				</div>
				<button class="mx-auto" @click="searchNdc">Search</button>
			</div>
			<div class="grid grid-cols-4 gap-4 w-3/4">
				<p>NDC</p>
				<p>Name</p>
				<p>Dose Form</p>
				<p>Inventory</p>
			</div>
			<div
				class="grid grid-cols-4 gap-4 w-3/4 hover:cursor-pointer hover:bg-darkSecondary dark:hover:bg-darkBg rounded-lg"
				v-if="ndcs.length > 0"
				v-for="ndc in ndcs"
				@click="selectNdc(ndc)"
			>
				<p class="p">{{ ndc.ndc_id }}</p>
				<p class="p">{{ ndc.name.toTitle() }}</p>
				<p class="p">{{ ndc.doseForm.toTitle() }}</p>
				<p class="p">{{ ndc.inventory }}</p>
			</div>
		</div>
		<div v-else>
			<div class="flex flex-col gap-6 ml-4 items-center">
				<p class="text-center mx-auto">NDCs in Template</p>
				<div class="flex flex-row gap-6">
					<div
						class="flex border border-solid border-primary dark:border-darkBg p-1 rounded-md"
						v-for="ndc_id in templateNdcs"
						:key="ndc_id"
					>
						<p class="p-0">
							{{ ndc_id }}
						</p>
						<p
							class="items-start p-0 m-0 text-xs hover:cursor-pointer"
							@click="removeNdc(ndc_id)"
						>
							X
						</p>
					</div>
				</div>
				<button class="reverse" @click="isAddingNdc = true">Add NDC</button>
			</div>
			<FormElement
				class="w-1/3 mb-3"
				v-model="input.name.val"
				title="Name"
				:is-valid="input.name.isValid"
				@reset-validity="resetValidity('name')"
			/>
			<FormElement
				class="w-1/3 mb-3"
				v-model="input.qty.val"
				title="Qty"
				:is-valid="input.qty.isValid"
				@reset-validity="resetValidity('qty')"
			/>
			<FormElement
				class="w-2/3 mb-3"
				v-model="input.sigCode.val"
				title="Sig Code"
				:placeholder="'ex: take 1 tablet orally every 6 hours'"
				:is-valid="input.sigCode.isValid"
				@reset-validity="resetValidity('sigCode')"
			/>
			<FormElement
				class="w-1/3 mb-3"
				v-model="input.daySupply.val"
				title="Day Supply"
				:is-valid="input.daySupply.isValid"
				@reset-validity="resetValidity('daySupply')"
			/>
			<div class="w-full flex mt-10">
				<button class="w-1/3 mx-auto reverse" @click="deleteTemplate">
					Delete
				</button>
				<button class="w-1/3 mx-auto" @click="addTemplate">Save</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
import { useNdcStore } from "~~/stores/ndc";
import { useTemplateStore } from "~~/stores/template";
import { useUiStore } from "~~/stores/ui";
import { NDC, Template } from "~~/types/types";

const ndcStore = useNdcStore();
const templateStore = useTemplateStore();
const uiStore = useUiStore();
const authStore = useAuthStore();
const router = useRouter();

const formIsValid = ref(true);
const input = reactive({
	ndc_id: {
		val: "",
		isValid: true,
	},
	name: {
		val: "",
		isValid: true,
	},
	qty: {
		val: "",
		isValid: true,
	},
	sigCode: {
		val: "",
		isValid: true,
	},
	daySupply: {
		val: "",
		isValid: true,
	},
});
const isAddingNdc = ref(false);
const ndcs = ref([] as NDC[]);
const selectedNdc = ref<NDC | null>(null);
const selectedTemplate: Template = await templateStore.selectedTemplate;

const setTemplate = () => {
	for (let key in input) {
		if (key === "daySupply" || "qty") {
			selectedTemplate[key] = selectedTemplate[key]?.toString();
			input[key].val = selectedTemplate[key];
		} else if (key !== "ndc_id") {
			input[key].val = selectedTemplate[key];
		}
	}
	templateNdcs.value = selectedTemplate.ndcs;
};

onMounted(() => {
	setTemplate();
});

const resetValidity = (key: string) => {
	input[key].isValid = true;
};

const removeNdc = (ndc_id: string) => {
	templateNdcs.value = templateNdcs.value.filter((ndc) => ndc !== ndc_id);
};

const searchNdc = async () => {
	ndcs.value = await ndcStore.searchNdc(input.ndc_id.val);
};

const templateNdcs = ref([] as string[]);

const selectNdc = async (ndc: NDC) => {
	await ndcStore.setSelectedNdc(ndc);
	selectedNdc.value = ndcStore.getSelectedNdc;
	templateNdcs.value.push(ndc.ndc_id);
	isAddingNdc.value = false;
};

const validateForm = () => {
	formIsValid.value = true;
	for (let key in input) {
		if (key !== "ndc_id") {
			if (input[key].val?.length === 0) {
				console.log("input is incorrect");
				input[key].isValid = false;
				formIsValid.value = false;
			}
		}
	}
};

const addTemplate = async () => {
	await validateForm();
	uiStore.toggleFunctionLoading(true);
	if (formIsValid.value) {
		const template: Template = {
			template_id: selectedTemplate.template_id,
			user_id: authStore.user_id,
			name: input.name.val,
			qty: Number(input.qty.val),
			daySupply: Number(input.daySupply.val),
			sigCode: input.sigCode.val,
			date_added: new Date(),
			ndcs: templateNdcs.value,
		};
		try {
			await templateStore.addTemplate(template);
			router.push("/dispense");
		} catch (err) {
			console.log(err);
		}
	}
	uiStore.toggleFunctionLoading(false);
};

const deleteTemplate = async () => {
	uiStore.toggleFunctionLoading(true);
	await templateStore.deleteTemplate(selectedTemplate.template_id);
	uiStore.toggleFunctionLoading(false);
	router.push("/dispense");
};
</script>

<style scoped>
p {
	@apply px-2 py-1 rounded-lg;
}
</style>
