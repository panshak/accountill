import React from "react";
import Chart from "./Chart";
import Donut from "./Donut";
import { toCommas } from "../../utils/utils";
import { Check, Pie, Bag, Card, Clock, Frown } from "./Icons";
import moment from "moment";

const Dashboard = ({ invoices, paymentHistory }) => {
  const unpaidInvoice = invoices?.filter((i) => i.status === "Unpaid");
  const paid = invoices?.filter((i) => i.status === "Paid");
  const partial = invoices?.filter((i) => i.status === "Partial");

  let totalPaid = invoices.reduce((sum, i) => sum + (i.totalAmountReceived || 0), 0);
  let totalAmount = invoices.reduce((sum, i) => sum + i.total, 0);
  const overDue = invoices.filter((i) => i.dueDate <= new Date().toISOString());

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-600 text-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{toCommas(totalPaid)}</div>
          <div className="text-sm mt-1">Payment Received</div>
          <div className="mt-3"><Check /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{toCommas(totalAmount - totalPaid)}</div>
          <div className="text-sm mt-1">Pending Amount</div>
          <div className="mt-3"><Pie /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{toCommas(totalAmount)}</div>
          <div className="text-sm mt-1">Total Amount</div>
          <div className="mt-3"><Bag /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{invoices.length}</div>
          <div className="text-sm mt-1">Total Invoices</div>
          <div className="mt-3"><Card /></div>
        </div>

        {/* More cards */}
        <div className="bg-green-700 text-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{paid.length}</div>
          <div className="text-sm mt-1">Paid Invoices</div>
          <div className="mt-3"><Check /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{partial.length}</div>
          <div className="text-sm mt-1">Partially Paid</div>
          <div className="mt-3"><Pie /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{unpaidInvoice.length}</div>
          <div className="text-sm mt-1">Unpaid Invoices</div>
          <div className="mt-3"><Frown /></div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-xl font-bold">{overDue.length}</div>
          <div className="text-sm mt-1">Overdue</div>
          <div className="mt-3"><Clock /></div>
        </div>
      </div>

      {/* Charts Section */}
      {paymentHistory.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Payment History</h2>
            <Chart paymentHistory={paymentHistory} />
          </div>
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4">Invoice Status</h2>
            <Donut unpaid={unpaidInvoice} paid={paid} partial={partial} />
          </div>
        </div>
      )}

      {/* Recent Payments Table */}
      <div className="bg-white p-5 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Recent Payments</h2>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3 text-left">Paid By</th>
              <th className="p-3 text-left">Date Paid</th>
              <th className="p-3 text-left">Amount Paid</th>
              <th className="p-3 text-left">Payment Method</th>
              <th className="p-3 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory
              .sort((a, b) => new Date(b.datePaid) - new Date(a.datePaid))
              .slice(0, 10)
              .map((record, idx) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{record.paidBy}</td>
                  <td className="p-3">{moment(record.datePaid).format("MMMM Do YYYY")}</td>
                  <td className="p-3 text-green-600 font-semibold">{toCommas(record.amountPaid)}</td>
                  <td className="p-3">{record.paymentMethod}</td>
                  <td className="p-3">{record.note}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
