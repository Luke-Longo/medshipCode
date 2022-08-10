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
	to: Date;
	from: Date;
	placeOfService: string;
	hcpcs: string;
	modifier: string;
	charges: number;
	units: number;
	provider_id: string;
}

export interface Order {
	user_id: string;
	patient_id: string;
	order_id: string;
	orderNumber: number;
	doctor_id: string;
	insurance_id: string;
	trackingNumber: string;
	status: "Ready" | "Not Ready" | "Payment Due" | "Completed" | "Held Orders";
	notes: string;
	delivery: Delivery;
	orderDetails: OrderDetails[];
	created_at: Date;
	modified_at: Date;
}
