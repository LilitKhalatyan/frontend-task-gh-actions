import React, { useEffect, useState } from "react";
import DataTable from "../components/Table";
import useStore from "../store";
import Button from "../components/Button";
import { User } from "../utils/types";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const TablePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useStore((state) => state.fetchUsers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUsers]);

  const goToFormPage = () => {
    window.location.href = "/moderator";
  };

  return (
    <div>
      <Button label="Go to Form Page" onClick={goToFormPage} />
      <h1>User Data</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : users.length > 0 ? (
        <DataTable data={users} headers={Object.keys(users[0])} />
      ) : (
        <p>No data available</p>
      )}
      <Button label="Reload Data" onClick={fetchUsers} />
    </div>
  );
};

export default TablePage;
