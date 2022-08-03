<template>
	<div>
		<h3 class="header">Home</h3>
		<button @click="searchChangeHealth">ChangeHealthCare</button>
		<p>{{ changeStore.change_token }}</p>
	</div>
</template>

<script setup lang="ts">
import { useChangeStore } from "~~/stores/change";

const changeStore = useChangeStore();
const searchChangeHealth = async () => {
	const res = await $fetch("/api/changeApi");
	changeStore.setChangeToken(res.data);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
