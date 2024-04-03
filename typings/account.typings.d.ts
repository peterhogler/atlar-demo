import { Currency } from "@/utils/currency/convertCurrencyToUSD";

interface Account {
    id: string;
    organizationId: string;
    thirdPartyId: string;
    entityId: string;
    affiliation: Affiliation;
    bank: Bank;
    identifiers: Identifier[];
    connectivityReferences: ConnectivityReferences;
    balance: Balance;
    market: string;
    bic: string;
    currency: string;
    owner: Owner;
    name: string;
    created: string;
    updated: string;
    alias: string;
    capabilities: Capabilities;
    fictive: boolean;
    externalMetadata: null;
    version: number;
}

interface Affiliation {
    id: string;
    name: string;
    thirdPartyId: string;
}

interface Bank {
    id: string;
    name: string;
    bic: string;
}

interface Identifier {
    market: string;
    type: string;
    number: string;
    holderName: string;
}

interface ConnectivityReferences {
    banksCustomerId: string;
    banksAccountId: string;
}

type Currency = "EUR" | "GBP" | "SEK" | "DKK" | "USD";

interface Amount {
    currency: string | Currency;
    value: number;
    stringValue: string;
}

interface Balance {
    id: string;
    organizationId: string;
    accountId: string;
    amount: Amount;
    type: string;
    reportedType: string;
    characteristics?: Characteristics;
    timestamp: string;
    localDate: string;
    version: number;
    date: string;
}

interface Owner {
    name: string;
}

interface Capabilities {
    transferCapabilities: any[];
    directDebitCapabilities: any[];
    signatureCapabilities: any[];
}

interface Transaction {
    account: Account;
    id: string;
    organizationId: string;
    amount: Amount;
    date: string;
    valueDate: string;
    counterparty: Counterparty;
    counterpartyDetails: CounterpartyDetails;
    remittanceInformation: RemittanceInformation;
    reconciliation: Reconciliation;
    characteristics: Characteristics;
    description: string;
    version: number;
    created: string;
}

interface Characteristics {
    bankTransactionCode: BankTransactionCode;
    returned: boolean;
    returnReason: ReturnReason;
    instructedAmount: Amount;
    currencyExchange: CurrencyExchange | null;
}

interface BankTransactionCode {
    domain: string;
    family: string;
    subfamily: string;
    description: string;
    proprietary: Proprietary;
}

interface ReturnReason {
    originalBankTransactionCode: OriginalBankTransactionCode;
    code: string;
    description: string;
    immediatelyReturned: boolean;
}

interface OriginalBankTransactionCode {}

interface Proprietary {}

interface CurrencyExchange {}

interface Counterparty {
    id: string;
    name: string;
    partyType: string;
    identifiers: Identifier[] | null;
    contactDetails: ContactDetails;
}

interface CounterpartyDetails {
    name: string;
    partyType: string;
    contactDetails: ContactDetails;
    nationalIdentifier: string | null;
    externalAccount: ExternalAccount;
    mandateReference: string;
}

interface RemittanceInformation {
    type: "UNSTRUCTURED";
    value: string;
}

interface Reconciliation {
    status: string;
    bookedTransactionId: string;
}

interface ContactDetails {}

interface ExternalAccount {}
