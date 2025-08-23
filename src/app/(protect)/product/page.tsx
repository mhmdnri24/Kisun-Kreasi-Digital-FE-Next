'use client'

import AuthGuard from "@/components/AuthGuard";
import { ApiResponse } from "@/interface/api-response";
import { Product } from "@/interface/product";
import { User } from "@/interface/user";
import { deleteProduct, getProducts } from "@/services/product";
import { getUser } from "@/services/user";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useEffect, useState } from "react";

 import toast from "react-hot-toast";

export default function ProductPage() {

  const router = useRouter()

    const [products,setProducts] = useState<Product[]>([])

    const getProductData = async () => { 
        const response:ApiResponse<Product> = await getProducts();
        console.log(response);
        if(response.success) {
            setProducts(response.data.lists);
        }

    };

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => { 
    setShowModal(false);
    setDeleteId(null);
   if (deleteId !== null) {
    try {
       const response = await deleteProduct(deleteId.toString());
     if (response.success) { 
         getProductData();
     }
      toast.success(response.message);
    } catch (error) {
       toast.error("Error deleting product");
    }
   }
  };

    useEffect(() => {
        getProductData();
    }, []);

    

  return (
    <AuthGuard>
      <div className="p-8">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">List Products</h1>
          <button onClick={()=>router.push('/product/create')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
        </div>
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Unit</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className="text-center">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{product.name}</td>
                <td className="px-4 py-2 border">{product.price}</td>
                <td className="px-4 py-2 border">{product.unit}</td>
                <td className="px-4 py-2 border">
                 <div className="flex justify-center">
                   <Pencil className="cursor-pointer text-blue-500" onClick={() => router.push(`/product/edit/${product.id}`)} />
                   <Trash className="cursor-pointer ml-2 text-red-500" onClick={() => handleDelete(product.id)} />
                 </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
 
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500/60 bg-opacity-5 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete this product?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
