import Graph from "./Graph";

// Helper function to get the last Monday and the upcoming Saturday
const getDateRange = () => {
  const today = new Date();
  const day = today.getDay();
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - day + (day === 0 ? -6 : 1)); // Adjust if today is Sunday
  const nextSaturday = new Date(lastMonday);
  nextSaturday.setDate(lastMonday.getDate() + 5);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  return `${formatDate(lastMonday)} - ${formatDate(nextSaturday)}`;
};

const ColumnLineChart = () => {
  const dateRange = getDateRange();

  return (
    <div className="max-w-full px-8 border border-gray-300 rounded-sm shadow-md bg-white">
      <div className="mb-8 mt-5 text-center text-gray-800">
        <h2 className="text-3xl font-bold">My Weekly Performance</h2>
        <span className="block text-lg mt-2">{dateRange}</span>
      </div>

      <div>
        <Graph />
      </div>
    </div>
  );
};

export default ColumnLineChart;
