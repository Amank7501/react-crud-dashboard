import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../services/user.service";
import { api } from "../api/axiosInstance";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import type { User } from "../types/user";


export default function Users() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const createUser = useMutation({
    mutationFn: (payload: { name: string }) =>
      api.post("/users", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setName("");
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: number) => api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  if (isLoading) return <Loader />;

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />

      <Button
        onClick={() =>
          createUser.mutate(
            { name },
            {
              onError: () => alert("Failed to create user"),
            }
          )
        }
      >
        Add User
      </Button>

      <ul>
        {data?.map((user) => (
          <li key={user.id} style={{ marginTop: 10 }}>
            {user.name}
            <Button
              onClick={() =>
                deleteUser.mutate(user.id, {
                  onError: () => alert("Failed to delete user"),
                })
              }
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
