import React from "react";

export default function AdminTables() {
  const invoices = [
    {
      id: "INV-048-9921432",
      name: "Distributor Bali / 100x Lime Splash",
      date: "29-12-24",
      amount: "Rp 8.500.000",
      status: "Lunas",
    },
    {
      id: "INV-012-3456789",
      name: "Kafe Seminyak / 40x Citrus Bloom",
      date: "28-12-24",
      amount: "Rp 3.200.000",
      status: "Lunas",
    },
    {
      id: "INV-024-3456789",
      name: "Reseller Canggu / 30x Berry Breeze",
      date: "24-12-24",
      amount: "Rp 2.490.000",
      status: "Proses",
    },
    {
      id: "INV-019-8734211",
      name: "Hotel Sunset Sanur / 50x Mint Chill",
      date: "22-12-24",
      amount: "Rp 4.150.000",
      status: "Lunas",
    },
  ];

  const activities = [
    {
      initials: "UI",
      name: "Uchiha Itachi",
      time: "Baru saja",
      invoice: "INV-048-9921432",
      avatarBg: "bg-zesto-forest text-zesto-lime ring-zesto-mint",
    },
    {
      initials: "HS",
      name: "Haruno Sakura",
      time: "15 menit lalu",
      invoice: "INV-012-3456789",
      avatarBg: "bg-amber-600 text-white ring-amber-100",
    },
    {
      initials: "YI",
      name: "Yamanaka Ino",
      time: "1 jam lalu",
      invoice: "INV-024-3456789",
      avatarBg: "bg-zesto-lime text-zesto-forest ring-zesto-forest/20",
    },
    {
      initials: "NM",
      name: "Nara Shikamaru",
      time: "3 jam lalu",
      invoice: "INV-019-8734211",
      avatarBg: "bg-emerald-700 text-white ring-emerald-100",
    },
  ];

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-12 gap-5"
      data-purpose="bottom-data-section"
    >
      {/* Left: New Invoice / Recent Orders Table */}
      <div
        className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80"
        data-purpose="invoice-table-card"
      >
        <div className="flex items-center justify-between pb-4">
          <h3 className="text-sm font-bold text-zesto-forest">New invoice</h3>
          <button
            className="text-zesto-gray-400 hover:text-zesto-forest p-1 rounded-lg cursor-pointer"
            title="More options"
            type="button"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        {/* Clean Invoice Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-zesto-gray-400 border-b border-zesto-gray-100">
                <th className="font-semibold py-2.5 pr-4">Invoice ID</th>
                <th className="font-semibold py-2.5 px-4">Invoice Name</th>
                <th className="font-semibold py-2.5 px-4">Date</th>
                <th className="font-semibold py-2.5 pl-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zesto-gray-100 font-medium">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-zesto-mint-subtle transition-colors"
                >
                  <td className="py-3.5 pr-4 font-bold text-zesto-forest whitespace-nowrap">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-4 text-zesto-gray-700">{inv.name}</td>
                  <td className="py-3.5 px-4 text-zesto-gray-500 whitespace-nowrap">
                    {inv.date}
                  </td>
                  <td className="py-3.5 pl-4 font-bold text-zesto-forest text-right whitespace-nowrap">
                    {inv.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Recent Activity List */}
      <div
        className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-card border border-zesto-gray-200/80"
        data-purpose="recent-activity-card"
      >
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-sm font-bold text-zesto-forest">Recent Activity</h3>
          <button
            className="text-zesto-gray-400 hover:text-zesto-forest p-1 rounded-lg cursor-pointer"
            title="More options"
            type="button"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>
        </div>

        {/* Activity List */}
        <div className="space-y-3.5">
          {activities.map((act) => (
            <div
              key={act.invoice}
              className="flex items-center justify-between py-1 group"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-2 ${act.avatarBg}`}
                >
                  {act.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zesto-forest group-hover:text-black">
                    {act.name}
                  </h4>
                  <p className="text-[11px] text-zesto-gray-400">{act.time}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-zesto-gray-600">
                {act.invoice}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

