<template>
	<div>
		<h3 class="header">Prescription Log</h3>
		<UiActionButtons :action-props="actionProps" />
	</div>
</template>

<script setup lang="ts">
import IconPrescription from "~icons/fa-solid/prescription";
import IconInventory from "~icons/fa-solid/clipboard-list";
import IconTemplate from "~icons/fa-solid/copy";
import { ActionProps } from "~~/types/types";

const searching = ref(false);

const router = useRouter();

const actionProps: ActionProps[] = [
	{
		id: "viewLog",
		name: "View RX Log",
		icon: IconPrescription,
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
</script>
