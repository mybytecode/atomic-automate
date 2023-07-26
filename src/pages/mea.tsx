import { Col, theme, Input, Form, Select, Button, Space, Divider, Row, Collapse } from "antd";
import { DashboardLayout } from "../components/layout/layout";
import { getMerchantCodeFromId, getTransactionalUuid, getUuid } from "../utils/uuid";
import { MeaObject } from "../types/mea";
import { ACCOUNTS_QUERY_TEMPLATE, BALANCES_QUERY_TEMPLATE, DEPOSIT_ACCOUNT_QUERY_TEMPLATE, MERCHANT_CONFIG_QUERY_TEMPLATE, PRODUCT_CODE_PAYMETNS, PRODUCT_CODE_PAYOUTS, PRODUCT_CODE_TREASURY, REFERNTIAL_UUID_QUERY_TEMPLATE, VAULTS_QUERY_TEMPLATE } from "../constants";
import { replacePlaceholder } from "../utils/string";
import { useState } from "react";
import { format } from 'sql-formatter';

const { Panel } = Collapse;
interface Props {
  name: string;
  query: string;
}

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function MeaPage() {
  const [form] = Form.useForm();
  const [vault, setVault] = useState<string>('');
  const [accounts, setAccounts] = useState<Props[]>([]);
  const [balances, setBalances] = useState<Props[]>([]);
  const [vaultTypes, setVaultTypes] = useState<{ label: string, value: string }[]>([]);
  const [accountTypes, setAccountTypes] = useState<{ label: string, value: string }[]>([]);
  const [product, setProduct] = useState<string>();
  const [refUUIDQueries, setRefUUIDQueries] = useState<Props[]>([]);
  const [merchantConfigQueries, setMerchantConfigQueries] = useState<Props[]>([]);
  const [depositAccount, setDepositAccount] = useState<Props>({} as Props);

  const formObject = () => {
    const values = form.getFieldsValue();

    const obj: MeaObject = {
      vaultId: getTransactionalUuid(getMerchantCodeFromId(values.merchantId)),
      merchantId: values.merchantId,
      entityId: values.entityId,
      vaultName: values.vaultName,
      vaultType: values.vaultType,
      isAccountNumberRequired: values.vaultType === 'pooling' ? false : true,
      accountId: getTransactionalUuid(getMerchantCodeFromId(values.merchantId)),
      accountType: values.accountType,
      accountCurrency: values.accountCurrency,
      accountCurrencyType: values.accountCurrencyType,
      accountName: values.accountName,
      balanceId: getTransactionalUuid(getMerchantCodeFromId(values.merchantId))
    }

    const vaultQuery = replacePlaceholder(VAULTS_QUERY_TEMPLATE, obj as any);
    setVault(vaultQuery);
    const accountTemp: Props[] = [];
    const balanceTemp: Props[] = [];

    values.accountTypes.forEach((type: string) => {
      obj.accountType = type;
      obj.accountId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
      obj.balanceId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));

      const accountsQuery = replacePlaceholder(ACCOUNTS_QUERY_TEMPLATE, obj as any);
      const balancesQuery = replacePlaceholder(BALANCES_QUERY_TEMPLATE, obj as any);
      accountTemp.push({ name: type, query: format(accountsQuery) });
      balanceTemp.push({ name: type, query: format(balancesQuery) });
    });

    const refQueries: Props[] = []
    const merchantConfigQueries: Props[] = []
    if (product == PRODUCT_CODE_TREASURY) {
      refQueries.push({ name: "AtomicCorporateId", query: replacePlaceholder(REFERNTIAL_UUID_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicCoporateId, "AtomicCorporateId") as any) })
      merchantConfigQueries.push({ name: "AtomicCorporateId", query: replacePlaceholder(MERCHANT_CONFIG_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicCoporateId, "AtomicCorporateId") as any) })

      refQueries.push({ name: "AtomicAccountId", query: replacePlaceholder(REFERNTIAL_UUID_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicAccountId, "AtomicAccountId") as any) })
      merchantConfigQueries.push({ name: "AtomicAccountId", query: replacePlaceholder(MERCHANT_CONFIG_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicAccountId, "AtomicAccountId") as any) })

      refQueries.push({ name: "AtomicSleeveId", query: replacePlaceholder(REFERNTIAL_UUID_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicSleeveId, "AtomicSleeveId") as any) })
      merchantConfigQueries.push({ name: "AtomicSleeveId", query: replacePlaceholder(MERCHANT_CONFIG_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicSleeveId, "AtomicSleeveId") as any) })

      merchantConfigQueries.push({ name: "AtomicAccountDetails", query: replacePlaceholder(MERCHANT_CONFIG_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicAccountDetails, "AtomicAccountDetails") as any) })

      refQueries.push({ name: "AtomicParticipantId", query: replacePlaceholder(REFERNTIAL_UUID_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicParticipantId, "AtomicParticipantId") as any) })
      merchantConfigQueries.push({ name: "AtomicParticipantId", query: replacePlaceholder(MERCHANT_CONFIG_QUERY_TEMPLATE, treasuryRefUUIdQueryObj(obj, values.merchantId, values.atomicParticipantId, "AtomicParticipantId") as any) })

      obj.depositAccountId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
      setDepositAccount({ name: 'BNY', query: format(replacePlaceholder(DEPOSIT_ACCOUNT_QUERY_TEMPLATE, obj as any)) })
    }
    setMerchantConfigQueries(merchantConfigQueries)
    setRefUUIDQueries(refQueries)
    setAccounts(accountTemp);
    setBalances(balanceTemp);
  }

  const treasuryRefUUIdQueryObj = (obj: any, merchantId: string, referenceId: string, refUUIDType: string) => {
    obj.refUUID = referenceId;
    obj.refUUIDType = refUUIDType;
    obj.uuid = merchantId
    obj.uuidType = 'MerchantId'
    obj.refUUIDMappingId = getTransactionalUuid(getMerchantCodeFromId(merchantId));
    return obj
  }

  const onReset = () => {
    setVault('');
    setAccounts([]);
    setBalances([]);
    setRefUUIDQueries([])
    setDepositAccount({} as Props)
    setMerchantConfigQueries([])
    form.resetFields();
  };

  const handleChange = (values: any) => {
    console.log(values)
    if (values.product) {
      setProduct(values.product)
    }
    getVaultTypesOptions()
    getAccountTypes()
  }

  const getVaultTypesOptions = () => {
    const vaultTypes1 = []
    if (form.getFieldValue('product') === PRODUCT_CODE_TREASURY) {
      vaultTypes1.push({ label: 'Treasury', value: 'treasury' })
    } else {
      vaultTypes1.push(...[
        { label: 'Payments', value: 'payments' },
        { label: 'Pooling', value: 'pooling' },
      ])
    }
    setVaultTypes(vaultTypes1)
  }

  const getAccountTypes = () => {
    const accountTypes1 = []
    if (form.getFieldValue('product') === PRODUCT_CODE_TREASURY) {
      accountTypes1.push(...[
        { label: 'brokerage_cash_account', value: 'brokerage_cash_account' },
        { label: 'brokerage_securities_account', value: 'brokerage_securities_account' }
      ])
    } else {
      accountTypes1.push(...[
        { label: 'payouts_cash_account', value: 'payouts_cash_account' },
        { label: 'pooling_account', value: 'pooling_account' },
      ])
    }
    setAccountTypes(accountTypes1)
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <>
    <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Row>
        <Col span={11} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <Form
            form={form}
            name="control-hooks"
            onValuesChange={handleChange}
            layout="vertical"
            onFinish={formObject}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="product" label="Product" rules={[{ required: true }]}>
              <Select placeholder="Select product">
                <Select.Option value={PRODUCT_CODE_TREASURY}>{PRODUCT_CODE_TREASURY}</Select.Option>
                <Select.Option value={PRODUCT_CODE_PAYOUTS}>{PRODUCT_CODE_PAYOUTS}</Select.Option>
                <Select.Option value={PRODUCT_CODE_PAYMETNS}>{PRODUCT_CODE_PAYMETNS}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="merchantId" label="Merchant Id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {product === PRODUCT_CODE_TREASURY ?
              <>
                <Form.Item name='atomicCoporateId' label='Atomic Corporate ID' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name='atomicAccountId' label='Atomic Account id' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name='atomicParticipantId' label='Atomic Participant ID' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name='atomicSleeveId' label='Atomic Sleeve ID' rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name='atomicAccountDetails' label='Atomic Account Details' rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
              </>
              : null}
            <Form.Item name="entityId" label="Entity Id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="vaultName" label="Vault Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="vaultType" label="Vault Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select vault type"
                options={vaultTypes}
              >
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item name="accountTypes" label="Account Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select account type"
                mode="multiple"
                options={accountTypes}
              >
              </Select>
            </Form.Item>
            <Form.Item name="accountName" label="Account Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="accountCurrency" label="Account Currency" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="accountCurrencyType" label="Account Currency Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select account currency type"
              >
                <Select.Option value="CRYPTO">Crypto</Select.Option>
                <Select.Option value="FIAT">FIAT</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', marginLeft: '2px' }}>
          <Collapse defaultActiveKey={['1']}>
            {vault ? <Panel header={`Vault (${form.getFieldsValue().vaultName})`} key="1">
              {vault}
            </Panel> : null}
            {accounts.map((account) => (<Panel key={account.name} header={`Account(${account.name})`}>{account.query}</Panel>))}
            {balances.map((balance) => (<Panel key={`b${balance.name}`} header={`Balance(${balance.name})`}>{balance.query}</Panel>))}
            {merchantConfigQueries.length > 0 ? merchantConfigQueries.map((merchQuery) => (<Panel key={`m${merchQuery.name}`} header={`MerchantConfig(${merchQuery.name})`}>{merchQuery.query}</Panel>)) : null}
            {refUUIDQueries.length > 0 ? refUUIDQueries.map((refUUIDQuery) => (<Panel key={`r${refUUIDQuery.name}`} header={`RefUUID(${refUUIDQuery.name})`}>{refUUIDQuery.query}</Panel>)) : null}
            {depositAccount.name ? <Panel key={`d${depositAccount.name}`} header={`Deposit Account(${depositAccount.name})`}>{depositAccount.query}</Panel> : null}
          </Collapse>
        </Col>
      </Row>
    </Col>
  </>
}

MeaPage.getLayout = (page: any) => <DashboardLayout title={"MEA"}>{page}</DashboardLayout>;