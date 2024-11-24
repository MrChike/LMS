"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
};

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
        }

        toast.success("Progress updated");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export async function getStaticProps({ params }: { params: { courseId: string } }) {
  const { courseId } = params;

  try {
    // Fetch course data
    const courseRes = await axios.get(`/api/courses/${courseId}`);
    const courseData = courseRes.data;

    // Fetch chapter data for the course
    const chapterRes = await axios.get(`/api/courses/${courseId}/chapters`);
    const chapterData = chapterRes.data;

    // Find the current chapter and the next chapter
    const currentChapter = chapterData.find((chapter: any) => chapter.id === courseData.currentChapterId);
    const nextChapter = chapterData.find((chapter: any) => chapter.id === courseData.nextChapterId);

    return {
      props: {
        playbackId: currentChapter.playbackId,
        courseId,
        chapterId: currentChapter.id,
        nextChapterId: nextChapter?.id || null,
        isLocked: currentChapter.isLocked,
        completeOnEnd: currentChapter.completeOnEnd,
        title: currentChapter.title,
      },
    };
  } catch (error) {
    console.error("Error fetching course data", error);
    return {
      notFound: true, // Return 404 if data fetch fails
    };
  }
}

export default function VideoPage({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) {
  return (
    <div>
      <h1>{title}</h1>
      <VideoPlayer
        playbackId={playbackId}
        courseId={courseId}
        chapterId={chapterId}
        nextChapterId={nextChapterId}
        isLocked={isLocked}
        completeOnEnd={completeOnEnd}
        title={title}
      />
    </div>
  );
}