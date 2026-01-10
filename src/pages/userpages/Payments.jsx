import React, { useState } from 'react';
import { CreditCard, History, DollarSign, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../auth/DataContext';
import { useAuth } from '../../auth/AuthContext';

function Payments() {
  const { bills, payBill } = useData();
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [method, setMethod] = useState("");
  const [phone, setPhone] = useState("");

  
  
  const userBills = bills ? bills.filter(b => b.userId === user.id) : [];
  const pendingBills = userBills.filter(b => b.status === 'Pending');
  const paidBills = userBills.filter(b => b.status === 'Paid');

  const handlePay = (billId) => {
    if (window.confirm("Confirm payment for this invoice?")) {
      payBill(billId);
      alert('Payment successful!');
    }
  };

 const downloadReceipt = (bill) => {
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");

   canvas.width = 700;
   canvas.height = 400;

 
   ctx.fillStyle = "#0a192f";
   ctx.fillRect(7, 7, canvas.width, canvas.height);
   
   <hr />

 
   ctx.fillStyle = "#4f46e5";
   ctx.font = "bold 28px Arial";
   ctx.fillText("Payment Receipt", 190, 70);
   ctx.hr

   ctx.fillStyle = "#fff";
   ctx.font = "20px Arial";
   
   <hr/>

   const userName = user?.name || "Customer";

   const lines = [
     `Name: ${userName}`,
     `Invoice ID: ${bill.id}`,
     `Date Paid: ${bill.datePaid}`,
     `Amount: $${bill.amount}`,
     `Method: ${bill.method || "N/A"}`,
     `Phone: ${bill.phone || "N/A"}`,
     `Status: PAID`,
   ];

   lines.forEach((line, i) => {
     ctx.fillText(line, 80, 120 + i * 30);
   });


   ctx.fillStyle = "#6b7280";
   ctx.font = "14px Arial";
   ctx.fillText("Thank you for your payment!", 200, 360);


   const link = document.createElement("a");
   link.download = `receipt_${bill.id}.png`;
   link.href = canvas.toDataURL("image/png");
   link.click();
 };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
  
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <AlertCircle className="text-indigo-600" />
            Pending Invoices
          </h2>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
            {pendingBills.length} Due
          </span>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {pendingBills.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {pendingBills.map((bill) => (
                <div
                  key={bill.id}
                  className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">
                        ${bill.amount}
                      </p>
                      <p className="text-sm text-gray-500">
                        Invoice {bill.id} • Issued {bill.date}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBill(bill);
                      setShowForm(true);
                    }}
                    className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 shadow-sm transition active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Pay Now</span>
                    <CreditCard size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <CheckCircle size={48} className="mx-auto text-green-400 mb-3" />
              <p className="text-lg font-medium text-gray-600">
                All caught up!
              </p>
              <p>You have no pending invoices.</p>
            </div>
          )}
        </div>
      </section>

      
      <section>
        <div className="p-2 border-b border-gray-200 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <History size={20} />
            Payment History
          </h3>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="grid gap-5 p-4">
              {paidBills && paidBills.length > 0 ? (
                paidBills.map((bill) => (
                  <div
                    key={bill.id}
                    className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-6"
                  >
                    {/* Top Row */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800">
                          Invoice #{bill.id}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Paid on {bill.datePaid}
                        </p>
                      </div>

                      <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold">
                        PAID
                      </span>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-500">Amount</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${bill.amount}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-500">Method</p>
                        <p className="font-semibold text-gray-800">
                          {bill.method || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-800">
                          {bill.phone || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-3">
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold text-green-600">
                          Successful
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex justify-end mt-5">
                      <button
                        onClick={() => downloadReceipt(bill)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
                      >
                        <Download size={16} />
                        Download Receipt
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-10">
                  No payment history available.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl space-y-5">
           
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">
                Secure Payment
              </h3>
              <p className="text-sm text-gray-500">
                Invoice #{selectedBill?.id} • ${selectedBill?.amount}
              </p>
            </div>

            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Choose Payment Method
              </label>

              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Method</option>
                <option value="EVC">EVC Plus</option>
                <option value="Edahab">Edahab</option>
                <option value="Zaad">Zaad</option>
              </select>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="e.g. 61xxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Info Box */}
            <div className="bg-indigo-50 text-indigo-700 text-sm p-3 rounded-lg">
              You will receive a confirmation request on your phone.
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="w-1/2 border border-gray-300 rounded-lg py-2.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!method || !phone) {
                    alert("Please select method and enter number");
                    return;
                  }

                  if (
                    window.confirm(
                      `Pay $${selectedBill.amount} using ${method}?`
                    )
                  ) {
                    payBill(selectedBill.id);
                    alert(`Payment successful via ${method}!`);
                    setShowForm(false);
                    setMethod("");
                    setPhone("");
                  }
                }}
                className="w-1/2 bg-indigo-600 text-white rounded-lg py-2.5 font-semibold hover:bg-indigo-700 active:scale-95 transition"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;
