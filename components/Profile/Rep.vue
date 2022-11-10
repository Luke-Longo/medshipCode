<template>
	<div class="mx-4 mt-10">
		<div v-if="hasData" class="flex flex-col justify-center items-center">
			<div>
				<div class="grid lg:grid-cols-4 sm:grid-cols-3 gap-5">
					<p>First Name: {{ salesRep.firstName }}</p>
					<p>Last Name: {{ salesRep.lastName }}</p>
					<p>Email: {{ salesRep.email }}</p>
					<p>Business Name: {{ salesRep.businessName }}</p>
					<p>Phone: {{ salesRep.phone }}</p>
				</div>
				<div class="my-4">
					<h3
						class="text-xl text-primary dark:text-darkSecondary text-center justify-center mb-4"
					>
						Practices
					</h3>
					<div class="grid grid-cols-4" v-if="practices!.length > 0">
						<p v-for="practice in practices">
							{{ practice.practiceName }}
						</p>
					</div>
					<p v-else class="text-center justify-center">No Practices Yet</p>
				</div>
				<p class="flex text-center justify-center text-xl mt-20">
					Please contact an admin to change your profile details
				</p>
			</div>
		</div>
		<div class="flex justify-center items-center mt-36" v-else>
			<p class="flex text-xl">
				Please contact an admin to setup your profile details
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProfileStore } from "~~/stores/profile";
import { SalesRep, Practice } from "~~/types/types";

const profileStore = useProfileStore();

const salesRep: SalesRep = profileStore.salesRep;

const practices = ref<Practice[]>();

practices.value = await profileStore.getPractices(salesRep.user_id);

console.log(practices.value);

const hasData = ref(false);

if (!!salesRep) {
	hasData.value = true;
}

// const salesRep: SalesRep = ref(profileStore.salesRep);
</script>
