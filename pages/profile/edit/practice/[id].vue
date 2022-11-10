<template>
	<div>
		<h3 class="header">Edit Profile</h3>
		<transition name="fade" mode="out-in">
			<ProfilePracticeEdit />
		</transition>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~~/stores/profile";
import { Profile } from "~~/types/types";

const route = useRoute();

const profileStore = useProfileStore();

const profile = reactive<Profile>({
	user_id: "",
	username: "",
	email: "",
	type: "practice",
	admin: false,
	practice_id: "",
	rep_id: "",
	created_at: new Date(),
	modified_at: new Date(),
});

onMounted(async () => {
	let id = route.params.id;
	let selectedProfile = await profileStore.fetchProfile(id);
	for (let key in profile) {
		profile[key as keyof Profile] = selectedProfile[key as keyof Profile];
	}
});
</script>

<style scoped></style>
