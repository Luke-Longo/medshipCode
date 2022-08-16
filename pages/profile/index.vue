<template>
	<div>
		<h3 class="header">Create a new Profile</h3>
		<div class="flex justify-center gap-4">
			<div class="flex gap-4">
				<label for="" class="container">Practice </label>
				<input
					class="cursor-pointer"
					type="radio"
					v-model="profileType"
					value="practice"
					checked
				/>
			</div>
			<div class="flex gap-4">
				<label for="">Sales Rep</label>
				<input
					class="cursor-pointer"
					type="radio"
					v-model="profileType"
					value="salesRep"
				/>
			</div>
			<div class="flex gap-4">
				<label for="">Admin</label>
				<input
					class="cursor-pointer"
					type="radio"
					v-model="profileType"
					value="admin"
				/>
			</div>
		</div>
		<UiCard class="mx-auto"> </UiCard>
	</div>
</template>

<script setup lang="ts">
type ProfileType = "practice" | "salesRep" | "admin";

const profileType = ref<ProfileType>("practice");

const handleRadio = (type: ProfileType) => {
	profileType.value = type;
};
</script>

<style scoped>
.container {
	@apply relative cursor-pointer flex justify-center items-center gap-4 select-none;
}

/* Create a custom radio button */
.checkmark {
	position: absolute;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	border-radius: 50%;
	@apply bg-darkSecondary;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
	@apply bg-primary dark:bg-darkBg cursor-pointer;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
	@apply bg-primary dark:bg-darkPrimary;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
	content: "";
	position: absolute;
	display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
	display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
</style>
