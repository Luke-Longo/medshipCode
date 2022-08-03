import { Patient } from "~~/types/types";

export default defineEventHandler(async (event) => {
	const daySupply = "30";
	const sig = "Take+1+a+day";
	const siteId = "75938";
	const patient: Patient = {
		id: "123",
		firstName: "John",
		lastName: "Doe",
		dob: "04212000",
		gender: "m",
		insurance: {
			isValid: false,
			primary: null,
		},
		phone: "1234567890",
		street: "123 Main St",
		city: "Santa Cruz",
		state: "CA",
		zip: "12345",
		user_id: "123",
		date_added: new Date(),
	};
	const qty = "30";
	const ndc = "00093273401";
	const mdScriptsURL = `https://www.mdscripts.com/dis/servlet/dis.Main?n=RemoteLogin&siteId=${siteId}&username=api.user.karis&password=Karis2.0&target=ShowCart&externalId=${patient.id}&debug=1&store=0&firstName=${patient.firstName}&lastName=${patient.lastName}&gender${patient.gender}&homePhone=${patient.phone}&address=${patient.street}&city=${patient.city}&state=${patient.state}&zip=${patient.zip}&dob=${patient.dob}&ndc1=${ndc}&qty1=${qty}&refills1=5&sig1=${sig}&daysSupply1=${daySupply}`;

	const res = await $fetch(mdScriptsURL);
	return res;
});

// `https://www.mdscripts.com/dis/servlet/dis.Main?n=RemoteLogin&siteId=${siteId}&username=api.user.karis&password=Karis2.0&target=ShowCart&debug=1&externalId=&store=0&firstName=${first}&lastName=${last}&ndc1=55885020030&qty1=30&refills1=5&sig1=${sig}&daysSupply1=${daySupply}`
