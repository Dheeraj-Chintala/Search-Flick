import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Image {
  id: string;
  url: string;
  alt?: string;
}

interface ImageGridProps {
  images: Image[];
  searchTerm?: string;
}

export const ImageGrid = ({ images, searchTerm }: ImageGridProps) => {
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const toggleImageSelection = (imageId: string) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev);
      newSet.has(imageId) ? newSet.delete(imageId) : newSet.add(imageId);
      return newSet;
    });
  };

  if (!images.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
        <img
          src="/searchillus.svg"
          alt="No results illustration"
          className="w-48 mb-6"
        />
        <h3 className="text-xl font-semibold text-foreground">Nothing here yet</h3>
        <p className="mt-2 text-sm">
          Try searching for something like <span className="font-medium">nature</span> or{' '}
          <span className="font-medium">architecture</span>.
        </p>
      </div>
    );
  }

  return (
    <div>
      {searchTerm && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Results for{' '}
            <span className="font-semibold text-foreground">{searchTerm}</span> —{' '}
            {images.length} found
          </p>
          {selectedImages.size > 0 && (
            <Badge className="bg-gradient-to-r from-primary to-accent text-white shadow-md">
              {selectedImages.size} selected
            </Badge>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => {
          const isSelected = selectedImages.has(image.id);
          return (
            <Card
              key={image.id}
              className={cn(
                'group relative overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer',
                isSelected && 'ring-2 ring-primary ring-offset-2'
              )}
              onClick={() => toggleImageSelection(image.id)}
            >
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.alt || 'Image'}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                {/* Checkbox */}
                <div
                  className="absolute right-2 top-2 z-10 rounded bg-card/80 p-1 shadow-sm backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleImageSelection(image.id);
                  }}
                >
                  <Checkbox
                    checked={isSelected}
                    className="border-primary data-[state=checked]:bg-primary"
                    aria-label={`Select image ${image.id}`}
                  />
                </div>

                {/* Caption */}
                {image.alt && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-medium truncate">{image.alt}</p>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
