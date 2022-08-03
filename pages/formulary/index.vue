<template>
	<div>
		<h3 class="header">Formulary</h3>
		<UiActionButtons :action-props="actionProps" />
	</div>
</template>

<script setup lang="ts">
import IconCapsules from "~icons/fa-solid/capsules";
import IconInventory from "~icons/fa-solid/clipboard-list";
import IconTemplate from "~icons/fa-solid/copy";
import { ActionProps } from "~~/types/types";

const searching = ref(false);

const router = useRouter();

const actionProps: ActionProps[] = [
	{
		id: "addDrug",
		name: "Add/Edit Drug",
		icon: IconCapsules,
	},
	{
		id: "manageInventory",
		name: "Manage Inventory",
		icon: IconInventory,
	},
	{
		id: "setupTemplate",
		name: "Setup Template",
		icon: IconTemplate,
	},
];

const handleAction = async (action: string) => {
	if (action === "dispense") {
	} else if (action === "addDrug") {
	} else if (action === "setupTemplate") {
	} else if (action === "setupAutomation") {
	}
};
</script>
