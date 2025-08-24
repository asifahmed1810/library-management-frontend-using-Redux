import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTask1Mutation, useGetTaskQuery } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

type BorrowFormValues = {
  book: string;
  quantity: number;
  dueDate: string;
};

const BorrowModal = () => {
  const [createTask] = useCreateTask1Mutation();
  const { data: books, isLoading: loadingBooks } = useGetTaskQuery(undefined);
  console.log({data:books});

  const form = useForm<BorrowFormValues>({
    defaultValues: {
      book: "",
      quantity: 1,
      dueDate: "",
    },
  });

  const onSubmit=async(data:BorrowFormValues)=>{
    try {
        const response=await createTask(data).unwrap();
        console.log("Borrow record created",response);
         Swal.fire({
        icon: "success",
        title: "Book Borrowed!",
        text: "The borrow record has been created successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      form.reset();
    } catch (error: any) {
      console.error("Failed to create borrow record:", error);

      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });

        
    }
  }
 return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Borrow Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Borrow a Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Book Selection */}
            <FormField
              control={form.control}
              name="book"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a book" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {loadingBooks ? (
                        <SelectItem value="loading">Loading...</SelectItem>
                      ) : (
                        books.data?.map((book: any) => (
                          <SelectItem key={book._id} value={book._id}>
                            {book.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Enter quantity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value ?? ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


export default BorrowModal;
