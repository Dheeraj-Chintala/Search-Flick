import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center shadow">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Search className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        
        <h1 className="mb-2 text-3xl font-bold text-foreground">
          Search Flick
        </h1>
        <p className="mb-8 text-muted-foreground">
          Discover and save beautiful images from Unsplash
        </p>

        <Button
          onClick={handleGoogleLogin}
          size="lg"
          className="w-full  transition-all shadow hover:shadow-strong"
        >
          
          Login with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
