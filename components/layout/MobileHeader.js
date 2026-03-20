"use client";

export default function MobileHeader() {
  return (
    <div className="md:hidden flex items-center gap-3 p-4 border-b bg-white">

      {/* Hamburger */}
      <button
        onClick={() =>
          document.dispatchEvent(new Event("toggle-sidebar"))
        }
        className="p-2 rounded bg-gray-100"
      >
        ☰
      </button>

      {/* Title */}
      <h1 className="font-semibold text-lg">
        Student Portal
      </h1>

    </div>
  );
}