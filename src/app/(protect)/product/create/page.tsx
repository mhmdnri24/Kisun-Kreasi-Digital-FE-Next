"use client";

import ProductForm from "@/components/forms/product";
 
export default function NewProductPage() {
 
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
           <ProductForm type="add"/>
        </div>
    );
}
