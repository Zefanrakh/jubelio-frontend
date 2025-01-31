"use client";
import { useSidebarStore } from "@/stores/sidebarStore";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  /* ----------------------------- STATE HOOK -------------------------------- */

  const setSidebarOpen = useSidebarStore((state) => state.setSidebarOpen);

  /* ----------------------------- FUNCTION -------------------------------- */

  const handleToggleSidebar = () => {
    setSidebarOpen();
  };

  /* ----------------------------- RENDER -------------------------------- */

  return (
    <div className={styles.header}>
      <button onClick={handleToggleSidebar}>
        <img src="/menu.png" alt="" />
      </button>
      <p>
        <span>GREEN</span> PRODUCTS
      </p>
    </div>
  );
}
