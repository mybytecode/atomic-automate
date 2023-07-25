import { Col, theme, Input, Form, Select, Button, Space, Divider, Row, Collapse } from "antd";
import { DashboardLayout } from "../components/layout/layout";
import { getMerchantCodeFromId, getTransactionalUuid, getUuid } from "../utils/uuid";
import { MeaObject } from "../types/mea";
import { ACCOUNTS_QUERY_TEMPLATE, BALANCES_QUERY_BALANCES, VAULTS_QUERY_TEMPLATE } from "../constants";
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
      const balancesQuery = replacePlaceholder(BALANCES_QUERY_BALANCES, obj as any);
      accountTemp.push({ name: type, query: format(accountsQuery) });
      balanceTemp.push({ name: type, query: format(balancesQuery) });
    });

    setAccounts(accountTemp);
    setBalances(balanceTemp);
  }

  const onReset = () => {
    setVault('');
    setAccounts([]);
    setBalances([]);
    form.resetFields();
  };

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
            layout="vertical"
            onFinish={formObject}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="merchantId" label="Merchant Id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="entityId" label="Entity Id" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="vaultName" label="Vault Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="vaultType" label="Vault Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select vault type"
              >
                <Select.Option value="treasury">Treasury</Select.Option>
                <Select.Option value="payments">Payments</Select.Option>
                <Select.Option value="pooling">Pooling</Select.Option>
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item name="accountTypes" label="Account Type" rules={[{ required: true }]}>
              <Select
                placeholder="Select account type"
                mode="multiple"
              >
                <Select.Option value="brokerage_cash_account">brokerage_cash_account</Select.Option>
                <Select.Option value="brokerage_securities_account">brokerage_securities_account</Select.Option>
                <Select.Option value="payouts_cash_account">payouts_cash_account</Select.Option>
                <Select.Option value="pooling_account">pooling_account</Select.Option>
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
          </Collapse>
        </Col>
      </Row>
    </Col>
  </>
}

MeaPage.getLayout = (page: any) => <DashboardLayout title={"MEA"}>{page}</DashboardLayout>;