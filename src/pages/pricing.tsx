import { Button, Col, Collapse, Form, Input, Row, Space, theme } from "antd"
import { DashboardLayout } from "../components/layout/layout"
import { Pricing } from "../types/pricing";
import { getMerchantCodeFromId, getTransactionalUuid } from "../utils/uuid";
import { replacePlaceholder } from "../utils/string";
import { BILLING_ACCOUNT_BILLING_CAPABILITY_MAPPING_ID_MAPPING_QUERY_TEMPLATE, BILLING_ACCOUNT_QUERY_TEMPLATE, BILLING_CAPABILITY_ENTITY_MAPPING_QUERY_TEMPLATE, PRICING_TIERS, PRICING_TIERS_MAPPING_QUERY_TEMPLATE } from "../constants";
import { useState } from "react";
const { Panel } = Collapse;

interface Props {
  name: string;
  query: string;
}

export default function PricingPage() {
  const [form] = Form.useForm();
  const [pricingTiersQueries, setPricingTiersQueries] = useState<Props[]>([])
  const [billingCapabilityEntityMappingQuery, setBillingCapabilityEntityMappingQuery] = useState<string>()
  const [billingAccountQuery, setBillingAccountQuery] = useState<string>()
  const [billingAccountCapabilityMappingIdQuery, setBillingAccountCapabilityMappingQuery] = useState<string>()

  const handleForm = () => {
    const values = form.getFieldsValue();
    console.log(values);

    const billingAccountId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
    const billingCapabilityMappingId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
    const accountMappingId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
    const obj: Pricing = {
      billingCapabilityId: values.billingCapabilityId,
      entityId: values.entityId,
      merchantId: values.merchantId,
      billingAccountId: billingAccountId,
      billingCapabilityMappingId: billingCapabilityMappingId,
      accountMappingId: accountMappingId
    }

    setBillingCapabilityEntityMappingQuery(replacePlaceholder(BILLING_CAPABILITY_ENTITY_MAPPING_QUERY_TEMPLATE, obj as any))

    const pricingTiersQueries: Props[] = [];
    PRICING_TIERS.forEach((tier, index) => {
      obj.pricingTierId = tier
      obj.pricingTierMappingId = getTransactionalUuid(getMerchantCodeFromId(values.merchantId));
      pricingTiersQueries.push({ name: `Pricing Tier Mapping ${++index}`, query: replacePlaceholder(PRICING_TIERS_MAPPING_QUERY_TEMPLATE, obj as any) })
    });
    setPricingTiersQueries(pricingTiersQueries)

    setBillingAccountQuery(replacePlaceholder(BILLING_ACCOUNT_QUERY_TEMPLATE, obj as any))

    setBillingAccountCapabilityMappingQuery(replacePlaceholder(BILLING_ACCOUNT_BILLING_CAPABILITY_MAPPING_ID_MAPPING_QUERY_TEMPLATE, obj as any))
  }

  const onReset = () => {
    form.resetFields();
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <div>
    <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Row>
        <Col span={11} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <Form
            form={form}
            name="control-hooks"
            layout="vertical"
            onFinish={handleForm}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name='billingCapabilityId' label='Billing Capability ID' rules={[{ required: true }]} >
              <Input placeholder="enter id" defaultValue='BxLf34HUfJrHMPxtJWKwfd_11_10' />
            </Form.Item>
            <Form.Item name='entityId' label='Entity ID' rules={[{ required: true }]}>
              <Input placeholder="enter id" />
            </Form.Item>
            <Form.Item name='merchantId' label='Merchant ID' rules={[{ required: true }]}>
              <Input placeholder="enter id" />
            </Form.Item>
            <Form.Item >
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
            {billingCapabilityEntityMappingQuery ? <Panel header={`BillingCapabilityEntityMapping`} key="1">
              {billingCapabilityEntityMappingQuery}
            </Panel> : null}
            {pricingTiersQueries.map((tier) => (<Panel key={tier.name} header={tier.name}>{tier.query}</Panel>))}
            {billingAccountQuery ? <Panel header={`BillingAccount`} key="2">{billingAccountQuery}</Panel> : null}
            {billingAccountCapabilityMappingIdQuery ? <Panel header={`BillingAccountCapabilityMappingId`} key="3">{billingAccountCapabilityMappingIdQuery}</Panel> : null}
          </Collapse>
        </Col>
      </Row>
    </Col>
  </div>
}

PricingPage.getLayout = (page: any) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}