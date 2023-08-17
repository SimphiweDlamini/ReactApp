import React from "react";
import categories from "./Categories";
import { FieldValues, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import errorMap from "zod/lib/locales/en";

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const schema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description should be at least 3 characters" })
    .max(50, { message: "Description is too long" }),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount should be a number",
    })
    .min(0.01, { message: "Amount should be at least R0.01" })
    .max(100_000, {
      message: "You cannot enter an amount greater than R100 000",
    }),
  category: z.enum(categories, {
    errorMap: () => ({ message: "Category is required." }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          {...register("category")}
          id="category"
          className="form-control"
        >
          <option></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
