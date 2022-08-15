<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<div class="flex gap-4">
			<div class="flex gap-6">
				<label for="">Practice</label>
				<input class="" type="radio" v-model="profileType" value="practice" />
			</div>
			<div class="flex gap-6">
				<label for="">Sales Rep</label>
				<input class="" type="radio" v-model="profileType" value="salesRep" />
			</div>
			<div class="flex gap-6">
				<label for="">Admin</label>
				<input class="" type="radio" v-model="profileType" value="admin" />
			</div>
		</div>
		<UiCard class="mx-auto"> </UiCard>
	</div>
</template>

<script setup lang="ts">
type ProfileType = "practice" | "salesRep" | "admin";

const profileType = ref<ProfileType>("practice");
</script>

<style scoped></style>
