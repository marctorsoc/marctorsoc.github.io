interface HeroImageProps {
  src: string;
  alt?: string;
}

export default function HeroImage({ src, alt }: HeroImageProps) {
  return (
    <div className="relative w-full mb-8">
      <div className="relative w-full flex justify-center">
        <img
          src={src}
          alt={alt || "Hero image"}
          className="w-full max-h-[300px] object-contain"
        />
      </div>
    </div>
  );
}