import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <Link to="/users">Go to Users</Link>
    </div>
  );
}
