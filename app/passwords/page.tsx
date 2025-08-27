"use client";

import { Suspense } from "react";
import PasswordPageContent from "../../components/PasswordPageContent"

export default function PasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader" />
      </div>
    }>
      <PasswordPageContent />
    </Suspense>
  );
}