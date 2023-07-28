export interface BillingTransaction {
  billingTransactionId?: string;
  billingAmount?: number;
  dueAmount?: number;
  billingAccountId?: string;
  discountAmount?: number;
  remark?: string;
  createdAt?: string;
  discountId?: string;
}