export const VAULTS_QUERY_TEMPLATE = `INSERT INTO Vaults (Id, MerchantId, EntityId, Type, Name, Status, IsDeleted, DeletedAt, CreatedAt, UpdatedAt, IsAccountNumbersRequired)
VALUES('{vaultId}', '{merchantId}', '{entityId}', '{vaultType}', '{vaultName}', 'active', false, '0001-01-03T13:22:58Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, {isAccountNumberRequired});`;

export const ACCOUNTS_QUERY_TEMPLATE = `INSERT INTO Accounts (Id, MerchantId, EntityId, VaultId, Name, Type, Status, CurrencyCode, CurrencyPartnerMappingId, IsDeleted, DeletedAt, CreatedAt, UpdatedAt, PartnerCode, MetaData, CurrencyType, PartnerId) 
VALUES('{accountId}', '{merchantId}', '{entityId}', '{vaultId}', '{accountName}', '{accountType}', 'active', '{accountCurrency}', '', false, '0001-01-03T13:22:58Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '', '', '{accountCurrencyType}', '');`

export const BALANCES_QUERY_BALANCES = `INSERT INTO Balances (Id, AccountId, CurrencyCode, IntegerAmount, DecimalAmount, Precision, StringAmount, CreatedAt, UpdatedAt) 
VALUES('{balanceId}', '{accountId}', '{accountCurrency}', '0', '0', 16, '0.0000000000000000', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`