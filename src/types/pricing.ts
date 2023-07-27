export interface Pricing {
  id?: string;
  entityId: string;
  billingCapabilityId: string;
  billingCapabilityMappingId: string;
  merchantId: string;
  pricingTierId?: string;
  pricingTierMappingId?: string;
  billingAccountId: string;
  accountMappingId: string;
}