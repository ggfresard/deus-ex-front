import { useProtectedRoute } from "utils"

export default function Home() {
  useProtectedRoute()

  return <div>DashBoard</div>
}
