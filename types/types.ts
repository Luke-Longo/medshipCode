import { Address } from "~/types/change";
export interface InsurancePlan {
	planName: string;
	serviceTypeCodes: string[];
}

export interface BenefitsInformation {
	benefitsAdditionalInformation?: {
		planNumber: string;
		drugFormularyNumber: string;
		planNetworkIdNumber: string;
	};
	benefitsDateInformation?: { plan: string };
	benefitAmount?: string;
	code: string;
	name: string;
	inPlanNetworkIndicator?: string;
	inPlanNetworkIndicatorCode?: string;
	insuranceType?: string;
	insuranceTypeCode?: string;
	timeQualifier?: string;
	timeQualifierCode?: string;
	planCoverage: string;
	serviceTypeCodes: string[];
	serviceTypes: string[];
}

export interface PlanStatus {
	planDetails: string;
	serviceTypeCodes: string[];
	status: string;
	statusCode: string;
}

export interface Insurance {
	memberId: string;
	isValid: boolean;
	benefitsInformation: BenefitsInformation[] | null;
	planStatus: PlanStatus[] | null;
	planDateInformation: { plan: string };
	planInformation: { policyNumber: string };
}

export interface Patient {
	first_name: string;
	last_name: string;
	dob: string;
	address?: Address;
	gender?: string;
	user_id: string;
	id: string;
	insurance: Insurance;
	created_at: Date;
	modified_at: Date;
}

export interface FormInput {
	label: string;
	id: string;
	val: string;
	isValid: boolean;
}

export interface PatientForm {
	first_name: FormInput;
	last_name: FormInput;
	address1: FormInput;
	address2: FormInput;
	city: FormInput;
	state: FormInput;
	postalCode: FormInput;
	dob: FormInput;
	gender: FormInput;
	memberId: FormInput;
}

export interface Input {
	isValid: boolean;
	val: string;
}
export interface PatientInput {
	firstName: Input;
	lastName: Input;
	address1?: Input;
	address2?: Input;
	city?: Input;
	state?: Input;
	postalCode?: Input;
	dob: Input;
	gender?: Input;
	phone?: Input;
	memberId?: Input;
	ssn?: Input;
}

export interface Schedule {
	patients: [
		{
			id: string;
			first_name: string;
			last_name: string;
		}
	];
	provider: {
		npi: string;
		first_name: string;
		last_name: string;
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

export interface Provider {
	id: string;
	first_name: string;
	last_name: string;
	npi: string;
	dob: string;
	date_added: Date;
	user_id: string;
	modified_at: Date;
	practice_id: string;
}

export interface Contact {
	name: string;
	phone: string;
	email: string;
}

export interface Practice {
	user_id: string;
	practiceName: string;
	address: Address;
	legalName: string;
	dba?: string | null;
	contact: Contact;
	accountsPayableContact: Contact | null;
	clinicalContact: Contact | null;
	npi: string;
	ein: string;
	ptan: string;
	rep_id: string;
	modified_at: Date;
	created_at: Date;
}

export interface ProviderInput {
	firstName: Input;
	lastName: Input;
	npi: Input;
	dob: Input;
}

export interface Delivery {
	delivery_id: string;
}

export interface Dressing {
	hcpcs: string;
	frequency?: string;
	quantity: number;
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
	primaryDressing: Dressing;
	secondaryDressing: Dressing;
	ancillaryItems: Dressing;
	charges: number;
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

export interface InsuranceShort {
	planName: string;
	benefitsInformation?: BenefitsInformation[];
	planStatus?: PlanStatus[];
}

export interface Order {
	order_id: string;
	user_id: string;
	patient_id: string;
	provider_id: string;
	orderNumber: number;
	insurance?: InsuranceShort;
	trackingNumber: string;
	status: "Ready" | "Not Ready" | "Payment Due" | "Completed" | "Held Orders";
	notes: string;
	delivery: Delivery;
	wounds: Wounds;
	created_at: Date;
	modified_at: Date;
	primaryPayment?: number;
	secondaryPayment?: number;
	active?: boolean;
}

export interface PracticeInput {
	practiceName: {
		val: string;
		isValid: boolean;
	};
	legalName: {
		val: string;
		isValid: boolean;
	};
	address1: {
		val: string;
		isValid: boolean;
	};
	address2: {
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
	postalCode: {
		val: string;
		isValid: boolean;
	};
	contactPhone: {
		val: string;
		isValid: boolean;
	};
	contactEmail: {
		val: string;
		isValid: boolean;
	};
	contactName: {
		val: string;
		isValid: boolean;
	};
	accountsPayableContact: {
		val: string;
		isValid: boolean;
	};
	accountsPayableEmail: {
		val: string;
		isValid: boolean;
	};
	accountsPayablePhone: {
		val: string;
		isValid: boolean;
	};
	clinicalContact: {
		val: string;
		isValid: boolean;
	};
	clinicalEmail: {
		val: string;
		isValid: boolean;
	};
	clinicalPhone: {
		val: string;
		isValid: boolean;
	};
	npi: {
		val: string;
		isValid: boolean;
	};
	ein: {
		val: string;
		isValid: boolean;
	};
	ptan: {
		val: string;
		isValid: boolean;
	};
}

export interface FormElement {
	id: string;
	title: string;
	required: boolean;
	error?: string;
	placeholder?: string;
}

export interface SalesRep {
	user_id: string;
	first_name: string;
	last_name: string;
	business: string;
	email: string;
	phone: string;
	children: string[] | null;
	practices: string[] | null;
	created_at: Date;
	modified_at: Date;
	parent_id: string | null;
	bank_info: {
		account_number: string;
		routing_number: string;
	} | null;
}

export interface Profile {
	user_id: string;
	type: "salesRep" | "practice" | "admin";
	email: string;
	username: string;
	admin: boolean;
	rep_id: string;
	practice_id: string;
	created_at: Date;
	modified_at: Date;
}
