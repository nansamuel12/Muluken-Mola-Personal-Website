import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { CredentialItem } from '../data/profileData';

interface CredentialLightboxProps {
  items: CredentialItem[];
  activeId: string | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export function CredentialLightbox({
  items,
  activeId,
  onClose,
  onSelect,
}: CredentialLightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  const currentIndex = activeId
    ? items.findIndex((item) => item.id === activeId)
    : -1;
  const current = currentIndex >= 0 ? items[currentIndex] : null;

  useEffect(() => {
    setZoomed(false);
  }, [activeId]);

  useEffect(() => {
    if (!current) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % items.length;
        onSelect(items[nextIndex].id);
      } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, currentIndex, items, onClose, onSelect]);

  if (!current) return null;

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex].id);
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex].id);
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex flex-col bg-zinc-950/95 text-zinc-100 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      <div className="flex items-center justify-between gap-6 border-b border-zinc-800 px-6 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{current.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{current.referenceId}</span>
            <span aria-hidden="true">·</span>
            <span>{current.date}</span>
          </div>
          <h3 className="mt-0.5 truncate font-display text-lg font-semibold text-white">
            {current.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomed((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap shrink-0"
          >
            {zoomed ? (
              <>
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
                <span>Fit View</span>
              </>
            ) : (
              <>
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
                <span>Inspect Detail</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close document viewer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-auto p-6 md:p-10">
        <div className="mx-auto flex min-h-full max-w-5xl items-center justify-center">
          <img
            src={current.imageSrc}
            alt={current.title}
            referrerPolicy="no-referrer"
            onClick={() => setZoomed((prev) => !prev)}
            className={`rounded-lg bg-white shadow-2xl transition-transform duration-200 cursor-zoom-in ${
              zoomed
                ? 'max-w-none w-[1250px] cursor-zoom-out'
                : 'max-h-[74vh] w-auto max-w-full object-contain'
            }`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 px-6 py-4">
        <p className="max-w-3xl text-sm text-zinc-300">{current.description}</p>

        <div className="flex items-center gap-2 shrink-0">
          <span className="mr-2 font-mono text-xs tabular-nums text-zinc-400">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous document"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next document"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 whitespace-nowrap"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
