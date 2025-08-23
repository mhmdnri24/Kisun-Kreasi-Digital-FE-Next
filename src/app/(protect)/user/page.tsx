'use client'

import AuthGuard from "@/components/AuthGuard";
import { ApiResponse } from "@/interface/api-response";
import { User } from "@/interface/user";
import { getUser } from "@/services/user";
import { useEffect, useState } from "react";

 

export default function UserPage() {

    const [users,setUser] = useState<User[]>([])

    const getUserData = async () => { 
        const response:ApiResponse<User> = await getUser();
        console.log(response);
        if(response.success) {
            setUser(response.data.lists);
        }

    };

    useEffect(() => {
        getUserData();
    }, []);

    

  return (
    <AuthGuard>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">List User</h1>
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Username</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.username} className="text-center">
                <td className="px-4 py-2 border">{idx + 1}</td>
                <td className="px-4 py-2 border">{user.username}</td>
                <td className="px-4 py-2 border">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AuthGuard>
  );
}
