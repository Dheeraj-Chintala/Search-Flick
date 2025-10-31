import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface TopSearch {
  _id: string;
  count: number;
}

export const TopSearches = () => {
  const [topSearches, setTopSearches] = useState<TopSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSearches = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/search/top-searches`, {
          withCredentials: true,
        });
        setTopSearches(response.data);
      } catch (error) {
        console.error('Failed to fetch top searches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSearches();
  }, []);

  if (loading) {
    return (
      <Card className="mb-6 p-4 shadow-soft">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
      </Card>
    );
  }

  return (
    <Card className="mb-6 p-4 shadow ">
      <div className="flex items-center gap-2 mb-3 ">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Top Searches</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {topSearches.map((item) => (
          <Badge
            key={item._id}
            variant="secondary"
            className="cursor-default bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 shadow"
          >
            {item._id} ({item.count})
          </Badge>
        ))}
      </div>
    </Card>
  );
};
