import type { CSSProperties, ImgHTMLAttributes } from "react";

type StaticImage = {
  src: string;
};

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | StaticImage;
  fill?: boolean;
  priority?: boolean;
};

export default function NextImage({
  src,
  fill = false,
  priority = false,
  style,
  loading,
  ...props
}: ImageProps) {
  const source = typeof src === "string" ? src : src.src;
  const resolvedSource = source.startsWith("/")
    ? `${import.meta.env.BASE_URL}${source.slice(1)}`
    : source;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : style;

  return (
    <img
      {...props}
      src={resolvedSource}
      style={fillStyle}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : props.fetchPriority}
    />
  );
}
