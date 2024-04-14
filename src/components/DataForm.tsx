import React, { useState } from "react";
import { z } from "zod";
import useStore from "../store";
import Input from "./Input";
import Button from "./Button";

const validationSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(20, { message: "Username cannot exceed 20 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .regex(/^[^\s]{8,}$/, {
      message: "Password must be at least 8 characters long",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message: "Password must contain at least one special character",
    }),

  iban: z.string().regex(/^[A-Z]{2}\d{2}[A-Z\d]{4}\d{7}([A-Z\d]?){0,16}$/, {
    message: "Invalid IBAN format",
  }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Invalid format: it should be YYYY-MM-DD",
  }),
});

const DataForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const addUser = useStore((state) => state.addUser);
  const [form, setForm] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    iban: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    iban: "",
    dateOfBirth: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      validationSchema.parse(form);
      addUser(form);
      setForm({
        id: "",
        name: "",
        username: "",
        email: "",
        password: "",
        iban: "",
        dateOfBirth: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Form validation error:", error);
        setErrors(
          error.errors.reduce((acc: any, curr: any) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {}),
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <span>{errors.name}</span>
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <span>{errors.username}</span>
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <span>{errors.email}</span>
        <Input
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <span>{errors.password}</span>
        <Input
          label="IBAN"
          name="iban"
          value={form.iban}
          onChange={handleChange}
        />
        <span>{errors.iban}</span>
        <Input
          label="Date of Birth"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
        />
        <span>{errors.dateOfBirth}</span>
        <Button label="Submit" onClick={() => {}} disabled={submitting} />
      </form>
    </div>
  );
};

export default DataForm;
