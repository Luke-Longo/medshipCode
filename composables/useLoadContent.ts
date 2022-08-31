import { useUiStore } from "~/stores/ui";
import { useAuthStore } from "~/stores/auth";
import { useProfileStore } from "~/stores/profile";

export default async function useLoadContent() {
	const uiStore = useUiStore();
	const authStore = useAuthStore();
	const profileStore = useProfileStore();
	uiStore.toggleAppLoading(true);
	uiStore.toggleSidebar(true);
	await profileStore.fetchProfile();
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		uiStore.setTheme("dark");
		document.body.classList.add("dark:bg-black");
	} else {
		uiStore.setTheme("light");
		document.body.classList.remove("dark:bg-black");
	}
	uiStore.toggleFunctionLoading(false);
	if (authStore.isLoggedIn) {
		setTimeout(() => {
			uiStore.toggleAppLoading(false);
		}, 1000);
	}
}
