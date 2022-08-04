export interface InsurancePlan {
	name: string;
	bin: string;
	group: string;
	pcn: string;
	memberId: string;
}

export interface Insurance {
	isValid: boolean;
	primary: InsurancePlan;
	secondary?: InsurancePlan;
	tertiary?: InsurancePlan;
}

export interface Patient {
	firstName: string;
	lastName: string;
	dob: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	gender: string;
	user_id: string;
	patient_id: string;
	insurance: Insurance;
	created_at: Date;
	modified_at: Date;
}

export interface PatientInput {
	firstName: {
		val: string;
		isValid: boolean;
	};
	lastName: {
		val: string;
		isValid: boolean;
	};
	street: {
		val: string;
		isValid: boolean;
	};
	city: {
		val: string;
		isValid: boolean;
	};
	state: {
		val: string;
		isValid: boolean;
	};
	zip: {
		val: string;
		isValid: boolean;
	};
	dob: {
		val: string;
		isValid: boolean;
	};
	gender: {
		val: string;
		isValid: boolean;
	};
	phone: {
		val: string;
		isValid: boolean;
	};
	insurance?: Insurance;
	dateAdded?: Date;
	user_id?: string;
	id?: string;
}

export interface ActionIcon {
	name: string;
	render: () => {};
}
export interface ActionProps {
	id: string;
	name: string;
	icon: ActionIcon;
}

export interface Address {
	street: string;
	street2?: string;
	city: string;
	state: string;
	zip: string;
}

export interface Doctor {
	firstName: string;
	lastName: string;
	npi: string;
	dea: string;
	dob: string;
	address: Address;
	phone: string;
	date_added: Date;
	user_id: string;
	doctor_id: string;
	practice_id: string;
}

export interface Practice {
	practice_id: string;
	user_id: string;
	legalName: string;
	dbaName: string;
	npi: string;
	address: Address;
	doctors: string[];
	created_at: Date;
	modified_at: Date;
}

export interface DoctorInput {
	firstName: {
		val: string;
		isValid: boolean;
	};
	lastName: {
		val: string;
		isValid: boolean;
	};
	npi: {
		val: string;

		isValid: boolean;
	};
	dea: {
		val: string;
		isValid: boolean;
	};
	dob: {
		val: string;
		isValid: boolean;
	};
	street: {
		val: string;
		isValid: boolean;
	};
	city: {
		val: string;
		isValid: boolean;
	};
	state: {
		val: string;
		isValid: boolean;
	};
	zip: {
		val: string;
		isValid: boolean;
	};
	phone: {
		val: string;
		isValid: boolean;
	};
	gender: {
		val: string;
		isValid: boolean;
	};
}
