"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import { getData } from "@/lib/storage";
import { useRouter } from "next/navigation";

// UI
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Marks() {
  const router = useRouter();
  const { data, setData } = useAppStore();

  useEffect(() => {
    if (!data) {
      const saved = getData();
      if (saved) setData(saved);
      else router.push("/");
    }
  }, [data, setData, router]);

  // ✅ Smart formatter
  const formatNumber = (num) => {
    const n = Number(num) || 0;
    return Number.isInteger(n) ? n : n.toFixed(1);
  };

  // ✅ Filter only theory subjects
  const allMarks = data?.marks || [];

  const marksMap = {};

  // Group by subject (use code as key)
  allMarks.forEach((m) => {
    const key = m.code || m.course_title;

    if (!marksMap[key]) {
      marksMap[key] = [];
    }

    marksMap[key].push(m);
  });

  // Apply logic
  const marks = Object.values(marksMap).map((group) => {
    const theory = group.find(
      (g) => g.course_type !== "Practical"
    );

    // If theory exists → use it
    if (theory) return theory;

    // Else → return practical
    return group[0];
  });

  if (!data) {
    return (
      <div className="p-4 md:p-6 min-h-screen bg-gray-100">
        Loading marks...
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold mb-4">
        Marks Overview
      </h1>

      {marks.length === 0 && (
        <div className="text-gray-500">
          No marks data available
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {marks.map((m, i) => {

          // 📊 Safe calculation
          let totalObtained = 0;
          let totalMax = 0;

          (m.tests || []).forEach((t) => {
            totalObtained += Number(t.obtained) || 0;
            totalMax += Number(t.max) || 0;
          });

          const percent =
            totalMax > 0
              ? formatNumber((totalObtained / totalMax) * 100)
              : 0;

          return (
            <Card key={i}>

              {/* Subject Title */}
              <SectionTitle>
                {m.course_title || "Unknown Subject"}
              </SectionTitle>

              {/* Code */}
              <p className="text-xs md:text-sm text-gray-500">
                {m.code || "N/A"}
              </p>

              {/* Tests */}
              <div className="mt-3 space-y-2 text-xs md:text-sm">

                {(m.tests || []).length === 0 && (
                  <p className="text-gray-400">
                    No marks available
                  </p>
                )}

                {(m.tests || []).map((t, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b pb-1"
                  >
                    <span className="font-medium">
                      {t.name}
                    </span>

                    <span>
                      {formatNumber(t.obtained)} /{" "}
                      {formatNumber(t.max)}
                    </span>
                  </div>
                ))}

              </div>

              {/* Total Section */}
              <div className="mt-4 pt-3 border-t text-center">

                {/* Total */}
                <div className="text-xl md:text-2xl font-bold">
                  {formatNumber(totalObtained)} /{" "}
                  {formatNumber(totalMax)}
                </div>

                {/* Percentage */}
                <div className="text-sm md:text-base font-semibold text-blue-600 mt-1">
                  Overall: {percent}%
                </div>

              </div>

            </Card>
          );
        })}
      </div>
    </div>
  );
}