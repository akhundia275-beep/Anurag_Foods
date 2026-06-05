import { BadgeIndianRupee, Boxes, ClipboardCheck, PackageCheck, Users } from "lucide-react";

const stats = [
  ["Orders", "128", ClipboardCheck],
  ["Revenue", "Rs 4.8L", BadgeIndianRupee],
  ["Inventory", "31 SKUs", Boxes],
  ["Customers", "86", Users]
];

const orders = [
  ["AF-20260602-1842", "Ramesh Cloud Kitchen", "Pending Verification", "Rs 18,500"],
  ["AF-20260601-0917", "North Delhi Distributor", "Processing", "Rs 72,300"],
  ["AF-20260530-4421", "Cafe Supply", "Delivered", "Rs 11,760"]
];

export default function AdminDashboardPage() {
  return (
    <section className="container-pad py-14">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-saffron">Secure admin panel</p>
      <h1 className="mt-3 text-4xl font-black text-tealInk md:text-6xl">Operations Dashboard</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {stats.map(([label, value, Icon]) => (
          <div key={label as string} className="glass rounded-lg p-5">
            <Icon className="h-7 w-7 text-leaf" />
            <p className="mt-4 text-sm font-bold text-tealInk/60">{label as string}</p>
            <p className="text-3xl font-black">{value as string}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Orders</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="text-tealInk/60">
                <tr>
                  <th className="py-3">Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order[0]} className="border-t border-tealDeep/10">
                    {order.map((cell) => (
                      <td key={cell} className="py-4 font-semibold">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-lg bg-tealDeep p-6 text-white shadow-soft">
          <PackageCheck className="h-9 w-9 text-saffron" />
          <h2 className="mt-4 text-2xl font-black">Verification queue</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">
            Review uploaded payment screenshots, match UTR numbers and move orders through Pending Verification, Approved, Rejected, Processing, Dispatched and Delivered.
          </p>
          <div className="mt-5 grid gap-2 text-sm">
            {["Products", "Categories", "Inventory", "Customers", "Bulk inquiries", "Payment screenshots"].map((item) => (
              <div key={item} className="rounded-lg bg-white/10 px-4 py-3 font-bold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
