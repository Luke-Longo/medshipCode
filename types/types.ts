import { Address } from "~/types/change";
export interface InsurancePlan {
	planName: string;
	serviceTypeCodes: string[];
}

export interface BenefitsInformation {
	benefitsAdditionalInformation: {
		planNumber: "";
		drugFormularyNumber: "";
		planNetworkIdNumber: "";
	};
	benefitsDateInformation: { plan: "" };
	code: "";
	name: "";
	planCoverage: "";
	serviceTypeCodes: string[];
	serviceTypes: string[];
}

export interface PlanStatus {
	planDetails: "";
	serviceTypeCodes: string[];
	status: "";
	statusCode: "";
}

export interface Insurance {
	memberId: string;
	isValid: boolean;
	benefitsInformation?: BenefitsInformation[];
	planStatus?: PlanStatus[];
}

export interface Patient {
	firstName: string;
	lastName: string;
	dob: string;
	address?: Address;
	phone?: string;
	ssn?: string;
	gender?: string;
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
	address1?: {
		val: string;
		isValid: boolean;
	};
	address2?: {
		val: string;
		isValid: boolean;
	};
	city?: {
		val: string;
		isValid: boolean;
	};
	state?: {
		val: string;
		isValid: boolean;
	};
	postalCode?: {
		val: string;
		isValid: boolean;
	};
	dob: {
		val: string;
		isValid: boolean;
	};
	gender?: {
		val: string;
		isValid: boolean;
	};
	phone?: {
		val: string;
		isValid: boolean;
	};
	memberId?: {
		val: string;
		isValid: boolean;
	};
	ssn?: {
		val: string;
		isValid: boolean;
	};
	insurance?: Insurance;
	dateAdded?: Date;
	user_id?: string;
	id?: string;
}

export interface Schedule {
	patients: [
		{
			patient_id: string;
			firstName: string;
			lastName: string;
		}
	];
	doctor: {
		doctor_id: string;
		firstName: string;
		lastName: string;
	};
	date: string;
	user_id: string;
	modified_at: Date;
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

export interface Delivery {
	delivery_id: string;
}

export interface OrderDetails {
	location: "lt" | "rt";
	bodyPart: string;
	length: number;
	width: number;
	depth: number;
	woundStage: string;
	drainage: string;
	debrided: boolean;
	icd10?: string;
	primaryDressing: {
		hcpcs: string;
		frequency?: string;
		quantity: number;
	};
	placeOfService: string;
	hcpcs: string;
	modifier: string;
	charges: number;
	units: number;
	provider_id: string;
}

export interface Wounds {
	1: OrderDetails;
	2?: OrderDetails;
	3?: OrderDetails;
	4?: OrderDetails;
	5?: OrderDetails;
	6?: OrderDetails;
	7?: OrderDetails;
	8?: OrderDetails;
	9?: OrderDetails;
	10?: OrderDetails;
	11?: OrderDetails;
	12?: OrderDetails;
}

export interface PatientShort {
	patient_id: string;
	firstName: string;
	lastName: string;
}

export interface ProviderShort {
	provider_id: string;
	firstName: string;
	lastName: string;
	npi: string;
}

export interface InsuranceShort {
	planName: string;
	benefitsInformation?: BenefitsInformation[];
	planStatus?: PlanStatus[];
}

export interface Order {
	user_id: string;
	patient: PatientShort;
	order_id: string;
	orderNumber: number;
	provider: ProviderShort;
	insurance: InsuranceShort;
	trackingNumber: string;
	status: "Ready" | "Not Ready" | "Payment Due" | "Completed" | "Held Orders";
	notes: string;
	delivery: Delivery;
	wounds: Wounds;
	created_at: Date;
	modified_at: Date;
	primaryPayment?: number;
	secondaryPayment?: number;
}
