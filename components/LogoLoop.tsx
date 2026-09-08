"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, Key, ReactNode, RefObject } from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 1 };

type ImageLogo = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
};

type NodeLogo = {
  node: ReactNode;
  title?: string;
  ariaLabel?: string;
  href?: string;
};

export type LogoItem = ImageLogo | NodeLogo;

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: Key) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

const toCssLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

function useResizeObserver(
  callback: () => void,
  elements: RefObject<HTMLElement | null>[],
  dependencies: unknown[],
) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((elementRef) => {
      if (!elementRef.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(elementRef.current);
      return observer;
    });

    callback();
    return () => observers.forEach((observer) => observer?.disconnect());
    // The caller provides the values that affect the measured sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, elements, dependencies]);
}

function useImageLoader(
  sequenceRef: RefObject<HTMLUListElement | null>,
  onLoad: () => void,
  dependencies: unknown[],
) {
  useEffect(() => {
    const images = sequenceRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) onLoad();
    };

    images.forEach((image) => {
      if (image.complete) handleImageLoad();
      else {
        image.addEventListener("load", handleImageLoad, { once: true });
        image.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((image) => {
        image.removeEventListener("load", handleImageLoad);
        image.removeEventListener("error", handleImageLoad);
      });
    };
    // The caller provides the values that affect image sizing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, sequenceRef, dependencies]);
}

function useAnimationLoop(
  trackRef: RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  sequenceWidth: number,
  sequenceHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) {
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const sequenceSize = isVertical ? sequenceHeight : sequenceWidth;

    if (sequenceSize > 0) {
      offsetRef.current = ((offsetRef.current % sequenceSize) + sequenceSize) % sequenceSize;
      track.style.transform = isVertical
        ? `translate3d(0, ${-offsetRef.current}px, 0)`
        : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animate = (timestamp: number) => {
      if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sequenceSize > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % sequenceSize) + sequenceSize) % sequenceSize;
        offsetRef.current = nextOffset;
        track.style.transform = isVertical
          ? `translate3d(0, ${-offsetRef.current}px, 0)`
          : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, sequenceWidth, sequenceHeight, isHovered, hoverSpeed, isVertical, trackRef]);
}

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLUListElement>(null);

  const [sequenceWidth, setSequenceWidth] = useState(0);
  const [sequenceHeight, setSequenceHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";
  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = isVertical
      ? direction === "up" ? 1 : -1
      : direction === "left" ? 1 : -1;
    return magnitude * directionMultiplier * (speed < 0 ? -1 : 1);
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceRect = sequenceRef.current?.getBoundingClientRect();
    const nextSequenceWidth = sequenceRect?.width ?? 0;
    const nextSequenceHeight = sequenceRect?.height ?? 0;

    if (isVertical) {
      const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentHeight > 0) containerRef.current.style.height = `${Math.ceil(parentHeight)}px`;
      if (nextSequenceHeight > 0) {
        setSequenceHeight(Math.ceil(nextSequenceHeight));
        const viewport = containerRef.current?.clientHeight ?? parentHeight ?? nextSequenceHeight;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(viewport / nextSequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM));
      }
    } else if (nextSequenceWidth > 0) {
      setSequenceWidth(Math.ceil(nextSequenceWidth));
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(containerWidth / nextSequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, sequenceRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(sequenceRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, sequenceWidth, sequenceHeight, isHovered, effectiveHoverSpeed, isVertical);

  const renderLogoItem = useCallback((item: LogoItem, key: Key) => {
    if (renderItem) return <li className="logoloop__item" key={key}>{renderItem(item, key)}</li>;

    const isNodeItem = "node" in item;
    const content = isNodeItem ? (
      <span className="logoloop__node" aria-hidden={Boolean(item.href && !item.ariaLabel)}>{item.node}</span>
    ) : (
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes={item.sizes}
        width={item.width}
        height={item.height}
        alt={item.alt ?? ""}
        title={item.title}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );

    const itemAriaLabel = isNodeItem ? item.ariaLabel ?? item.title : item.alt ?? item.title;
    const itemContent = item.href ? (
      <a className="logoloop__link" href={item.href} aria-label={itemAriaLabel || "Logo link"} target="_blank" rel="noreferrer noopener">
        {content}
      </a>
    ) : content;

    return <li className="logoloop__item" key={key}>{itemContent}</li>;
  }, [renderItem]);

  const logoLists = useMemo(() => Array.from({ length: copyCount }, (_, copyIndex) => (
    <ul
      className="logoloop__list"
      key={`copy-${copyIndex}`}
      aria-hidden={copyIndex > 0}
      ref={copyIndex === 0 ? sequenceRef : undefined}
    >
      {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
    </ul>
  )), [copyCount, logos, renderLogoItem]);

  const cssVariables = {
    "--logoloop-gap": `${gap}px`,
    "--logoloop-logoHeight": `${logoHeight}px`,
    ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
  } as CSSProperties;

  const rootClassName = [
    "logoloop",
    isVertical ? "logoloop--vertical" : "logoloop--horizontal",
    fadeOut && "logoloop--fade",
    scaleOnHover && "logoloop--scale-hover",
    className,
  ].filter(Boolean).join(" ");

  const containerStyle = {
    width: isVertical && toCssLength(width) === "100%" ? undefined : toCssLength(width) ?? "100%",
    ...cssVariables,
    ...style,
  };

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle} role="region" aria-label={ariaLabel}>
      <div
        className="logoloop__track"
        ref={trackRef}
        onMouseEnter={() => effectiveHoverSpeed !== undefined && setIsHovered(true)}
        onMouseLeave={() => effectiveHoverSpeed !== undefined && setIsHovered(false)}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
