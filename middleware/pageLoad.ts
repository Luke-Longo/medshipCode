import { useAuthStore } from "~~/stores/auth";
import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	const uiStore = useUiStore();
	if (!authStore.isLoggedIn) {
		uiStore.toggleAppLoading(true);
		await authStore.checkRefresh();
	}
});
