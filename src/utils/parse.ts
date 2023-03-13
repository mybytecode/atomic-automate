
import { AtmoicParticipant } from "../types/atmoic_person";
import { Address, AtomicCorporate } from "../types/atomic_corporate";
import { KYB } from "../types/kyb";

export function parse(details: KYB): AtomicCorporate {

  var sourceOfFund, ein, formationDate, legalName, companyName = ''
  var companyEmail, companyEntityType, companyPhone = ''
  var business_country, business_city, business_state, business_address, business_zip = ''

  details.data.details.forEach(detail => {
    switch (detail.key) {
      case "source_of_funds":
        sourceOfFund = detail.value
        break;
      case "ein":
        ein = detail.value
        break;
      case "date_of_formation":
        formationDate = detail.value
        break;
      case "legal_business_name":
        legalName = detail.value
        break;
      case "company_name":
        companyName = detail.value
        break;
      case "business_type":
        companyEntityType = detail.value
        break;

    }

    if (detail.parent == "company_details") {
      switch (detail.key) {
        case "email":
          companyEmail = detail.value
          break;
        case "phone_number":
          companyPhone = detail.value
          break;
      }
    }

    if (detail.parent == "company_address") {
      switch (detail.key) {
        case "country":
          business_country = detail.value
          break;
        case "city":
          business_city = detail.value
          break;
        case "zip_code":
          business_zip = detail.value
          break;
        case "state":
          business_state = detail.value
          break;
        case "address1":
          business_address = detail.value
          break;

      }
    }
  })

  let company_address = {
    country_code: business_country,
    street: business_address,
    city: business_city,
    region: business_state,
    postal_code: business_zip
  }


  return {
    custom_id: '',
    financial_profile: {
      source_of_funds: "investment_proceeds"
    },
    tax_profile: {
      tax_id: ein,
      tax_id_type: "",
      us_exempt_payee_code: "5"
    },
    identity: {
      address: company_address,
      formation_date: formationDate,
      legal_name: legalName,
      dba_name: companyName,
      entity_type: companyEntityType,
      email: companyEmail,
      phone_number: companyPhone,
      governing_country: business_country,
      governing_region: business_country
    }
  }
}

export function parseParticipant(details: KYB): AtmoicParticipant {
  var employer, industry = '';
  var fName, lName, dob, email, phoneNumber, ownership, role;
  var pCity, pState, pCountry, pZip, pStreet = ''

  var business_country, business_city, business_state, business_address, business_zip = ''

  details.data.details.forEach((detail) => {
    if (detail.parent == 'company_owners[0]') {
      switch (detail.key) {
        case "first_name":
          fName = detail.value
          break
        case "last_name":
          lName = detail.value
          break
        case "owner_profile":
          role = detail.value
        case "date_of_birth":
          dob = detail.value
          break
        case "email":
          email = detail.value
          break
        case "phone_number":
          phoneNumber = detail.value
          break
        case "ownership_percentage":
          ownership = detail.value
          break
        case "country":
          pCountry = detail.value
          break
        case "city":
          pCity = detail.value
          break
        case "zip_code":
          pZip = detail.value
          break
        case "address1":
          pStreet = detail.value
          break
        case "state":
          pState = detail.value
          break
      }
    }

    if (detail.parent == "company_address") {
      switch (detail.key) {
        case "country":
          business_country = detail.value
          break;
        case "city":
          business_city = detail.value
          break;
        case "zip_code":
          business_zip = detail.value
          break;
        case "state":
          business_state = detail.value
          break;
        case "address1":
          business_address = detail.value
          break;

      }
    }
    if (detail.parent == "company_details") {
      switch (detail.key) {
        case "legal_business_name":
          employer = detail.value
          break;
        case "industry_type":
          industry = detail.value
          break
      }
    }

  })

  var participantAddress: Address = {
    country_code: pCountry,
    street: pStreet,
    city: pCity,
    region: pState,
    postal_code: pZip
  }

  let company_address = {
    country_code: business_country,
    street: business_address,
    city: business_city,
    region: business_state,
    postal_code: business_zip
  }


  return {
    person: {
      country_of_citizenship: [
        pCountry
      ],
      address: participantAddress,
      employment: {
        address: company_address,
        status: "EMPLOYED",
        employer: employer,
        industry: industry,
        position: role
      },
      first_name: fName,
      last_name: lName,
      date_of_birth: dob,
      tax_id: null,
      tax_id_type: null,
      email: email,
      phone_number: phoneNumber
    },
    account_id: null,
    corporate_id: null,
    ownership_percentage: ownership,
    participant_role: "corporate_control_person",
    authorized_signer: true
  }

}