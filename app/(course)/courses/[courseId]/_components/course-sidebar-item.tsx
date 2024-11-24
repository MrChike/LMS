"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import axios from "axios";

// Props interface for CourseSidebarItem
interface CourseSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
};

// Your CourseSidebarItem component
export const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-emerald-700"
      )} />
    </button>
  );
};

// Applying ISR using getStaticProps
export async function getServerSideProps() {
  // Fetch your data here, e.g., course data or other relevant information
  const courseData = await fetchCourseData();

  return {
    props: {
      courseData,
    },
    revalidate: 60, // Regenerate page at most once every 60 seconds
  };
}
  
console.log('fetch course data function executed @ app/(course)/courses/[courseId]/_components/course-sidebar-item.tsx')

// This function simulates fetching the course data; replace it with your actual fetching logic.
async function fetchCourseData() {
  const response = await axios.get('/app/api/courses');
  console.log('fetch course data function executed @ app/(course)/courses/[courseId]/_components/course-sidebar-item.tsx')
  const data = await response;
  return data;
}
