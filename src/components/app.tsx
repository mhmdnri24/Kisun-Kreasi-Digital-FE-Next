import Navbar from "./partials/Navbar";

export default function AppLayout({children}: {children: React.ReactNode}){
    return <div>
         <Navbar />
         {children}</div>
}