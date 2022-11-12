<template>
	<div class="flex flex-col gap-2">
		<div class="form-group" v-for="key in keys">
			<label
				>{{ key }}
				<span v-if="key === 'memberId' || key === 'address2'"></span>
				<span class="text-red-400" v-else>*</span>
			</label>
			<input
				:class="{ 'invalid-input': !input.firstName.isValid }"
				class=""
				type="text"
				:placeholder="placeholders[key as keyof typeof placeholders]"
				v-model="input[key as keyof PatientInput]!.val"
				@blur="resetValidity(key)"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PatientInput } from "~/types/types";

const props = defineProps<{ input: PatientInput }>();

const keys = Object.keys(props.input) as (keyof PatientInput)[];

const resetValidity = (key: keyof PatientInput) => {
	props.input[key as keyof PatientInput]!.isValid = true;
};
const placeholders = {
	firstName: "First Name",
	lastName: "Last Name",
	address1: "Address 1",
	address2: "ex: Suite 101",
	city: "City",
	state: "State: ex (GA)",
	postalCode: "Zip",
	dob: "01/01/2000",
	gender: "M or F",
	memberId: "ex: 0001FQ2",
};
</script>
