import { useAuthStore } from "~~/stores/auth";
import { useUiStore } from "~~/stores/ui";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const uiStore = useUiStore();
	const authStore = useAuthStore();
	if (authStore.isLoggedIn) {
		// await useLoadContent();
	}
});
