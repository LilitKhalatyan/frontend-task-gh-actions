import React, { useState } from "react";
import { z } from "zod";
import useStore from "../store";
import Input from "./Input";
import Button from "./Button";

const validationSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  username: z.string().min(4).max(20),
  email: z.string().email(),
  iban: z
    .string()
    .length(2, { message: "IBAN must contain exactly 22 characters" }),
  dateOfBirth: z.string(),
});

const DataForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const addUser = useStore((state) => state.addUser);
  const [form, setForm] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    iban: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
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
        <Button label="Submit" onClick={() => {}} disabled={submitting} />
      </form>
    </div>
  );
};

export default DataForm;
