import Sidebar from '../components/Sidebar'
import AllListTransactions from "../components/AllListTransaction";
import { useEffect } from 'react';
export default function DashboardTransaction() {
  useEffect(() => {
    document.title = 'All Transactions - GoSky Admin'
  }, [])

  return (
    <Sidebar components={<AllListTransactions />}  />
  )
}