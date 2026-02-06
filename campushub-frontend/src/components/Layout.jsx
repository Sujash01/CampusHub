import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen page-bg">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {children}
      </main>
    </div>
  );
}
