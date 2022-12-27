import Sidebar from '../components/Sidebar'
import ListTransactions from "../components/ListTransaction";
export default function Dashboard() {
  return (
    <div >
      <Sidebar components={<ListTransactions />}  />
    </div>
  )
}