
export default function PricingPage() {
  return (
    <section className="text-white py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-slate-400 mb-4">For individuals exploring CodeKrew</p>
          <p className="text-3xl font-bold mb-6">$0</p>
          <ul className="text-sm text-slate-300 space-y-2 mb-6">
            <li>Access to AI Writing Bot</li>
            <li>Basic Widget Dashboard</li>
            <li>1 Project Workspace</li>
          </ul>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
            Start for Free
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 text-center border border-orange-500">
          <h2 className="text-2xl font-semibold mb-2">Pro</h2>
          <p className="text-slate-400 mb-4">For solo builders and small teams</p>
          <p className="text-3xl font-bold mb-6">$12/mo</p>
          <ul className="text-sm text-slate-300 space-y-2 mb-6">
            <li>Everything in Free</li>
            <li>Unlimited Projects & Widgets</li>
            <li>AI Deployment + GitBot Access</li>
          </ul>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
            Upgrade to Pro
          </button>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Team</h2>
          <p className="text-slate-400 mb-4">Best for growing product teams</p>
          <p className="text-3xl font-bold mb-6">$29/mo</p>
          <ul className="text-sm text-slate-300 space-y-2 mb-6">
            <li>Everything in Pro</li>
            <li>Team Collaboration Features</li>
            <li>PMBot + Sprint Tracker</li>
          </ul>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
