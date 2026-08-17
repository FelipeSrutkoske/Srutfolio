import LetterGlitch from "@/components/letter-glitch";

export default function BackgroundFX() {
  return (
    <div aria-hidden="true" className="bg-fx">
      <div className="bg-fx-glitch">
        <LetterGlitch glitchSpeed={80} smooth />
      </div>
      <div className="bg-fx-grid" />
      <div className="bg-fx-glow" />
      <div className="bg-fx-sweep" />
    </div>
  );
}
