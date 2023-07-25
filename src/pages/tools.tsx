import { Button, Col, Divider, Input, Modal, Row, Typography, theme } from "antd";
import { DashboardLayout } from "../components/layout/layout";
import { useState } from "react";
import { getTransactionalUuid, getUuid } from "../utils/uuid";


export default function ToolsPage() {

  const [uuid, setUUid] = useState<string[]>([]);
  const [isModelVisibleForTransactionalUUID, setIsModelVisibleForTransactionalUUID] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [count, setCount] = useState(0)
  const [prefix, setPrefix] = useState('')

  const getTxnId = () => {
    const ids = []
    for (let i = 0; i < count; i++) {
      ids.push(getTransactionalUuid(prefix));
    }
    setUUid(ids);
    setIsModelVisibleForTransactionalUUID(false);
  };

  const getId = () => {
    const ids = []
    for (let i = 0; i < count; i++) {
      ids.push(getUuid());
    }
    setUUid(ids);
    setIsModelVisible(false);
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <>
    <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Row justify='center' gutter={16}>
        <Col>
          <Button onClick={() => setIsModelVisible(true)}>GenerateUUId</Button>
        </Col>
        <Col>
          <Button onClick={() => setIsModelVisibleForTransactionalUUID(true)}>Generate Transactional UUId</Button>
        </Col>
      </Row>
      <Divider />
      <Row justify='center'>
        {uuid.map(id => <Col key={id} span={24}><Typography.Text copyable>{id}</Typography.Text></Col>)}
      </Row>
    </Col >
    <Modal
      open={isModelVisibleForTransactionalUUID}
      onOk={() => getTxnId()}
      closeIcon={null}
      onCancel={() => setIsModelVisibleForTransactionalUUID(false)}
    >
      <Row justify='center' gutter={16}>
        <Col>
          <Input placeholder='Number of uuids to generate' onChange={(e) => { setCount(parseInt(e.target.value)) }} />
        </Col>
        <Col>
          <Input placeholder='Prefix' onChange={(e) => setPrefix(e.target.value)} />
        </Col>
      </Row>
    </Modal>
    <Modal
      open={isModelVisible}
      onOk={() => getId()}
      closeIcon={null}
      onCancel={() => setIsModelVisible(false)}
    >
      <Row justify='center'>
        <Input placeholder='Number of uuids to generate' onChange={(e) => { setCount(parseInt(e.target.value)) }} />
      </Row>
    </Modal>
  </>;
}

ToolsPage.getLayout = (page: any) => <DashboardLayout >{page}</DashboardLayout>;