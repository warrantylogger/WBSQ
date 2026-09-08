type ArrowIconProps = {
  direction: "left" | "right" | "up" | "external";
  className?: string;
};

export default function ArrowIcon({ direction, className = "" }: ArrowIconProps) {
  const classes = `arrowIcon ${className}`.trim();

  if (direction === "external") {
    return (
      <svg className={classes} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M4 12 12 4M6 4h6v6" />
      </svg>
    );
  }

  const paths = {
    left: "M13 8H3m4-4L3 8l4 4",
    right: "M3 8h10M9 4l4 4-4 4",
    up: "M8 13V3M4 7l4-4 4 4",
  };

  return (
    <svg className={classes} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={paths[direction]} />
    </svg>
  );
}
