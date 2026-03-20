import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import PeriodCard from "./PeriodCard";
import { filterPeriods } from "@/lib/timetable";

export default function DesktopTimetable({
  days,
  todayKey,
  currentPeriod,
  findSubject,
  currentRef,
  isEditing,
  overrides,
  handleOverride,
  subjects,
}) {
  return (
    <div className="hidden md:block space-y-6">
      {days.map(([day, periods]) => {
        const isToday = day === todayKey;

        return (
          <Card key={day} className={isToday ? "ring-2 ring-yellow-400" : ""}>
            <SectionTitle>
              {day} {isToday && "🔥"}
            </SectionTitle>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
                    isEditing={isEditing}
                    day={day}
                    subjects={subjects}
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
        );
      })}
    </div>
  );
}