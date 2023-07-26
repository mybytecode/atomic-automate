export interface MeaObject {
  id?: string;
  vaultId: string;
  merchantId: string;
  entityId: string;
  vaultType: string;
  vaultName: string;
  isAccountNumberRequired: boolean;
  accountId: string;
  accountType: string;
  accountCurrencyType: string;
  accountName: string;
  accountCurrency: string;
  balanceId: string;
  refUUIDMappingId?: string;
  uuid?: string;
  uuidType?: string;
  refUUID?: string;
  refUUIDType?: string;
  depositAccountId?: string;
}