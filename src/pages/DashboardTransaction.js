import Sidebar from '../components/Sidebar'
import AllListTransactions from "../components/AllListTransaction";
export default function DashboardTransaction() {
  return (
    <Sidebar components={<AllListTransactions />}  />
  )
}