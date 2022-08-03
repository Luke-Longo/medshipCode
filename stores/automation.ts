import { defineStore } from "pinia";
import { Automation } from "~~/types/types";

export const useAutomationStore = defineStore("automation", {
	state: () => ({
		automations: [] as Automation[],
		selectedAutomation: null as string,
		lastFetch: null as Date,
	}),
	getters: {
		getAutomations: (state) => state.automations,
		getSelectedAutomation: (state: any) => state.selectedAutomation,
		hasAutomations: (state: any) => state.automations.length > 0,
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
		setAutomations(automations: Automation[]) {
			this.automations = automations;
		},
		setSelectedAutomation(automation: Automation) {
			this.selectedAutomation = automation;
		},
		async fetchAutomations() {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase.from("automations").select("*");
				if (error) {
					throw error;
				}
				this.automations = data;
			} catch (e) {
				console.log(e);
			}
		},
	},
});
