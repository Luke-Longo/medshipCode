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
	id: string;
	insurance: Insurance;
	date_added: Date;
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

export interface Doctor {
	firstName: string;
	lastName: string;
	npi: string;
	dea: string;
	dob: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	date_added: Date;
	user_id: string;
	doctor_id: string;
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

export interface Template {
	user_id: string;
	template_id: string;
	name: string;
	sigCode: string;
	qty: number;
	daySupply: number;
	refills?: number;
	ndcs?: string[];
	date_added: Date;
}
export interface Automation {
	automation_id: string;
	name: string;
	ndc: NDC;
	template: Template;
}

export interface Prescription {
	prescription_id: string;
	rxNumber: string;
	refills?: number;
	patient: Patient;
	doctor: Doctor;
	ndc: NDC;
	strength: string;
	form: string;
	sigCode: string;
	qty: number;
	daySupply: number;
	datePrescribed: Date;
	daw: string;
	originCode: string;
	date_added: Date;
	user_id: string;

	template?: Template;
}

export interface PackageNDC {
	description: string;
	marketing_start_date: string;
	package_ndc: string;
	sample: boolean;
}
export interface ActiveIngredient {
	name: string;
	strength: string;
}
export interface OpenFDA {
	is_original_packager: boolean[];
	manufacturer_name: string[];
	nui: string[];
	pharm_class_cs: string[];
	pharm_class_epc: string[];
	rxcui: string[];
	spl_set_id: string[];
	unii: string[];
	upc: string[];
}
export interface OpenNDC {
	active_ingredients: ActiveIngredient[];
	application_number: string;
	brand_name: string;
	brand_name_base: string;
	dosage_form: string;
	finished: true;
	generic_name: string;
	labeler_name: string;
	listing_expiration_date: string;
	marketing_category: string;
	marketing_start_date: string;
	openfda: {};
	packaging: PackageNDC[];
	pharm_class: string[];
	product_id: string;
	product_ndc: string;
	product_type: string;
	route: string[];
	spl_id: string;
}

export interface NDC {
	ndc_id: string;
	name: string;
	manufacturer: string;
	lotNumber: string;
	expDate: string;
	cost: number;
	inventory: number;
	awp: number;
	genericName: string;
	doseForm: string;
	date_added: Date;
	user_id: string;
}

export interface ChangeToken {
	access_token: string;
	token_type: string;
	expires_in: number;
}

export interface Provider {
	organizationName: string;
	firstName?: string;
	lastName?: string;
	npi: string;
	serviceProviderNumber?: string;
	payorId?: string;
	taxId?: string;
	ssn?: string;
	pharmacyProcessorNumber?: string;
	servicesPlanID?: string;
	employersId?: string;
	providerCode?: string;
	referenceIdentification?: string;
	providerType?: string;
}

export interface Address {
	address1: string;
	address2?: string;
	city: string;
	state: string;
	postalCode: string;
	countryCode?: string;
	locationIdentifier?: string;
	countrySubDivisionCode?: string;
}

export interface InformationReceiverName {
	stateLicenceNumber: string;
	medicareProviderNumber: string;
	medicaidProviderNumber: string;
	facilityIdNumber: string;
	contactNumber: string;
	devicePinNumber: string;
	submitterIdNumber: string;
	nationalProviderIdentifier: string;
	providerPlanNetworkIdNumber: string;
	facilityNetworkIdNumber: string;
	priorIdentifierNumber: string;
	socialSecurityNumber: string;
	federalTaxpayerIdentificationNumber: string;
	informationReceiverAdditionalIdentifierState: string;
	address: Address;
}

export interface Subscriber {
	birthSequenceNumber?: string;
	caseNumber?: string;
	medicaidRecipientIdentificationNumber?: string;
	spendDownAmount?: string;
	spendDownTotalBilledAmount?: string;
	coverageLevelCode?: string;
	memberId?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	suffix?: string;
	gender?: string;
	dateOfBirth: string;
	ssn?: string;
	groupNumber?: string;
	idCard?: string;
	providerCode?: string;
	referenceIdentificationQualifier?: string;
	providerIdentifier?: string;
	beginningCardIssueDate?: string;
	endCardIssueDate?: string;
	idCardIssueDate?: string;
	planIssueDate?: string;
	beginningPlanIssueDate?: string;
	endPlanIssueDate?: string;
	healthCareCodeInformation?: [
		{ diagnosisTypeCode: string; diagnosisCode: string }
	];
	address?: Address;
	additionalIdentification?: {
		planNumber: string;
		policyNumber: string;
		memberIdentificationNumber: string;
		contractNumber: string;
		medicalRecordIdentificationNumber: string;
		patientAccountNumber: string;
		identificationCardSerialNumber: string;
		healthInsuranceClaimNumber: string;
		insurancePolicyNumber: string;
		planNetworkIdentificationNumber: string;
		agencyClaimNumber: string;
	};
}
export interface Dependent {
	birthSequenceNumber?: string;
	individualRelationshipCode?: string;
	issueNumber?: string;
	eligibilityCategory?: string;
	memberId?: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	suffix?: string;
	gender: string;
	dateOfBirth: string;
	ssn?: string;
	groupNumber: string;
	idCard?: string;
	providerCode?: string;
	referenceIdentificationQualifier?: string;
	providerIdentifier?: string;
	beginningCardIssueDate?: string;
	endCardIssueDate?: string;
	idCardIssueDate?: string;
	planIssueDate?: string;
	beginningPlanIssueDate?: string;
	endPlanIssueDate?: string;
	healthCareCodeInformation?: [
		{ diagnosisTypeCode: string; diagnosisCode: string }
	];
	address?: Address;
	additionalIdentification?: {
		planNumber: string;
		policyNumber: string;
		memberIdentificationNumber: string;
		contractNumber: string;
		medicalRecordIdentificationNumber: string;
		patientAccountNumber: string;
		healthInsuranceClaimNumber: string;
		identificationCardSerialNumber: string;
		insurancePolicyNumber: string;
		planNetworkIdentificationNumber: string;
		agencyClaimNumber: string;
	};
}

export interface Encounter {
	beginningDateOfService: string;
	endDateOfService: string;
	dateOfService?: string;
	serviceTypeCodes: string[];
	priorAuthorizationOrReferralNumber?: string;
	referenceIdentificationQualifier?: string;
	industryCode?: string;
	productOrServiceIDQualifier?: string;
	procedureCode?: string;
	procedureModifiers?: string[];
	diagnosisCodePointer?: string[];
	medicalProcedures?: [
		{
			productOrServiceIDQualifier: string;
			procedureCode: string;
			procedureModifiers: string[];
			diagnosisCodePointer: string[];
		}
	];
}
export interface ChangeEligibility {
	submitterTransactionIdentifier?: string;
	controlNumber: string;
	tradingPartnerServiceId: string;
	tradingPartnerName?: string;
	provider: Provider;
	portalUsername?: string;
	portalPassword?: string;
	informationReceiverName?: InformationReceiverName;
	subscriber: Subscriber;
	dependents?: Dependent[];
	encounter: Encounter;
}
