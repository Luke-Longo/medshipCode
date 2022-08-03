<template>
	<div class="">
		<h3 class="header">Dispense</h3>
		<UiActionButtons :action-props="actionProps" @actionClicked="handleAction" />
		<UiModal :show="searchingNdc" :title="'Search NDCs'" @close="handleClose">
			<div class="form-group">
				<label for="">NDC</label>
				<input type="text" v-model="searchInput" />
			</div>
			<div class="flex my-4">
				<button class="mx-auto" @click="handleSearch('ndc')">Search</button>
			</div>

			<NdcList
				:ndcs="filteredNdc?.length > 0 ? filteredNdc : []"
				@selected="handleSelected('ndc', $event)"
			/>
		</UiModal>
		<UiModal
			:show="searchingTemplates"
			:title="'Search Templates'"
			@close="handleClose"
		>
			<div class="form-group">
				<label for="">Template Name</label>
				<input type="text" v-model="searchInput" />
			</div>
			<div class="flex my-4">
				<button class="mx-auto" @click="handleSearch('templates')">Search</button>
			</div>
			<UiList
				:items="filteredTemplates?.length > 0 ? filteredTemplates : []"
				:item-name="'Template'"
				:list="['name', 'sigCode', 'daySupply', 'qty']"
				@add="$router.push('/dispense/add-template')"
				@selected="handleSelected('templates', $event)"
			/>
		</UiModal>
		<UiModal
			:show="searchingAutomation"
			:title="'Search Automation'"
			@close="handleClose"
		>
			<div class="form-group">
				<label for="">Automation Name</label>
				<input type="text" v-model="searchInput" />
			</div>
			<div class="flex my-4">
				<button class="mx-auto" @click="handleSearch('automation')">Search</button>
			</div>
			<UiList
				:items="filteredAutomation?.length > 0 ? filteredAutomation : []"
				:item-name="'Automation'"
				:list="['name', 'ndc', 'template']"
				@add="$router.push('/dispense/add-automation')"
				@selected="handleSelected('automation', $event)"
			/>
		</UiModal>
	</div>
</template>

<script setup lang="ts">
import IconPrescription from "~icons/fa-solid/prescription-bottle";
import IconCapsules from "~icons/fa-solid/capsules";
import IconTemplate from "~icons/fa-solid/copy";
import IconAutomation from "~icons/fa-solid/cogs";
import { ActionProps, NDC, Template, Automation } from "~~/types/types";
import { useUiStore } from "~~/stores/ui";
import { useNdcStore } from "~~/stores/ndc";
import { useTemplateStore } from "~~/stores/template";
import { useAutomationStore } from "~~/stores/automation";

const searchingNdc = ref(false);
const searchingTemplates = ref(false);
const searchingAutomation = ref(false);
const filteredNdc = ref([] as NDC[]);
const filteredTemplates = ref([] as Template[]);
const filteredAutomation = ref([] as Automation[]);
const searchInput = ref("");
const uiStore = useUiStore();
const ndcStore = useNdcStore();
const templateStore = useTemplateStore();
const automationStore = useAutomationStore();

const router = useRouter();

const actionProps: ActionProps[] = [
	{
		id: "dispense",
		name: "Dispense",
		icon: IconPrescription,
	},
	{
		id: "addNdc",
		name: "Add/Edit NDC",
		icon: IconCapsules,
	},
	{
		id: "setupTemplate",
		name: "Setup Template",
		icon: IconTemplate,
	},
	{
		id: "setupAutomation",
		name: "Setup Automation",
		icon: IconAutomation,
	},
];

const handleAction = async (action: string) => {
	if (action === "dispense") {
	} else if (action === "addNdc") {
		searchingNdc.value = true;
	} else if (action === "setupTemplate") {
		searchingTemplates.value = true;
	} else if (action === "setupAutomation") {
		searchingAutomation.value = true;
	}
};

const automateDispense = async () => {
	const res = await $fetch("/api/mdScripts");
	console.log(res);
};

const handleSearch = async (id: string) => {
	if (id === "ndc") {
		searchingNdc.value = true;
		let searchedNdc = await ndcStore.searchNdc(searchInput.value);
		filteredNdc.value = searchedNdc;
	} else if (id === "templates") {
		searchingTemplates.value = true;
		let searchedTemplates = await templateStore.searchTemplates(
			searchInput.value
		);
		filteredTemplates.value = searchedTemplates;
	} else if (id === "automation") {
		searchingAutomation.value = true;
		let searchedAutomation = await automationStore.searchAutomation(
			searchInput.value
		);
		filteredAutomation.value = searchedAutomation;
	}
};
const handleSelected = async (id: string, item: any) => {
	if (id === "ndc") {
		uiStore.toggleFunctionLoading(true);
		await ndcStore.setSelectedNdc(item as NDC);
		router.push(`/dispense/ndc-profile/${item.ndc_id}`);
		uiStore.toggleFunctionLoading(false);
	} else if (id === "templates") {
		uiStore.toggleFunctionLoading(true);
		await templateStore.setSelectedTemplate(item as Template);
		router.push(`/dispense/template-profile/${item.template_id}`);
		uiStore.toggleFunctionLoading(false);
	} else if (id === "automation") {
		uiStore.toggleFunctionLoading(true);
		await automationStore.setSelectedAutomation(item as Automation);
		router.push(`/dispense/automation-profile/${item.automation_id}`);
		uiStore.toggleFunctionLoading(false);
	}
};
const handleClose = () => {
	if (searchingNdc.value) {
		searchingNdc.value = false;
		filteredNdc.value = [];
	} else if (searchingTemplates.value) {
		searchingTemplates.value = false;
		filteredTemplates.value = [];
	} else if (searchingAutomation.value) {
		searchingAutomation.value = false;
		filteredAutomation.value = [];
	}
};
</script>

<style scoped>
.form-group {
	@apply flex flex-col gap-2 justify-center  mx-7 lg:w-2/3 lg:mx-auto text-primary dark:text-darkSecondary;
}
.form-group label {
	@apply text-lg font-semibold items-start;
}
.form-group input {
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 3px;
	@apply border shadow-sm border-slate-300 placeholder-slate-400 dark:bg-darkBg dark:focus:outline-darkPrimary;
}
p {
	@apply text-primary dark:text-darkSecondary;
}
</style>
