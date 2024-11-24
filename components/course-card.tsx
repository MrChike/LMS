import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { FaStar } from 'react-icons/fa';
import axios from "axios";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

// Rating component
const Rating = () => {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '14px',
    },
    score: {
      fontWeight: 'bold',
      marginRight: '0.2rem',
    },
    reviewCount: {
      color: '#666',
    },
    star: {
      color: 'gold',
      marginRight: '0.2rem',
    },
  };

  // Function to generate a random rating score
  function getRandomRating() {
    return (Math.random() * (5 - 1) + 1).toFixed(1); // Random score between 1.0 and 5.0
  }

  // Function to generate a realistic number of reviews
  function getRandomReviewCount() {
    const minReviews = 100;   // Minimum realistic review count
    const maxReviews = 50000; // Maximum realistic review count
    return Math.floor(Math.random() * (maxReviews - minReviews + 1)) + minReviews;
  }

  function formatReviewCount(count: number) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k'; // Format to 'x.xk' if 1000 or more
    }
    return count.toString(); // Return as a string if less than 1000
  }

  return (
    <div style={styles.container}>
      <FaStar style={styles.star} aria-label="Rating star" />
      <span style={styles.score}>{getRandomRating()}</span>
      <span style={styles.reviewCount}>({formatReviewCount(getRandomReviewCount())} reviews)</span>
    </div>
  );
};

// CourseCard Component
export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2" style={{ fontFamily: 'system-ui' }}>
            {title}
          </div>
          <p className="text-xs text-muted-foreground" style={{ fontSize: '15px', marginTop: '10px' }}>
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs" style={{ fontSize: '10px' }}>
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span style={{ fontSize: 'small' }}>
                {chaptersLength === 1 ? Math.floor(Math.random() * 9) + 12 : chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
              <Rating />
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

// CoursesPage Component
interface CoursesPageProps {
  courses: CourseCardProps[];
}

const CoursesPage = ({ courses }: CoursesPageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          imageUrl={course.imageUrl}
          chaptersLength={course.chaptersLength}
          price={course.price}
          progress={course.progress}
          category={course.category}
        />
      ))}
    </div>
  );
};

export default CoursesPage;

// Fetch data for the CoursesPage with ISR
export async function getStaticProps() {
  // Fetch data (e.g., from an API or a database)
  const response = await axios.get('/app/api/courses'); // replace with your data source
  const courses = await response; // Assuming it returns an array of courses
  console.log('courses', courses)

  return {
    props: {
      courses, // Pass the courses data to the component
    },
    revalidate: 60, // Regenerate page at most once every 60 seconds
  };
}
