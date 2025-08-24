import { useDeleteTaskMutation, useGetTaskQuery, useUpdateTaskMutation} from "@/redux/api/baseApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";

type BookFormValues = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available: boolean;
};

function AllBooks() {
  const { data, isLoading, isError, refetch } = useGetTaskQuery(undefined);
  const [deleteBook] = useDeleteTaskMutation();
  const [updateBook] = useUpdateTaskMutation();
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  // React Hook Form for Edit
  const form = useForm<BookFormValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
      available: true,
    },
  });

  // Update book
  const handleUpdate = async (values: BookFormValues) => {
    try {
      // apply business logic: copies = 0 => available = false
      const updatedData = {
        ...values,
        available: values.copies > 0,
      };

      await updateBook({ id: selectedBook._id, ...updatedData }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Book updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setSelectedBook(null);
      refetch();
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Something went wrong.",
      });
    }
  };

  // Delete book
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        Swal.fire("Deleted!", "The book has been removed.", "success");
        refetch();
      } catch (error: any) {
        Swal.fire("Error!", error?.data?.message || "Failed to delete.", "error");
      }
    }
  };

  if (isLoading) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-16 text-red-500">Something went wrong!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">📚 Book List</h1>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border">Title</th>
              <th className="px-4 py-3 border">Author</th>
              <th className="px-4 py-3 border">Genre</th>
              <th className="px-4 py-3 border">ISBN</th>
              <th className="px-4 py-3 border">Copies</th>
              <th className="px-4 py-3 border">Availability</th>
              <th className="px-4 py-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((book: any) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{book.title}</td>
                <td className="px-4 py-3 border">{book.author}</td>
                <td className="px-4 py-3 border">{book.genre}</td>
                <td className="px-4 py-3 border">{book.isbn}</td>
                <td className="px-4 py-3 border text-center">{book.copies}</td>
                <td className="px-4 py-3 border text-center">
                  {book.copies > 0 ? (
                    <span className="text-green-600 font-medium">Available</span>
                  ) : (
                    <span className="text-red-600 font-medium">Unavailable</span>
                  )}
                </td>
                <td className="px-4 py-3 border text-center space-x-2">
                  {/* Edit */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedBook(book);
                          form.reset(book);
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-white">
                      <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleUpdate)}
                          className="space-y-4"
                        >
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="genre"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Genre</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="isbn"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ISBN</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="copies"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Copies</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    value={field.value ?? ""}
                                    onChange={(e) =>
                                      field.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">Save</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  {/* Delete */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllBooks;
