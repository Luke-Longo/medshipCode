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

export interface ChangeAddress {
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
	address: ChangeAddress;
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
	address?: ChangeAddress;
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
	address?: ChangeAddress;
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
