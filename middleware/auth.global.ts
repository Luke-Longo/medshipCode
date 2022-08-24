import { useAuthStore } from "~~/stores/auth";
import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	const uiStore = useUiStore();
	if (!authStore.isLoggedIn && to.path !== "/auth") {
		uiStore.toggleAppLoading(true);
		if (!authStore.isLoggedIn) {
			return navigateTo("/auth");
		}
	} else if (to.hash.includes("recovery")) {
		authStore.setResettingPassword(true);
	} else if (authStore.isLoggedIn && to.path === "/auth") {
		return navigateTo("/");
	}
});
