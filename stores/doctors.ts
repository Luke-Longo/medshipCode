import { defineStore } from "pinia";
import { Doctor } from "~~/types/types";

export const useDoctorsStore = defineStore("doctors", {
	state: () => ({
		doctors: [],
		selectedDoctor: null as Doctor,
		lastFetch: null as Date,
	}),
	getters: {
		getDoctors: (state: any) => state.doctors,
		getSelectedDoctor: (state: any) => state.selectedDoctor,
		hasDoctors: (state: any) => state.doctors.length > 0,
		shouldUpdate: (state: any) => {
			const lastFetch = state.lastFetch;
			if (!lastFetch) {
				return true;
			}
			const currentTimeStamp = new Date().getTime();
			return (currentTimeStamp - lastFetch.getTime()) / 1000 > 60;
		},
	},
	actions: {
		setDoctors(doctors: Doctor[]) {
			this.doctors = doctors;
		},
		setSelectedDoctor(doctor: Doctor) {
			this.selectedDoctor = doctor;
		},
		async addDoctor(doctor: Doctor) {
			const { $supabase } = useNuxtApp();
			try {
				const { data, error } = await $supabase
					.from("doctors")
					.select("*")
					.eq("firstName", doctor.firstName)
					.eq("lastName", doctor.lastName)
					.eq("npi", doctor.npi)
					.eq("user_id", doctor.user_id);
				if (error) {
					throw error;
				}
				if (data.length === 0) {
					const { error } = await $supabase.from("doctors").insert(doctor);
					if (error) {
						throw error;
					}
					this.doctors.push(doctor);
				} else {
					const { error } = await $supabase.from("doctors").upsert(doctor);
					if (error) {
						throw error;
					}
					this.doctors.push(doctor);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async fetchDoctors() {
			const { $supabase } = useNuxtApp();
			if (this.shouldUpdate) {
				console.log("fetching doctors");
				try {
					let { data: doctors, error } = await $supabase.from("doctors").select("*");
					if (error) {
						throw error;
					}
					this.doctors = doctors;
				} catch (e) {
					console.log(e);
				}
			}
		},
		async searchDoctors(searchTerms) {
			const { $supabase } = useNuxtApp();
			if (searchTerms.split(" ").length > 1) {
				const terms = searchTerms.split(" ");
				try {
					const { data, error } = await $supabase
						.from("doctors")
						.select("*")
						.or(
							`firstName.in.(${terms}),lastName.in.(${terms}),npi.in(${terms}),dea.in.(${terms}),firstName.like.%${terms[0]}%,lastName.like.%${terms[0]}%`
						)
						.order("lastName", { ascending: true });
					if (error) {
						throw error;
					}
					return data;
				} catch (e) {
					console.log(e);
				}
			} else {
				const term = searchTerms;
				try {
					const { data, error } = await $supabase
						.from("doctors")
						.select("*")
						.or(
							`firstName.eq.${term},lastName.eq.${term},npi.eq.${term},dea.in.(${term}),firstName.like.%${term}%,lastName.like.%${term}%`
						)
						.order("lastName", { ascending: true });
					if (error) {
						throw error;
					}
					return data;
				} catch (e) {
					console.log(e);
				}
			}
		},
		async deleteDoctor(doctor_id: string) {
			const { $supabase } = useNuxtApp();
			try {
				const { error } = await $supabase
					.from("doctors")
					.delete()
					.eq("doctor_id", doctor_id);
				if (error) {
					throw error;
				}
				this.doctors = this.doctors.filter(
					(doctor) => doctor.doctor_id !== doctor_id
				);
			} catch (e) {
				console.log(e);
			}
		},
		clear() {
			this.doctors = [];
			this.lastFetch = null;
			this.selectedDoctor = null;
		},
	},
});
