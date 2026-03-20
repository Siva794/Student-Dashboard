import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import PeriodCard from "./PeriodCard";
import { filterPeriods } from "@/lib/timetable";

export default function MobileTimetable({
  days,
  activeDayIndex,
  setActiveDayIndex,
  todayKey,
  currentPeriod,
  findSubject,
  currentRef,

  isEditing,
  overrides,
  handleOverride,
  subjects,
}) {
  // ✅ SAFETY: prevent crash
  if (!days || days.length === 0) return null;

  const currentDayData = days[activeDayIndex];
  if (!currentDayData) return null;

  const [day, periods] = currentDayData;
  const isToday = day === todayKey;

  return (
    <div className="md:hidden space-y-4">

      {/* 🔢 DAY SWITCH BUTTONS */}
      <div className="flex justify-center gap-2">
        {days.map(([d], idx) => {
          const isActive = idx === activeDayIndex;
          const isTodayBtn = d === todayKey;

          return (
            <button
              key={d}
              onClick={() => setActiveDayIndex(idx)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold flex items-center justify-center transition
                ${isActive
                  ? "bg-black text-white"
                  : "bg-white border text-gray-600 hover:bg-gray-100"}
                ${isTodayBtn ? "ring-2 ring-yellow-400" : ""}
              `}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* 📅 DAY CARD */}
      <Card className={isToday ? "ring-2 ring-yellow-400" : ""}>
        <SectionTitle>
          {day} {isToday && "🔥"}
        </SectionTitle>

        {/* 📚 PERIOD LIST */}
        <div className="space-y-3">
          {filterPeriods(periods).map(([period, value]) => {
            const overrideKey = `${day}-${period}`;

            return (
              <PeriodCard
                key={period}
                period={period}
                value={value}
                subject={findSubject(value)}
                isCurrent={isToday && period === currentPeriod}
                currentRef={currentRef}

                // ✅ EDITING PROPS
                isEditing={isEditing}
                day={day}
                subjects={subjects}

                // ✅ SAFE override handling
                override={
                  overrides && overrideKey in overrides
                    ? overrides[overrideKey]
                    : undefined
                }

                onOverride={handleOverride}
              />
            );
          })}
        </div>
      </Card>

    </div>
  );
}