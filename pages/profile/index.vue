<template>
	<div>
		<div v-if="authStore.isAdmin">
			<h3 class="header">
				{{ authStore.isAdmin ? "Profile Search" : "Profile" }}
			</h3>
			<ProfileAdmin />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";

const authStore = useAuthStore();
</script>

<style scoped></style>
