"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { CarouselImage } from "lib/shopify";

export function HeroCarousel({ images }: { images: CarouselImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images.length) return null;

  return (
    <section className="mx-auto max-w-(--breakpoint-2xl) px-4 pb-4">
      <div className="embla relative w-full overflow-hidden rounded-lg">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex touch-pan-y gap-0">
            {images.map((img, i) => (
              <div
                key={`${img.url}-${i}`}
                className="embla__slide relative min-w-0 flex-[0_0_100%]"
              >
                <div className="relative aspect-[21/9] w-full bg-neutral-100 dark:bg-neutral-900">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 1280px, 100vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-800/90 dark:hover:bg-neutral-800"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/90 shadow-sm transition hover:bg-white disabled:pointer-events-none disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-800/90 dark:hover:bg-neutral-800"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
