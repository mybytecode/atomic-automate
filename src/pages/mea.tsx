import { DashboardLayout } from "../components/layout/layout";

export default function MeaPage() {
  return <></>
}

MeaPage.getLayout = (page: any) => <DashboardLayout title={"MEA"}>{page}</DashboardLayout>;