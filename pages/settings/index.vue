<template>
	<div class="my-6">
		<h3 class="header">Settings</h3>
	</div>
</template>

<script setup lang="ts">
import { useUiStore } from "../../stores/ui";
import { useAuthStore } from "../../stores/auth";

const uiStore = useUiStore();
const authStore = useAuthStore();
const router = useRouter();

const input = reactive({
	email: "",
	password: "",
});

const clearInput = () => {
	for (let key in input) {
		input[key] = "";
	}
};

const createProfile = async () => {
	uiStore.toggleFunctionLoading(true);
	await authStore.signUp({ email: input.email, password: input.password });
	clearInput();
	if (!authStore.isError) {
		router.push("/");
	}
	uiStore.toggleFunctionLoading(false);
};
</script>
