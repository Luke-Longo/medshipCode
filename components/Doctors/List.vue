<template>
	<div>
		<div class="flex flex-col my-2 w-11/12 mx-auto">
			<div class="text-primary dark:text-darkSecondary grid grid-cols-4 p-2">
				<div class="">Last Name</div>
				<div class="">First Name</div>
				<div class="">NPI</div>
				<div class="">DEA</div>
			</div>
			<div
				v-if="paginatedDoctors.length > 0"
				v-for="doctor in paginatedDoctors"
				:key="doctor.id"
				class="text-primary dark:text-darkSecondary grid grid-cols-4 rounded hover:bg-darkSecondary dark:hover:bg-black w-full p-2 cursor-pointer"
				@click="emits('selected', doctor)"
			>
				<div class="">{{ doctor.lastName.toTitle() }}</div>
				<div class="">{{ doctor.firstName.toTitle() }}</div>
				<div class="">{{ doctor.npi }}</div>
				<div class="">{{ doctor.dea }}</div>
			</div>
			<div
				v-else
				class="text-primary dark:text-darkSecondary flex flex-col items-center justify-center rounded w-full p-2 my-12 text-lg gap-8"
			>
				<p>No Doctors Found</p>
				<p
					class="btn reverse hover:cursor-pointer"
					@click="$router.push('/doctors/add-edit')"
				>
					Click to Add a Doctor
				</p>
			</div>
		</div>
		<div class="flex justify-center gap-2" v-if="checkDoctors">
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
import { Doctor } from "~/types/types";
const emits = defineEmits<{
	(e: "selected", doctor: Doctor): void;
}>();
const props = defineProps<{
	doctors: Doctors[];
}>();

const checkDoctors = computed(() => {
	if (props.doctors.length > 0) {
		return true;
	}
	return false;
});
const page = ref(1);
const perPage = ref(11);
watch(
	() => props.doctors.length,
	() => {
		page.value = 1;
	}
);

const totalPages = computed(() => {
	return Math.ceil(props.doctors.length / perPage.value);
});

const paginatedDoctors = computed(() => {
	let start = (page.value - 1) * perPage.value;
	let end = start + (perPage.value - 1);
	return props.doctors.slice(start, end);
});
const backPage = () => {
	page.value--;
};
const nextPage = () => {
	page.value++;
};
</script>
