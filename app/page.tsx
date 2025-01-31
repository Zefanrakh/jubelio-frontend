"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  /* ----------------------------- HOOK -------------------------------- */

  const router = useRouter();
  useEffect(() => {
    router.replace("/products");
  }, [router]);

  /* ----------------------------- RENDER -------------------------------- */

  return <></>;
}
