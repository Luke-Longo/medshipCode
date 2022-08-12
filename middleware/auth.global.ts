import { useAuthStore } from "~~/stores/auth";
// import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore();
	if (to.hash.includes("recovery")) {
		console.log("to.hash", to.hash);
		return navigateTo("/recovery");
	}
	if (!authStore.isLoggedIn && to.path !== "/auth" && to.path !== "/recovery") {
		return navigateTo("/auth");
	} else if (authStore.isLoggedIn && to.path === "/auth") {
		return navigateTo("/");
	} else if (to.path === "/recovery" && from.path !== "/recovery" && to.hash) {
		return navigateTo("/recovery");
	}
});
