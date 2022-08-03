<template>
	<div>
		<h3 class="header">Doctors</h3>
		<UiActionButtons
			:action-props="actionProps"
			@action-clicked="searching = true"
		/>
		<UiModal :show="searching" :title="'Search Doctor'" @close="handleClose">
			<div class="form-group">
				<label for="">Doctors Name</label>
				<input type="text" v-model="searchInput" />
			</div>
			<div class="flex my-4">
				<button class="mx-auto" @click="handleSearch">Search</button>
			</div>
			<DoctorsList
				:doctors="filteredDoctors?.length > 0 ? filteredDoctors : []"
				@selected="handleSelected"
			/>
		</UiModal>
	</div>
</template>

<script setup lang="ts">
import IconPrescription from "~icons/fa-solid/user-md";
import { ActionProps, Doctor } from "~~/types/types";
import { useDoctorsStore } from "~/stores/doctors";
import { useUiStore } from "~~/stores/ui";

const uiStore = useUiStore();
const doctorStore = useDoctorsStore();

const searching = ref(false);
const searchInput = ref("");

const router = useRouter();

const actionProps: ActionProps[] = [
	{
		id: "addDoctor",
		name: "Add/Edit Doctor",
		icon: IconPrescription,
	},
];
const filteredDoctors = ref([] as Doctor[]);
const handleSearch = async () => {
	searching.value = true;
	let searchedDoctors = await doctorStore.searchDoctors(searchInput.value);
	filteredDoctors.value = searchedDoctors;
};
const handleSelected = async (doctor: Doctor) => {
	uiStore.toggleFunctionLoading(true);
	await doctorStore.setSelectedDoctor(doctor);
	router.push(`/doctors/doctor-profile/${doctor.doctor_id}`);
	uiStore.toggleFunctionLoading(false);
};
const handleClose = () => {
	searching.value = false;
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
