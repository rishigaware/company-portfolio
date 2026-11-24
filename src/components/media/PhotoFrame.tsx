import Image from "next/image";
import { SceneArt, type Scene } from "./SceneArt";

/**
 * Shows a real photo when `src` is given (put files in /public/images/…),
 * otherwise an illustrated placeholder for the given scene.
 */
export function PhotoFrame({
  src,
  alt,
  scene,
  accent,
  className = "",
  sizes = "(max-width: 768px) 90vw, 50vw",
  priority,
}: {
  src?: string;
  alt: string;
  scene: Scene;
  accent?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={src.startsWith("http")} className="object-cover" />
      ) : (
        <SceneArt scene={scene} accent={accent} />
      )}
    </div>
  );
}
