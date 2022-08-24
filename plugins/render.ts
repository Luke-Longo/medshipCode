import { useUiStore } from "~~/stores/ui";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.hook("page:start", () => {
		const uiStore = useUiStore();
		uiStore.toggleAppLoading(true);
	});
});
