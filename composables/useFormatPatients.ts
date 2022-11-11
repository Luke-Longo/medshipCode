import { Patient } from "~/types/types";
import { useAuthStore } from "~~/stores/auth";
import useUuid from "./useUuid";

const useFormatPatients = (type: "csv" | "xlsx", patients: Patient[]) => {
	const authStore = useAuthStore();
	const newPatients: Patient[] = [];
	// Need to format all the inputs properly
	if (type === "csv") {
		patients.forEach((patient) => {
			const newPat: Patient = {
				first_name: "",
				last_name: "",
				dob: "",
				address: {
					address1: "",
					address2: "",
					city: "",
					state: "",
					postalCode: "",
				},
				gender: "",
				user_id: "",
				id: "",
				insurance: {
					memberId: patient.insurance?.memberId,
					benefitsInformation: [],
					planStatus: [],
					isValid: false,
				},
				created_at: new Date(),
				modified_at: new Date(),
			};
			for (let key in patient) {
				let value = patient[key];
				value = value.toString().toLowerCase();
				key = key.toLowerCase();
				if (key.includes("first")) {
					newPat.first_name = value ? value : "";
				} else if (key.includes("last")) {
					newPat.last_name = value ? value : "";
				} else if (key.includes("address" || "street")) {
					if (key.includes("2")) {
						newPat.address.address2 = value ? value : "";
					} else {
						newPat.address.address1 = value ? value : "";
					}
				} else if (key.includes("city")) {
					newPat.address.city = value ? value : "";
				} else if (key.includes("state")) {
					newPat.address.state = value ? value : "";
				} else if (key.includes("zip" || "postal")) {
					newPat.address.postalCode = value ? value : "";
				} else if (key.includes("dob")) {
					// you need to format date of birth so that you can know if either 19 or 20 is being used if they only put the last two digits of the year
					if (value.includes("/")) {
						value = value.split("/");
						if (value[0].length === 1) {
							value[0] = "0" + value[0];
						}
						if (value[1].length === 1) {
							value[1] = "0" + value[1];
						}

						newPat.dob = value[0] + "/" + value[1] + "/" + value[2];
					} else if (value.includes("-")) {
						let dateArr = value.split("-");
						newPat.dob = dateArr[0] + "/" + dateArr[1] + "/" + dateArr[2];
					} else {
						newPat.dob = value;
					}
				} else if (key.includes("gender" || "sex")) {
					newPat.gender = value ? value.charAt(0) : "";
				} else if (key.includes("member")) {
					newPat.insurance.memberId = value ? value : "";
				}
			}
			const user_id = authStore.user_id;
			newPat.user_id = user_id;
			let patientId = useUuid();
			// Check if ID has already been used
			for (let i = 0; i < newPatients.length; i++) {
				const patient = newPatients[i];
				if (patient.id === patientId) {
					patientId = useUuid();
				}
			}
			newPat.id = patientId;
			newPatients.push(newPat);
		});
		return newPatients;
	}
};

export default useFormatPatients;
