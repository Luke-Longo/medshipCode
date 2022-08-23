import { defineStore } from "pinia";
import { Profile } from "~/types/types";

export const useProfileStore = defineStore("profile", {
	state: () => ({
		profile: null as Profile,
	}),
	getters: {
		isAdmin(state) {
			return state.profile && state.profile.admin;
		},
		isPractice(state) {
			return state.profile.practice_id;
		},
		isRep(state) {
			return state.profile.rep_id;
		},
	},
	actions: {
		setProfile(profile: Profile) {
			this.profile = profile;
		},
		async fetchProfile() {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase.from("profiles").select("*");
				if (error) {
					throw error;
				}
				this.setProfile(data[0]);
			} catch (error) {
				console.log(error);
			}
		},
		async adminFetchProfiles() {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase.from("profiles").select("*");
				if (error) {
					throw error;
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		clear() {
			this.profile = null;
		},
	},
});
