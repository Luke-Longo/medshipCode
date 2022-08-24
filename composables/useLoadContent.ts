import { useUiStore } from "~/stores/ui";
import { useAuthStore } from "~/stores/auth";

export default async function useLoadContent() {
	const uiStore = useUiStore();
	const authStore = useAuthStore();
	uiStore.toggleAppLoading(true);
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		uiStore.setTheme("dark");
		document.body.classList.add("dark:bg-black");
	} else {
		uiStore.setTheme("light");
		document.body.classList.remove("dark:bg-black");
	}
	if (authStore.isLoggedIn) {
		uiStore.toggleSidebar(true);
		// load all the data, load some in background
	} else {
		uiStore.toggleSidebar(false);
	}
	uiStore.toggleSidebar(true);
	setTimeout(() => {
		uiStore.toggleAppLoading(false);
	}, 1000);
}
