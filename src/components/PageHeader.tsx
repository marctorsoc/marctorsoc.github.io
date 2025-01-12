interface PageHeaderProps {
  title: string;
  imagePath?: string;
}

export default function PageHeader({ title, imagePath }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {imagePath && (
        <div className="w-full h-48 md:h-64 overflow-hidden">
          <img 
            src={imagePath} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mt-6 px-4 md:px-8">{title}</h1>
    </div>
  );
} 