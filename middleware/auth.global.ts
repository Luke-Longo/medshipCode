import { useAuthStore } from "~~/stores/auth";
// import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	// const { $supabase } = useNuxtApp();
	// $supabase.auth.api.getUserByCookie();
	const authStore = useAuthStore();
	if (!authStore.isLoggedIn) {
		if (to.path !== "/auth") {
			return navigateTo("/auth");
		}
	} else if (authStore.isLoggedIn && to.path === "/auth") {
		return navigateTo("/");
	}
});
