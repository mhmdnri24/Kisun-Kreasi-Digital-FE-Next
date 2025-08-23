import { Product } from "@/interface/product";
import { createProduct, editProduct, getProduct } from "@/services/product";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function ProductForm({ type, params }: { type: string, params: { id?: string } }) {

    const router = useRouter()

    const user = getCookie("user");
    const [form, setForm] = useState<Product>({
        id: 0,
        user_id: 1,
        name: "",
        price: 0,
        unit: "",
        category: "",
        stock: 0,
    });

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let newForm = form;
            if (typeof user === "string") {
                const userParsed = JSON.parse(user);
                newForm = { ...newForm, user_id: Number(userParsed.id) };
            }

            const response =  type == 'add' ? await createProduct(newForm) : await editProduct(form.id, newForm);
            console.log("Saved:", response.message);
            toast.success(response.message);
            router.push('/product');
        } catch (error) {
            console.error(error);
            toast.error("Error saving product");
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "stock" || name === "user_id"
                    ? Number(value)
                    : value,
        }));
    };

    useEffect(() => {
        if (type === 'edit') {
            const fetchData = async () => {
                let id: string | undefined;
                if (typeof params?.then === 'function') {
                    const resolvedParams = await params;
                    id = resolvedParams?.id;
                } else {
                    id = params?.id;
                }
                if (typeof id === 'string') {
                    const response = await getProduct(id);
                    if (response.success) {
                        setForm(response.data);
                    }
                }
            };
            fetchData();
        }
    }, [type, params]);

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg space-y-4"
        >
            <h1 className="text-xl font-bold text-center">{type == 'add' ? 'Add' : 'Edit'} Product</h1>



            <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Unit</label>
                <input
                    type="text"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    placeholder="pcs, box, kg, etc"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Category</label>
                <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 mt-1"
                    required
                />
            </div>

            <div className="flex justify-content-between gap-2">
                <button type="button" onClick={() => router.back()} disabled={loading}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 disabled:opacity-50">
                    Back
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : (type === 'add' ? "Add Product" : "Update Product")}
                </button>
            </div>
        </form>
    )
}