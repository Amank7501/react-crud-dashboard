import type { User } from "../types/user";
import { api } from "./axiosInstance";

export const getUsers = () => api.get<User[]>("/users");
