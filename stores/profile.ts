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
		async adminFetchProfiles(input) {
			const { $supabase } = useNuxtApp();
			if (input.split(" ").length > 1) {
				input = input.split(" ");
				try {
					const { data, error } = await $supabase
						.from("profiles")
						.select("*")
						.textSearch("email", `${input[0]} | ${input[1]}`);
					if (error) {
						throw error;
					}
					return data;
				} catch (error) {
					console.log(error);
				}
			}
			try {
				const { data, error } = await $supabase
					.from("profiles")
					.select("*")
					.textSearch("email", `input`);
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
