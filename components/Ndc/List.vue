<template>
	<div>
		<div class="flex flex-col my-2 w-11/12 mx-auto">
			<div class="text-primary dark:text-darkSecondary grid grid-cols-4 p-2">
				<div class="">NDC</div>
				<div class="">Drug Name</div>
				<div class="">Cost</div>
				<div class="">Inventory</div>
			</div>
			<div
				v-if="paginatedNdcs.length > 0"
				v-for="ndcObj in paginatedNdcs"
				:key="ndcObj.ndc_id"
				class="text-primary dark:text-darkSecondary grid grid-cols-4 rounded hover:bg-darkSecondary dark:hover:bg-black w-full p-2 cursor-pointer"
				@click="emits('selected', ndcObj)"
			>
				<div class="">{{ ndcObj.ndc_id }}</div>
				<div class="">{{ ndcObj.name.toTitle() }}</div>
				<div class="">{{ ndcObj.cost }}</div>
				<div class="">{{ ndcObj.inventory }}</div>
			</div>
			<div
				v-else
				class="text-primary dark:text-darkSecondary flex flex-col items-center justify-center rounded w-full p-2 my-12 text-lg gap-8"
			>
				<p>No NDC's Found</p>
				<p
					class="btn reverse hover:cursor-pointer"
					@click="$router.push('/dispense/add-ndc')"
				>
					Click to Add an NDC
				</p>
			</div>
		</div>
		<div class="flex justify-center gap-2" v-if="checkNdc">
			<p
				v-if="page > 1"
				class="rounded-3xl hover:bg-darkSecondary hover:cursor-pointer dark:hover:bg-black p-2 px-3"
				@click="backPage"
			>
				Back
			</p>
			<p class="p-2">{{ page }} ... {{ totalPages == 1 ? "" : totalPages }}</p>
			<p
				v-if="totalPages > 1"
				class="rounded-3xl hover:bg-darkSecondary hover:cursor-pointer dark:hover:bg-black py-2 px-3"
				@click="nextPage"
			>
				Next
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import "~~/types/string.extensions";
import { NDC } from "~/types/types";
const emits = defineEmits<{
	(e: "selected", ndc: NDC): void;
}>();
const props = defineProps<{
	ndcs: NDC[];
}>();

const checkNdc = computed(() => {
	if (props.ndcs.length > 0) {
		return true;
	}
	return false;
});
const page = ref(1);
const perPage = ref(11);
watch(
	() => props.ndcs.length,
	() => {
		page.value = 1;
	}
);

const totalPages = computed(() => {
	return Math.ceil(props.ndcs.length / perPage.value);
});

const paginatedNdcs = computed(() => {
	let start = (page.value - 1) * perPage.value;
	let end = start + (perPage.value - 1);
	return props.ndcs.slice(start, end);
});
const backPage = () => {
	page.value--;
};
const nextPage = () => {
	page.value++;
};
</script>

<style scoped></style>
