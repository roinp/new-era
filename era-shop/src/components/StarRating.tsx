import { Star } from "lucide-react";

export function StarRating({
  rating,
  size = 14,
  showValue = false,
  count,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < full;
          const isHalf = i === full && half;
          return (
            <Star
              key={i}
              size={size}
              className={
                filled || isHalf
                  ? "fill-accent text-accent"
                  : "text-border"
              }
              style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : undefined}
            />
          );
        })}
      </span>
      {showValue && (
        <span className="text-xs text-muted">
          {rating.toFixed(1)}
          {count !== undefined && ` (${count})`}
        </span>
      )}
    </span>
  );
}
