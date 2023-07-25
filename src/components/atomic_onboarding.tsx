import JsonFormatter from 'react-json-formatter';
import { parse, parseParticipant } from '../utils/parse'
import { Button, Col, Input, Row, Form, Card, theme, Collapse } from 'antd'
import React, { useState } from 'react';
import { AtomicCorporate } from '../types/atomic_corporate';
import { AtmoicParticipant } from '../types/atmoic_person';
const { TextArea } = Input;
const { Panel } = Collapse;


export function AtomicOnboarding() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [corporate, setCorporate] = useState<AtomicCorporate>()
  const [participant, setParticipant] = useState<AtmoicParticipant>()
  const [governmentIds, setGovernmentIds] = useState<any>()

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' }
  }

  const parseDetails = (values: any) => {
    if (values.details == undefined) {
      return
    }
    const kyb = parse(JSON.parse(values.details))
    const participant = parseParticipant(JSON.parse(values.details))

    const pDom = document.getElementById("participant")
    const kDom = document.getElementById("corporate")
    const ids = document.getElementById("ids")

    setCorporate(kyb)
    setParticipant(participant)
    setGovernmentIds({
      "government_ids": [
        {
          "country": null,
          "type": null,
          "number": null
        }
      ]
    })

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
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Corporate" key="1">
            <p>{corporate ? <JsonFormatter json={JSON.stringify(corporate)} tabWith={4} jsonStyle={jsonStyle} /> : <></>}</p>
          </Panel>
          <Panel header="Participant" key="2">
            <p>{participant ? <JsonFormatter json={JSON.stringify(participant)} tabWith={4} jsonStyle={jsonStyle} /> : <></>}</p>
          </Panel>
          <Panel header="Government ID's" key="3">
            <p>{governmentIds ? <JsonFormatter json={JSON.stringify(governmentIds)} tabWith={4} jsonStyle={jsonStyle} /> : <></>}</p>
          </Panel>
        </Collapse>
      </Col>
    </Row >
  </Col >
}