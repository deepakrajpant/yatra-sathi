import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`
        animate-pulse rounded-lg bg-slate-200
        ${className}
      `}
    />
  );
};

export default Skeleton;
