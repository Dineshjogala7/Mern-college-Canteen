import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Sales = () => {
    const [salesData, setSalesData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [todaySales, setTodaySales] = useState(0);
    const [todayOrders, setTodayOrders] = useState(0);
    const [avgOrder, setAvgOrder] = useState(0);
    const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/admin/getsales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rawData = result.data.salesData;

        // Step 1: Build full month days
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const allDays = Array.from({ length: daysInMonth }, (_, i) => {
          const d = new Date(year, month, i + 1);
          return {
            name: d.getDate(), // X-axis (day of month)
            revenue: 0,
            orders: 0,
            date: d.toISOString().split("T")[0], // YYYY-MM-DD
          };
        });

        // Step 2: Merge API sales into allDays
        rawData.forEach((item) => {
          const day = new Date(item.date).getDate();
          allDays[day - 1].revenue = item.totalRevenue;
          allDays[day - 1].orders = item.totalOrders;
        });

        setSalesData(rawData);
        setChartData(allDays);

        // Step 3: Today’s stats
        const today = now.getDate();
        const todayData = allDays[today - 1];
        setTodaySales(todayData.revenue);
        setTodayOrders(todayData.orders);
        setAvgOrder(todayData.orders > 0 ? (todayData.revenue / todayData.orders).toFixed(2) : 0);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchSalesData();
  }, [token]);

  return (
    <div className="min-h-screen w-full bg-[#e8f1ec] py-16 ">
      <h1 className="font-thin tracking-wider text-3xl text-center mt-8 mb-6">
        DASHBOARD
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-medium">Today’s Revenue</h2>
          <p className="text-2xl font-bold text-green-600">₹{todaySales}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-medium">Today’s Orders</h2>
          <p className="text-2xl font-bold text-blue-600">{todayOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-medium">Avg. Order Value</h2>
          <p className="text-2xl font-bold text-purple-600">₹{avgOrder}</p>
        </div>
      </div>

      {/* REVENUE CHART */}
      <div className="px-8 mb-12">
        <h2 className="text-xl font-semibold mb-4">Revenue Trend (This Month)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ORDERS CHART */}
      <div className="px-8">
        <h2 className="text-xl font-semibold mb-4">Orders Trend (This Month)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" label={{ value: "Day", position: "insideBottom", offset: -5 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Sales;
