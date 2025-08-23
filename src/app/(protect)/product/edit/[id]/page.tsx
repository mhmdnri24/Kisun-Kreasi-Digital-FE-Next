"use client";

import ProductForm from "@/components/forms/product";
import { ProductPageProps } from "@/interface/product";
     
export default function EditProductPage({params}:ProductPageProps) {
 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <ProductForm type="edit" params={params}  />
        </div>
    );
}
