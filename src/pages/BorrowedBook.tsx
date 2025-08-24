import { useGetTask1Query } from "@/redux/api/baseApi";

const BorrowedBook = () => {
  const { data, isLoading, isError } = useGetTask1Query(undefined);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto mt-16 px-4 text-center text-lg font-semibold">
        Loading Borrow Summary...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto mt-16 px-4 text-center text-red-600 font-semibold">
        Failed to load borrow summary.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Borrow Summary</h2>

      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Book Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                ISBN
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                Total Quantity Borrowed
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data?.map((item: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 border-b">{item.book?.title || "N/A"}</td>
                <td className="px-6 py-4 border-b">{item.book?.isbn || "N/A"}</td>
                <td className="px-6 py-4 border-b text-center font-medium">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowedBook;
