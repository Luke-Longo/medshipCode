import { defineStore } from "pinia";
import { NDC } from "~~/types/types";

export const useNdcStore = defineStore("ndc", {
	state: () => ({
		ndcs: [] as NDC[],
		selectedNdc: null as NDC,
		lastFetch: null as Date,
	}),
	getters: {
		getNdcs: (state: any) => state.ndcs,
		getSelectedNdc: (state: any) => state.selectedNdc,
		hasNdcs: (state: any) => state.ndcs.length > 0,
		shouldUpdate: (state: any) => {
			const lastFetch = state.lastFetch;
			if (!lastFetch) {
				return true;
			}
			const currentTimeStamp = new Date().getTime();
			return (currentTimeStamp - lastFetch.getTime()) / 1000 > 60;
		},
	},
	actions: {
		setSelectedNdc(ndc: NDC) {
			this.selectedNdc = ndc;
		},
		async fetchNdcs() {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase.from("ndcs").select("*");
				if (error) {
					throw error;
				}
				this.ndcs = data;
			} catch (e) {
				console.log(e);
			}
		},
		async addNdc(ndc: NDC) {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase
					.from("ndcs")
					.select()
					.eq("ndc_id", ndc.ndc_id);
				if (error) {
					throw error;
				}
				if (data.length === 0) {
					const { error } = await $supabase.from("ndcs").insert(ndc);
					if (error) {
						throw error;
					}
				} else {
					console.log("upserting NDC");
					ndc.ndc_id = data[0].ndc_id;
					ndc.date_added = data[0].date_added;
					const { error } = await $supabase.from("ndcs").upsert(ndc);
					if (error) {
						throw error;
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		async searchNdc(searchTerms) {
			const { $supabase } = useNuxtApp();
			if (searchTerms?.split(" ").length > 1) {
				const terms = searchTerms.split(" ");
				try {
					const { data, error } = await $supabase
						.from("ndcs")
						.select("*")
						.or(
							`name.in.(${terms}),genericName.in.(${terms}),ndc_id.in(${terms}),name.like.%${terms[0]}%,genericName.like.%${terms[0]}%`
						);
					if (error) {
						throw error;
					}
					return data;
				} catch (e) {
					console.log(e);
				}
			} else {
				const term = searchTerms;
				try {
					const { data, error } = await $supabase
						.from("ndcs")
						.select("*")
						.or(
							`name.eq.${term},genericName.eq.${term},ndc_id.eq.${term},name.like.%${term}%,genericName.like.%${term}%,ndc_id.like.%${term}%`
						);
					if (error) {
						throw error;
					}
					return data;
				} catch (e) {
					console.log(e);
				}
			}
		},
		async deleteNdc(ndc_id: string) {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase
					.from("ndcs")
					.delete()
					.eq("ndc_id", ndc_id);
				if (error) {
					throw error;
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
});
