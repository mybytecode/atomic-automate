import { Button, Result } from "antd";
import { useRouter } from "next/router";
import { DashboardLayout } from "../components/layout/layout";

export default function Custom404() {
  const router = useRouter();
  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
  />
}

Custom404.getLayout = (page: any) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
