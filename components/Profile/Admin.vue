<template>
	<div v-if="authStore.isAdmin">
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
const selectedRadio = ref(radioTypes[0].id);
const handleRadioChange = (radioType: string) => {
	selectedRadio.value = radioType;
};
const selectedProfile = ref<Profile | null>(null);

const searchProfiles = async () => {
	// search by name
	if (authStore.isAdmin) {
		const profiles = await profileStore.adminFetchProfiles(searchInput.value);
	}
};
</script>
