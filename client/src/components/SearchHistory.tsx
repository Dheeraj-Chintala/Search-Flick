import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { History, Clock } from 'lucide-react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface HistoryItem {
  term: string;
  timestamp: string;
}

export const SearchHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/user/history`, {
          withCredentials: true,
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch search history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Card className="p-4 shadow-soft">
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow">
      <div className="mb-4 flex items-center gap-2">
        <History className="h-5 w-5 text-primary" />
        <h2 className="font-semibold text-foreground">Search History</h2>
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground">No search history yet</p>
      ) : (
        <div className="space-y-2">
          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 shadow"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.term}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
