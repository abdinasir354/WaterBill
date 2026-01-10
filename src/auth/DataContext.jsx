import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  /* ===================== USERS ===================== */
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("aquaPayUsers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("aquaPayUsers", JSON.stringify(users));
  }, [users]);

  /* ===================== BILLS ===================== */
  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem("aquaPayBills");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("aquaPayBills", JSON.stringify(bills));
  }, [bills]);

  /* 🔥 AUTO-REMOVE UNKNOWN USER TRANSACTIONS */
  useEffect(() => {
    const validUserIds = users.map((u) => u.id);

    setBills((prevBills) => {
      const cleanedBills = prevBills.filter((bill) =>
        validUserIds.includes(bill.userId)
      );

      localStorage.setItem("aquaPayBills", JSON.stringify(cleanedBills));
      return cleanedBills;
    });
  }, [users]);

  /* ===================== USER ACTIONS ===================== */
  const addUser = (userData) => {
    const newUser = {
      id: Date.now().toString(),
      role: "user",
      avatar: "👤",
      ...userData,
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id, data) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setBills((prev) => prev.filter((b) => b.userId !== id));
  };

  /* ===================== BILL ACTIONS ===================== */
  const createBill = (userId, amount) => {
    // ❌ Block invalid users
    const userExists = users.some((u) => u.id === userId);
    if (!userExists) return;

    const newBill = {
      id: `#INV-${Math.floor(10000 + Math.random() * 90000)}`,
      userId,
      amount: parseFloat(amount).toFixed(2),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "Pending",
    };

    setBills((prev) => [newBill, ...prev]);
  };

  const payBill = (billId) => {
    setBills((prev) =>
      prev.map((bill) =>
        bill.id === billId
          ? {
              ...bill,
              status: "Paid",
              datePaid: new Date().toLocaleDateString("en-US"),
              method: "Credit Card",
            }
          : bill
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        users,
        bills,
        addUser,
        updateUser,
        deleteUser,
        createBill,
        payBill,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
