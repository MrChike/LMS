"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  isCompleted?: boolean;
  nextChapterId?: string;
};

export const CourseProgressButton = ({
  chapterId,
  courseId,
  isCompleted,
  nextChapterId
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
        isCompleted: !isCompleted
      });

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
};

// ISR function for getting the data for the course page
export async function getStaticProps({ params }: { params: { courseId: string, chapterId: string } }) {
  try {
    // Fetch the course data from your API
    const courseRes = await axios.get(`/api/courses/${params.courseId}`);
    const chapterRes = await axios.get(`/api/courses/${params.courseId}/chapters/${params.chapterId}`);

    const courseData = courseRes.data;
    const chapterData = chapterRes.data;

    return {
      props: {
        courseData,
        chapterData
      },
      revalidate: 60, // Regenerate this page at most every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        courseData: null,
        chapterData: null
      },
      revalidate: 60, // Regenerate at most every 60 seconds
    };
  }
}

export async function getStaticPaths() {
  // Generate paths for your dynamic pages (like [courseId] and [chapterId])
  const paths = [
    // Add static paths here (for courses and chapters)
    { params: { courseId: "312b22ee-5de8-414f-82a2-7dcc99eea7c2", chapterId: "1344a26b-84c5-4a96-b2cb-fb5e89633d7b" } },
    { params: { courseId: "388ead56-ecb0-4119-9cfa-22bde6a2cc14", chapterId: "4a0ca901-3ec6-4f65-b4b9-547b91eb0b7c" } },
    // Add more paths as needed
  ];

  return {
    paths,
    fallback: 'blocking', // Block until the page is generated
  };
}
