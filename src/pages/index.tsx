import React from 'react';
import { AtomicOnboarding } from '../components/atomic_onboarding';
import { DashboardLayout } from '../components/layout/layout';

export default function Home() {
  return <AtomicOnboarding />
}

Home.getLayout = (page: any) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
}
