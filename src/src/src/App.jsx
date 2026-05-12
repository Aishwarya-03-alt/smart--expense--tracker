import { useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function App() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Groceries",
      amount: 2500,
      category: "Food",
      date: "2026-05-01",
    },
    {
      id: 2,
      title: "Internet Bill",
      amount: 1200,
      category: "Bills",
      date: "2026-05-02",
    },
  ]);

  const colors = [
    "#2563EB",
    "#16A34A",
    "#EA580C",
    "#DC2626",
    "#9333EA",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addExpense = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.amount ||
      !formData.date
    ) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    setExpenses([newExpense, ...expenses]);

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: "",
    });
  };

  const deleteExpense = (id) => {
    setExpenses(
      expenses.filter((expense) => expense.id !== id)
    );
  };

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (total, item) => total + item.amount,
      0
    );
  }, [expenses]);

  const categoryData = useMemo(() => {
    const grouped = {};

    expenses.forEach((expense) => {
      if (grouped[expense.category]) {
        grouped[expense.category] += expense.amount;
      } else {
        grouped[expense.category] = expense.amount;
      }
    });

    return Object.keys(grouped).map((key) => ({
      name: key,
      value: grouped[key],
    }));
  }, [expenses]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">
          <h1 className="text-4xl font-bold text-slate-800">
            Smart Expense Tracker
          </h1>

          <p className="text-slate-500 mt-2">
            Track your daily spending with analytics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">

          <div className="bg-blue-600 text-white p-6 rounded-3xl">
            <h2>Total Expenses</h2>

            <p className="text-4xl font-bold mt-2">
              ₹{totalExpense}
            </p>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-3xl">
            <h2>Total Transactions</h2>

            <p className="text-4xl font-bold mt-2">
              {expenses.length}
            </p>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-3xl">
            <h2>Top Category</h2>

            <p className="text-3xl font-bold mt-2">
              {categoryData[0]?.name || "N/A"}
            </p>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Add Expense
          </h2>

          <form
            onSubmit={addExpense}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Health</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <button className="bg-slate-900 text-white p-3 rounded-xl col-span-full">
              Add Expense
            </button>

          </form>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Expense Categories
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    outerRadius={110}
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          colors[index % colors.length]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Expense Analytics
            </h2>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Recent Expenses
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Title
                  </th>

                  <th className="text-left py-3">
                    Category
                  </th>

                  <th className="text-left py-3">
                    Date
                  </th>

                  <th className="text-left py-3">
                    Amount
                  </th>

                  <th className="text-left py-3">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>

                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b"
                  >

                    <td className="py-4">
                      {expense.title}
                    </td>

                    <td>{expense.category}</td>

                    <td>{expense.date}</td>

                    <td className="font-semibold">
                      ₹{expense.amount}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          deleteExpense(expense.id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}
