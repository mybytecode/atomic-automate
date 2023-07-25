import { Col, theme, Input, Form } from "antd";
import { DashboardLayout } from "../components/layout/layout";
import { getTransactionalUuid, getUuid } from "../utils/uuid";
export default function MeaPage() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  console.log(getTransactionalUuid('test'));
  console.log(getUuid());

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return <>
    <Col span={24} style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
      <Form
        form={form}
        name="control-hooks"
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="merchantId" label="MerchantId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="entityId" label="EntityId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Col>
  </>
}

MeaPage.getLayout = (page: any) => <DashboardLayout title={"MEA"}>{page}</DashboardLayout>;