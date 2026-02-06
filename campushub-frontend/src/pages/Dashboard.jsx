import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Events" value="12" />
        <Card title="Announcements" value="4" />
        <Card title="Registrations" value="28" />
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="glass-elevated p-8 rounded-3xl text-center">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-4xl font-bold text-green-400">{value}</h2>
    </div>
  );
}
