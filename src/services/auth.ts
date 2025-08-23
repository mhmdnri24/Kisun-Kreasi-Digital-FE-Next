import api from "@/lib/axios";

import Cookies from "js-cookie";

export async function loginProcess(username: string, password: string) {
  const res = await api.post("/auth/login.php", { username, password });
  return res.data;
}


export async function logoutProcess() {
  Cookies.remove("token");
  Cookies.remove("user");

  return true;
}

export async function regisProcess(email:string, username: string, password: string) {
  const res = await api.post("/auth/register.php", { email, username, password });
  return res.data;
}
