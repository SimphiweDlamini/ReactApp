import React, { FormEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  description: z
    .string({ required_error: "Description is required" })
    .min(3, { message: "Description should be at least 3 characters" }),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount should be a number",
    })
    .min(5, { message: "Amount should be at least R5" }),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Please select a category" }),
});

type FormData = z.infer<typeof schema>;

const ExpenseTracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button disabled={!isValid} className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseTracker;
