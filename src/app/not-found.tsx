import Link from "next/link";
export default function NotFound() {
  return (
    <main data-theme="dark" className="circuit-bg flex min-h-screen items-center"><div className="container-x py-20">
      <p className="eyebrow">404</p><h1>We could not find that page.</h1>
      <p className="lede mt-3">The link may be old. Try the products or tell us what you are looking for.</p>
      <div className="mt-6 flex gap-3"><Link href="/products" className="btn btn-primary no-underline">See products</Link><Link href="/" className="btn btn-secondary no-underline">Home</Link></div>
    </div></main>
  );
}
