import { House, PackagePlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const sidebarLink = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: <House size={18} />,
  },
  {
    name: "Add Product",
    href: "/admin/add-product",
    icon: <PackagePlusIcon size={18} />,
  },
];

export default function AdminSidebar() {
  return (
    <div className="w-[200px] h-full border-r border-r-gray-300 fixed">
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {sidebarLink.map((el, i) => (
          <Link
            key={i}
            to={el.href}
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            {el.icon}
            {el.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
