export const PRODUCT_CODE_PAYMETNS: string = "Payments";
export const PRODUCT_CODE_TREASURY: string = "Treasury";
export const PRODUCT_CODE_PAYOUTS: string = "Payouts";

export const VAULTS_QUERY_TEMPLATE = `INSERT INTO Vaults (Id, MerchantId, EntityId, Type, Name, Status, IsDeleted, DeletedAt, CreatedAt, UpdatedAt, IsAccountNumbersRequired)
VALUES('{vaultId}', '{merchantId}', '{entityId}', '{vaultType}', '{vaultName}', 'active', false, '0001-01-03T13:22:58Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, {isAccountNumberRequired});`;

export const ACCOUNTS_QUERY_TEMPLATE = `INSERT INTO Accounts (Id, MerchantId, EntityId, VaultId, Name, Type, Status, CurrencyCode, CurrencyPartnerMappingId, IsDeleted, DeletedAt, CreatedAt, UpdatedAt, PartnerCode, MetaData, CurrencyType, PartnerId) 
VALUES('{accountId}', '{merchantId}', '{entityId}', '{vaultId}', '{accountName}', '{accountType}', 'active', '{accountCurrency}', '', false, '0001-01-03T13:22:58Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', '', '{accountCurrencyType}', '');`

export const BALANCES_QUERY_TEMPLATE = `INSERT INTO Balances (Id, AccountId, CurrencyCode, IntegerAmount, DecimalAmount, Precision, StringAmount, CreatedAt, UpdatedAt) 
VALUES('{balanceId}', '{accountId}', '{accountCurrency}', '0', '0', 16, '0.0000000000000000', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`

export const REFERNTIAL_UUID_QUERY_TEMPLATE = `INSERT INTO ReferentialUUIDMappings (Id, UUID, UUIDType, ReferentialUUID, ReferentialUUIDType, CreatedAt, UpdatedAt) 
VALUES('{refUUIDMappingId}', '{uuid}', '{uuidType}', '{refUUID}', '{refUUIDType}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`

export const MERCHANT_CONFIG_QUERY_TEMPLATE = `INSERT INTO MerchantConfigurations (Id, MerchantId, Key, Value, CreatedAt, UpdatedAt) 
VALUES('{merchantIdConfigId}', '{merchantId}', '{refUUIDType}', '{refUUID}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`

export const DEPOSIT_ACCOUNT_QUERY_TEMPLATE = `INSERT INTO DepositAccounts (Id, ParentId, PartnerCode, PartnerId, Type, CurrencyCode, BankNameId, BankDisplayName, RoutingCodeType1, RoutingCodeValue1, RoutingCodeType2, RoutingCodeValue2, BankAddress, BankAccountType, Status, CreatedAt, UpdatedAt,  AccountId, BeneficiaryAddress, MetaData) 
VALUES('{depositAccountId}', '{merchantId}', 'BNY', '', 'FIAT', 'USD', '', 'Bank of New York Mellon', 'ABA (Wire)', '', 'MEMORANDUM', '', '240 Greenwich Street, New York, NY 10007', 'LOCAL', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,  '', 'One Pershing Plaza, 6th Floor, Jersey City, New Jersey 07399', '');`