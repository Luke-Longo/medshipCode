import { useAuthStore } from "~~/stores/auth";
import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	if (!authStore.isLoggedIn) {
		if (!authStore.isLoggedIn && to.name !== "auth") {
			return navigateTo("/auth");
		} else if (authStore.isLoggedIn && to.name === "auth") {
			return navigateTo("/loading");
		}
	} else if (to.hash.includes("recovery")) {
		authStore.setResettingPassword(true);
	} else if (authStore.isLoggedIn && to.name === "auth") {
		return navigateTo("/");
	}
});
