import { addTemplate } from "@nuxt/kit";
import { defineStore } from "pinia";
import { Template } from "~~/types/types";

export const useTemplateStore = defineStore("template", {
	state: () => ({
		templates: [] as Template[],
		selectedTemplate: null as string,
		lastFetch: null as Date,
	}),
	getters: {
		getTemplates: (state: any) => state.templates,
		getSelectedTemplate: (state: any) => state.selectedTemplate,
		hasTemplates: (state: any) => state.templates.length > 0,
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
		setTemplates(templates: Template[]) {
			this.templates = templates;
		},
		setSelectedTemplate(template: Template) {
			this.selectedTemplate = template;
		},
		async fetchTemplates() {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase.from("templates").select("*");
				if (error) {
					throw error;
				}
				this.templates = data;
			} catch (e) {
				console.log(e);
			}
		},
		async addTemplate(template: Template) {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase
					.from("templates")
					.select("*")
					.eq("template_id", template.template_id);
				if (data.length === 0) {
					const { error } = await $supabase.from("templates").insert(template);
				} else {
					console.log("upserting template");
					const { error } = await $supabase.from("templates").upsert(template);
				}
				if (error) {
					throw error;
				}
			} catch (err) {
				console.log(err);
			}
		},
		async searchTemplates(searchTerms) {
			const { $supabase } = useNuxtApp();
			console.log("searching inside the store");
			if (searchTerms.split(" ").length > 1) {
				const terms = searchTerms.split(" ");
				try {
					const { data, error } = await $supabase
						.from("templates")
						.select("*")
						.or(
							`name.in.(${terms}),sigCode.in.(${terms}),name.like.%${terms[0]}%,ndcs.cs.${terms}`
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
				const terms = [];
				terms.push(term);
				try {
					const { data, error } = await $supabase
						.from("templates")
						.select("*")
						.or(
							`name.eq.${term},sigCode.eq.${term},name.like.%${term}%,ndcs.cs.{${terms}}`
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
		async deleteTemplate(template_id: string) {
			const { $supabase } = useNuxtApp();
			try {
				const { error } = await $supabase
					.from("templates")
					.delete()
					.eq("template_id", template_id);
				if (error) {
					throw error;
				}
			} catch (err) {
				console.log(err);
			}
		},
	},
});
