import { NextResponse } from "next/server";

import { db } from "@/lib/db";
// import { fetchUserData } from "@/app/api/auth/login/route";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // const { userId } = await fetchUserData();
    const userId = 'user_2no8EeRrF7sTuLtyPuYlo5s59x1';
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      }
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      }
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("COURSE_ID_ATTACHMENTS", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}