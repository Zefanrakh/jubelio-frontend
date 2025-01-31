"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/Sidebar.module.scss";
import { useSidebarStore } from "@/stores/sidebarStore";
import { useEffect } from "react";

export default function SideBar() {
  /* ----------------------------- VARIABLES -------------------------------- */

  const pathname = usePathname();

  const menuItems = [
    { name: "Products", path: "/products" },
    { name: "Adjustments", path: "/adjustments" },
  ];

  /* ----------------------------- STATE HOOK -------------------------------- */

  const { open, setSidebarOpen } = useSidebarStore();

  /* ----------------------------- HOOK -------------------------------- */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    /* ----------------------------- FUNCTION HOOK -------------------------------- */

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div
      className={styles.sidebar + " " + (!open ? styles.sidebarClose : "")}
      onClick={handleOverlayClick}
    >
      <div
        className="p-4 fixed bottom-0 top-0 w-[25vw] text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3 text-gray-800">Menu</h2>
        <ul>
          {menuItems.map((menu) => (
            <li
              key={menu.name}
              style={{
                backgroundColor: pathname === menu.path && "var(--teal_900)",
                color: "white",
              }}
            >
              <Link href={menu.path}>
                <p>{menu.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
