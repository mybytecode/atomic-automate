import { Button, Checkbox, Col, Collapse, DatePicker, Form, Input, Row, Space, theme } from "antd";
import { DashboardLayout } from "../components/layout/layout";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { BillingTransaction } from "../types/billing_transactions";
import { getUuid } from "../utils/uuid";
import { useState } from "react";
import { BILLING_TRANSACTIONS_QUERY_TEMPLATE } from "../constants";
import { copyToClipboard, replacePlaceholder } from "../utils/string";

const { Panel } = Collapse;

interface Props {
  name: string;
  query: string;
}

export default function BillingTransactions() {
  const [form] = Form.useForm();
  const [billingTransactions, setBillingTransactions] = useState<Props[]>([])
  const [allQueries, setAllQueries] = useState<string>('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleChange = () => {

  }

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values)
    const transactions = values.transaction.sort((t1: any, t2: any) => {
      return t1.date.isBefore(t2)
    })

    const obj: BillingTransaction = {
      billingAccountId: values.billingAccountId,
    }

    const txnQuery: Props[] = []
    var dueAmount = 0
    var q = ''
    transactions.forEach((transaction: any, index: number) => {
      obj.billingTransactionId = getUuid()
      const dataToRemark = transaction.date.subtract(1, 'month')
      obj.remark = `Management fee - ${dataToRemark.format('MMMM YYYY')}`
      obj.billingAmount = parseFloat(transaction.amount)
      obj.createdAt = transaction.date.format()
      obj.discountAmount = parseFloat(transaction.discountedAmount)
      dueAmount += parseFloat(transaction.discountedAmount)
      obj.dueAmount = dueAmount
      obj.discountId = transaction.isFree ? 'kTApPKcSApNhKrYbAGkmT6_07_26' : ''
      console.log(transaction)
      const query = replacePlaceholder(BILLING_TRANSACTIONS_QUERY_TEMPLATE, obj as any)
      q += '\n\n' + query

      txnQuery.push({ name: `Billing Transaction ${++index}`, query: allQueries })
    })
    setAllQueries(q)
    console.log(allQueries)
    setBillingTransactions(txnQuery)

  }

  return <>
    <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Row>
        <Col span={11} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <Form
            form={form}
            name="control-hooks"
            onValuesChange={handleChange}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name='billingAccountId' label='Billing Account ID' rules={[{ required: true }]}>
              <Input placeholder="Enter ID"></Input>
            </Form.Item>
            <Form.List name="transaction">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'amount']}
                        rules={[{ required: true, message: 'Missing ' }]}
                      >
                        <Input placeholder="Actual amount" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'discountedAmount']}
                        rules={[{ required: true, message: 'Missing ' }]}
                      >
                        <Input placeholder="Discounted amount" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'date']}
                        rules={[{ required: true, message: 'Missing ' }]}
                      >
                        <DatePicker />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'isFree']} valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Is Free</Checkbox>
                      </Form.Item>

                      <Button onClick={() => remove(name)}>Remove</Button>
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block >
                      Add transaction
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', marginLeft: '2px' }}>
          <Button style={{ marginBottom: '10px' }} onClick={() => copyToClipboard(allQueries)}>Copy all</Button>
          <Collapse defaultActiveKey={['1']}>
            {billingTransactions.map((billingTransaction) => (<Panel key={billingTransaction.name} header={`${billingTransaction.name}`}>{billingTransaction.query}</Panel>))}
          </Collapse>
        </Col>
      </Row>
    </Col>
  </>
}

BillingTransactions.getLayout = (page: any) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}