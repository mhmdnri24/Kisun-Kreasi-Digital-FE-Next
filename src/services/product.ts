import { Product } from "@/interface/product";
import api from "@/lib/axios";

export async function getProducts() {
  const res = await api.get("/product/read.php");
  return res.data;
}

export async function createProduct(data: Product) {
  const res = await api.post("/product/create.php", data);
  return res.data;
}

export async function editProduct(id:number,data: Product) {
  const res = await api.put("/product/update.php?id="+id, data);
  return res.data;
}

export async function getProduct(id:string) {
  const res = await api.get("/product/single.php?id="+id);
  return res.data;
}

export async function deleteProduct(id:string) {
  const res = await api.delete("/product/delete.php?id="+id);
  return res.data;
}
