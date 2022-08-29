import { defineStore } from "pinia";
import { Practice, Profile, SalesRep } from "~/types/types";

export const useProfileStore = defineStore("profile", {
	state: () => ({
		profile: null as Profile,
		adminSelectedProfile: null as Profile,
		practice: null as Practice,
		salesRep: null as SalesRep,
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
		async setProfile(profile: Profile) {
			this.profile = profile;
			if (profile.type === "salesRep") {
			}
		},
		async setSalesRep(id) {
			// try {
			// 	const { $supabase } = useNuxtApp();
			// 	const { data, error } = await $supabase
			// 		.from("sales_reps")
			// 		.select("*")
			// 		.eq("rep_id", id);
			// 	if (error) {
			// 		throw error;
			// 	}
			// } catch (error) {
			// 	console.log(error);
			// }
			try {
				const { $supabase } = useNuxtApp();
				const { data, error } = await $supabase
					.from("profiles")
					.select(
						`
					rep_id (
						*
					)
					`
					)
					.eq("rep_id", id);
				console.log(data);
				if (error) {
					throw error;
				}
			} catch (error) {
				console.log(error);
			}
		},
		async getChildrenReps(ids: string[]) {
			try {
				const { $supabase } = useNuxtApp();
				const { data, error } = await $supabase
					.from("sales_reps")
					.select("*")
					.in("rep_id", ids);
				if (error) {
					throw error;
				}
				return data;
			} catch (error) {
				console.log(error);
			}
		},
		async getParentRep(id) {
			try {
				const { $supabase } = useNuxtApp();
				const { data, error } = await $supabase
					.from("sales_reps")
					.select("*")
					.eq("rep_id", id);
				if (error) {
					throw error;
				}
				return data[0];
			} catch (error) {
				console.log(error);
			}
		},
		setAdminSelectedProfile(profile: Profile) {
			this.selectedProfile = profile;
		},
		async fetchProfile(id?) {
			const { $supabase } = useNuxtApp();
			if (id) {
				try {
					const { data, error } = await $supabase
						.from("profiles")
						.select("*")
						.eq("user_id", id);
					if (error) {
						throw error;
					}
					console.log(data);
					this.setProfile(data[0]);
					return data[0];
				} catch (error) {
					console.log(error);
				}
			} else {
				try {
					const { data, error } = await $supabase.from("profiles").select("*");
					if (error) {
						throw error;
					}
					this.setProfile(data[0]);
				} catch (error) {
					console.log(error);
				}
			}
		},
		async adminFetchProfiles(input, filter?) {
			const { $supabase } = useNuxtApp();
			if (input.split(" ").length > 1) {
				let terms = input.split(" ");
				try {
					console.log(terms);
					const { data, error } = await $supabase
						.from("profiles")
						.select("*")
						.or(
							`username.in.(${terms}),email.in.(${terms}),username.like.%${terms[0]}%,email.like.%${terms[1]}%,username.like.%${terms[0]}%,email.like.%${terms[1]}%`
						)
						.neq("admin", true)
						.eq("type", filter);
					if (error) {
						throw error;
					}
					console.log(data);
					return data;
				} catch (error) {
					console.log(error);
				}
			} else {
				try {
					const { data, error } = await $supabase
						.from("profiles")
						.select("*")
						.or(`username.like.%${input}%,email.like.%${input}%`)
						.neq("admin", true)
						.eq("type", filter);
					if (error) {
						throw error;
					}
					return data;
				} catch (error) {
					console.log(error);
				}
			}
		},
		clear() {
			this.profile = null;
		},
	},
});
