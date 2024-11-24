import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
// import { fetchUserData } from "@/app/api/auth/login/route";

const CoursesPage = async () => {
  // const { userId } = await fetchUserData();
  const userId = 'user_2no8EeRrF7sTuLtyPuYlo5s59x1';

  if (!userId) {
    return redirect("/search");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={courses} />
    </div>
   );
}
 
export default CoursesPage;