
import { getUsers } from "../api/user.api";

export const fetchUsers = async () => {
 const res = await getUsers();
 return res.data;
};
