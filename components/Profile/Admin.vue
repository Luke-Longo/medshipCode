<template>
	<div v-if="authStore.isAdmin">
		<UiRadio :radioTypes="radioTypes" v-model="selectedRadio" />
		<UiSearchInline
			:label="'Profiles'"
			v-model="searchInput"
			@search="searchProfiles"
		/>
		<transition name="fade" mode="out-in">
			<div v-if="selectedProfile !== null">
				<UiRadio :radioTypes="radioTypes" v-model="selectedRadio" />
				<transition name="fade" mode="out-in">
					<ProfilePractice
						v-if="selectedRadio === 'practice'"
						@toRep="handleRadioChange('salesRep')"
					/>
					<ProfileRep v-else-if="selectedRadio === 'salesRep'" />
				</transition>
			</div>
		</transition>
		<div>
			<UiTable
				:cols="cols"
				:gridCols="gridCols"
				:tableData="profiles"
				:properties="properties"
				:dropdownItems="dropdownItems"
				@itemClicked="handleItemClick"
				:pageLength="10"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~/stores/profile";
import { useAuthStore } from "~/stores/auth";
import { Profile } from "~/types/types";

const searchInput = ref("");
const profileStore = useProfileStore();
const authStore = useAuthStore();

const radioTypes = [
	{
		id: "practice",
		label: "Practice",
	},
	{
		id: "salesRep",
		label: "Sales Rep",
	},
];

const cols = ref(["Type", "Username"]);

const properties = ref(["type", "username"]);

const gridCols = ref("grid-cols-3");

const dropdownItems = ref([
	{
		id: "1",
		label: "Edit",
	},
	{
		id: "2",
		label: "Delete",
	},
]);

const handleItemClick = (id: string) => {
	if (id === "1") {
		console.log("edit");
	} else if (id === "2") {
		console.log("delete");
	}
};

const selectedRadio = ref(radioTypes[0].id);
const handleRadioChange = (radioType: string) => {
	selectedRadio.value = radioType;
};
const selectedProfile = ref<Profile | null>(null);
const profiles = ref([] as Profile[]);

const searchProfiles = async () => {
	// search by name

	if (authStore.isAdmin) {
		profiles.value = await profileStore.adminFetchProfiles(
			searchInput.value,
			selectedRadio.value
		);
	}
};
</script>
