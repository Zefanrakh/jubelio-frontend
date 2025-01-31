import styles from "@/styles/Spinner.module.scss";

export default function LoadingSpinner({ className }: { className?: string }) {
  /* ----------------------------- RENDER -------------------------------- */

  return <div className={styles.spinner + " " + (className ?? "")}></div>;
}
