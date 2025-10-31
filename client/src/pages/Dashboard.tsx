import { useState } from 'react';
import axios from 'axios';
import { TopSearches } from '@/components/TopSearches';
import { SearchBar } from '@/components/SearchBar';
import { ImageGrid } from '@/components/ImageGrid';
import { SearchHistory } from '@/components/SearchHistory';
import { UserMenu } from '@/components/UserMenu';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  user: {
    name: string;
  };
}

const Dashboard = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setSearchTerm(term);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/search`,
        { term },
        { withCredentials: true }
      );
      setImages(response.data.results || []);
    } catch (error) {
      toast.error('Failed to search images');
      console.error('Search error:', error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border  backdrop-blur supports-[backdrop-filter]:bg-card/40 shadow ">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Search className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Search Flick </h1>
              <p className="text-xs text-muted-foreground">Using Unsplash API</p>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Left Column - Main Content */}
          <div>
            <TopSearches />
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : (
              <ImageGrid images={images} searchTerm={searchTerm} />
            )}
          </div>

          {/* Right Column - Search History */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <SearchHistory />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
