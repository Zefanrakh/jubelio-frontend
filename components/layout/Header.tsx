"use client";
import { useSidebarStore } from "@/stores/sidebarStore";
import styles from "@/styles/Header.module.scss";

export default function Header() {
  const setSidebarOpen = useSidebarStore((state) => state.setSidebarOpen);

  const handleToggleSidebar = () => {
    setSidebarOpen();
  };

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
