import api from "@/lib/axios";
 
export async function getUser() {
  const res = await api.get("/auth/list-users.php");
  return res.data;
}

