<template>
	<div class="flex items-center justify-center">
		<transition name="fade" mode="out-in">
			<AuthCard class="w-2/3 justify-center items-center" />
		</transition>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUiStore } from "~~/stores/ui";
import { useAuthStore } from "~~/stores/auth";

const uiStore = useUiStore();
const authStore = useAuthStore();
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
