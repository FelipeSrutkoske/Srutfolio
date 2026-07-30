/**
 * BackgroundFX — fixed ambient layer behind all content (z-index: -1):
 * a drifting major grid, a breathing phosphor glow, and a slow scanline
 * sweep. Purely decorative: hidden from assistive tech, ignores pointer
 * events, and is removed entirely under prefers-reduced-motion (CSS).
 */
export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="bg-fx">
      <div className="bg-fx-grid" />
      <div className="bg-fx-glow" />
      <div className="bg-fx-sweep" />
    </div>
  );
}
