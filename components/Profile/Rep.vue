<template>
	<div class="mx-4">
		<div class="grid grid-cols-4 sm:grid-cols-3">
			<p v-for="key in salesRep"></p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~~/stores/profile";

const profileStore = useProfileStore();

const salesRep = profileStore.salesRep;
</script>
