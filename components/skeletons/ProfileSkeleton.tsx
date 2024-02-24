import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <section>
      <form className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="w-[72px] h-[72px] rounded-full bg-pink-800/50" />
          <Skeleton className="w-28 h-10 bg-pink-800/50" />
        </div>
        <Skeleton className="w-full h-9 bg-pink-800/50" />
        <div className="flex gap-3">
          <Skeleton className="w-full h-9 bg-pink-800/50" />
          <Skeleton className="w-full h-9 bg-pink-800/50" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="w-full h-9 bg-pink-800/50" />
          <Skeleton className="w-full h-9 bg-pink-800/50" />
        </div>
        <Skeleton className="w-full h-60 bg-pink-800/50" />
      </form>
    </section>
  );
};

export default ProfileSkeleton;
