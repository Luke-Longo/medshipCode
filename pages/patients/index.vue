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
						<UiCalendar class="w-96 mx-auto" @day-selected="dateSelected($event)" />
					</div>
				</div>
			</div>
		</transition>
		<UiModal
			:show="showCalendar ? false : scheduling"
			:title="'Schedule Patients'"
			@close="handleClose"
		>
			<h3 class="text-center pb-3 trans">
				Schedule Date: {{ selectedDate!.toDateString() }}
			</h3>
			<transition name="fade" mode="out-in">
				<div v-if="!isProviderSelected">
					<h3 class="text-center py-2">Choose Provider</h3>
					<div class="flex justify-center">
						<p
							class="px-4 py-3 rounded-3xl hover:bg-darkSecondary hover:cursor-pointer dark:hover:bg-black trans"
							v-for="provider in providers"
							@click="selectProvider(provider)"
						>
							{{ provider.first_name }} {{ provider.last_name }}
						</p>
					</div>
				</div>
				<div v-else class="flex gap-3 justify-center">
					<h3 class="text-center pb-3 trans">
						Provider: {{ selectedProvider!.first_name }}
						{{ selectedProvider!.last_name }}
					</h3>
					<p @click="changeProvider" class="hover:cursor-pointer hover:underline">
						Change Provider
					</p>
				</div>
			</transition>
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
					@selected="handleSchedule"
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
import { useAuthStore } from "~/stores/auth";
import { useScheduleStore } from "~/stores/schedule";
import { Patient, ActionProps, Provider, Schedule } from "~~/types/types";

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
const isProviderSelected = ref<boolean>(false);
const patientStore = usePatientStore();
const authStore = useAuthStore();
const scheduleStore = useScheduleStore();
const searchInput = ref("");
const filteredPatients = ref([] as Patient[]);
const selectedDate = ref(null as Date | null);
const selectedProvider = ref(null as Provider | null);

const providers = ref<Provider[]>([
	{
		id: useUuid(),
		first_name: "John",
		last_name: "Doe",
		npi: "",
		dob: "",
		date_added: new Date(),
		user_id: authStore.user_id,
		modified_at: new Date(),
		practice_id: "",
	},
]);

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
	let searchedPatients: Patient[] = await patientStore.searchPatient(
		searchInput.value
	);
	filteredPatients.value =
		searchedPatients!.length > 0 ? searchedPatients : ([] as Patient[]);
};
const handleSelected = (patient: Patient) => {
	patientStore.setSelectedPatient(patient);
	router.push(`/patients/patient-profile/${patient.id}`);
};
const handleClose = () => {
	searching.value = false;
	scheduling.value = false;
	showCalendar.value = false;
};
const dateSelected = (date: Date) => {
	selectedDate.value = date;
	showCalendar.value = false;
};
const selectProvider = (provider: Provider) => {
	selectedProvider.value = provider;
	isProviderSelected.value = true;
};

const handleSchedule = (patient: Patient) => {
	// patientStore.schedulePatient(patient, selectedDate.value);
	let schedule: Schedule = {
		patients: [
			{
				id: patient.id,
				first_name: patient.first_name,
				last_name: patient.last_name,
			},
		],
		provider: {
			npi: selectedProvider.value!.npi,
			first_name: selectedProvider.value!.first_name,
			last_name: selectedProvider.value!.last_name,
		},
		date: selectedDate.value!.toISOString().split("T")[0],
		user_id: authStore.user_id,
		modified_at: new Date(),
	};
	scheduleStore.addSchedule(schedule);
	scheduling.value = false;
};
const changeProvider = () => {
	isProviderSelected.value = false;
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
