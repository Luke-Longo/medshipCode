<template>
	<div class="my-6">
		<h3 class="header">Patients</h3>
		<UiActionButtons :action-props="actionProps" @actionClicked="handleAction" />
		<PatientsImporter />
		<UiModal :show="searching" :title="'Search Patient'" @close="handleClose">
			<div class="form-group">
				<label for="">Patients Name</label>
				<input type="text" v-model="searchInput" />
			</div>
			<div class="flex my-4">
				<button class="mx-auto" @click="handleSearch">Search</button>
			</div>
			<PatientsList
				:patients="filteredPatients.length > 0 ? filteredPatients : []"
				@selected="handleSelected"
			/>
		</UiModal>
		<transition name="fade">
			<div v-if="showCalendar" class="w-full h-full mx-auto">
				<div class="modal-backdrop" @click.self="handleClose">
					<div class="modal">
						<UiCalendar class="mx-auto" @day-selected="dateSelected($event)" />
					</div>
				</div>
			</div>
		</transition>
		<UiModal
			:show="showCalendar ? false : scheduling"
			:title="'Schedule Patients'"
			@close="handleClose"
		>
			<div>
				<div class="form-group">
					<label for="">Patients Name</label>
					<input type="text" v-model="searchInput" />
				</div>
				<div class="flex my-4">
					<button class="mx-auto" @click="handleSearch">Search</button>
				</div>
				<PatientsList
					:patients="filteredPatients.length > 0 ? filteredPatients : []"
					@selected="handleSelected"
				/>
			</div>
		</UiModal>
	</div>
</template>

<script setup lang="ts">
import IconUser from "~icons/fa-solid/user";
import IconSearch from "~icons/fa-solid/search";
import IconCalendar from "~icons/fa-solid/calendar";
import { usePatientStore } from "~/stores/patients";
import { Patient, ActionProps } from "~~/types/types";

const router = useRouter();
const searching = ref(false);
const scheduling = ref(false);
const showCalendar = ref(false);
const actionProps: ActionProps[] = [
	{
		id: "addPatient",
		name: "Add Patient",
		icon: IconUser,
	},
	{
		id: "searchPatient",
		name: "Search Patient",
		icon: IconSearch,
	},
	{
		id: "schedulePatient",
		name: "Schedule Patients",
		icon: IconCalendar,
	},
];
const patientStore = usePatientStore();
const searchInput = ref("");
const filteredPatients = ref([] as Patient[]);

const handleAction = async (action: string) => {
	if (action === "addPatient") {
		router.push("/patients/add");
	} else if (action === "searchPatient") {
		searching.value = true;
	} else if (action === "schedulePatient") {
		showCalendar.value = true;
		scheduling.value = true;
	}
};
const handleSearch = async () => {
	let searchedPatients = await patientStore.searchPatient(searchInput.value);
	filteredPatients.value = searchedPatients;
};
const handleSelected = (patient: Patient) => {
	patientStore.setSelectedPatient(patient);
	router.push(`/patients/patient-profile/${patient.patient_id}`);
};
const handleClose = () => {
	searching.value = false;
	scheduling.value = false;
	showCalendar.value = false;
};
const dateSelected = (date: Date) => {
	console.log(date);
	showCalendar.value = false;
};
</script>

<style scoped>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	overflow-x: auto;
}
.form-group {
	@apply flex flex-col gap-2 justify-center  ml-7 lg:w-2/3 lg:mx-auto text-primary dark:text-darkSecondary;
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
