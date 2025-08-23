import { useGetTaskQuery } from "@/redux/api/baseApi";

function AllBooks() {
  const { data, isLoading, isError } = useGetTaskQuery(undefined);
  

  if (isLoading) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-16 text-red-500">Something went wrong!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((book: any) => (
          <div
            key={book._id}
            className="p-4 border rounded-lg shadow hover:shadow-2xl transition"
          >
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Genre: {book.genre}</p>
            <p className="text-gray-600">ISBN: {book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
