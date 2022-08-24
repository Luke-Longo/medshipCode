import { useUiStore } from "~~/stores/ui";

export default defineNuxtPlugin(async (nuxtApp) => {
	nuxtApp.hook("page:start", async () => {
		const uiStore = useUiStore();
		console.log("page:start");
		await useLoadContent();
	});
});
