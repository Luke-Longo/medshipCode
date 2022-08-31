import { useUiStore } from "~/stores/ui";
import { useAuthStore } from "~/stores/auth";
import { useProfileStore } from "~/stores/profile";

export default async function useLoadContent() {
	const uiStore = useUiStore();
	const authStore = useAuthStore();
	const profileStore = useProfileStore();
	await profileStore.fetchProfile();
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		uiStore.setTheme("dark");
		document.body.classList.add("dark:bg-black");
	} else {
		uiStore.setTheme("light");
		document.body.classList.remove("dark:bg-black");
	}
	if (authStore.isLoggedIn) {
		uiStore.toggleAppLoading(true);
		uiStore.toggleSidebar(true);
		setTimeout(() => {
			uiStore.toggleAppLoading(false);
		}, 1000);
	}
}
