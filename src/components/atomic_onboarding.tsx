import { parse, parseParticipant } from '../utils/parse'
import { Button, Col, Input, Row, Form, Card, Menu, Layout, theme, MenuProps } from 'antd'
const { TextArea } = Input;

export function AtomicOnboarding() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const parseDetails = (values: any) => {
    if (values.details == undefined) {
      return
    }
    const kyb = parse(JSON.parse(values.details))
    const participant = parseParticipant(JSON.parse(values.details))

    const pDom = document.getElementById("participant")
    const kDom = document.getElementById("corporate")
    const ids = document.getElementById("ids")
    if (document || kDom != null) {
      kDom!.innerHTML = JSON.stringify(kyb, null, 2)
    }
    if (document || pDom != null) {
      pDom!.innerHTML = JSON.stringify(participant, null, 2)
    }

    if (document || ids != null) {
      ids!.innerHTML = JSON.stringify({
        "government_ids": [
          {
            "country": null,
            "type": null,
            "number": null
          }
        ]
      }, null, 2)
    }

  }


  return <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
    <Row>
      <Col span={12}>
        <Form
          onFinish={parseDetails}
        >
          <Form.Item
            name="details"
          >
            <TextArea style={{ width: '100%', height: '80vh' }} rows={4} placeholder="Enter KYB details here" />
          </Form.Item>
          <Row justify='center' style={{ paddingTop: '10px' }}>
            <Form.Item >
              <Button type="primary" htmlType="submit" size='large' style={{ width: '200px' }} onClick={parseDetails} >Convert</Button>
            </Form.Item>
          </Row>
        </Form>

      </Col>
      <Col span={12} style={{ padding: '20px', overflow: 'scroll', height: '100vh' }}>
        <Card title="Corporate" bordered={false} style={{ margin: '10px' }}>
          <pre id='corporate'>
          </pre>
        </Card>
        <Card title="Participant" bordered={false} style={{ margin: '10px' }}>
          <pre id='participant'>
          </pre>
        </Card>
        <Card title="Gov Ids" bordered={false} style={{ margin: '10px' }}>
          <pre id='ids'>
          </pre>
        </Card>
      </Col>

    </Row>
  </Col>
}