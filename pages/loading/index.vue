<template>
	<div class="">
		<UiBaseSpinner
			class="flex flex-grow mt-40 justify-center trans"
			:show="uiStore.initialLoading"
		/>
	</div>
</template>

<script setup lang="ts">
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~/stores/auth";

const uiStore = useUiStore();
const authStore = useAuthStore();

definePageMeta({
	layout: false,
});

const setState = async () => {
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
	uiStore.toggleAppLoading(false);
};

setState();
</script>
