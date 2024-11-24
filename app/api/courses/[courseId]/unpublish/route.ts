import { NextResponse } from "next/server";
import { db } from "@/lib/db";
// import { fetchUserData } from "@/app/api/auth/login/route";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // const { userId } = await fetchUserData();
    const userId = 'user_2no8EeRrF7sTuLtyPuYlo5s59x1';

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unpublishedCourse);
  } catch (error) {
    console.log("[COURSE_ID_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}