import Loader from "@/components/ui/Loader";
import api from "@/utils/api";
import { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/users/current-user");

        setAuthenticated(true);
      } catch (err: any) {
        toast.error(err.customMessage, {
          description: "Please login first !",
        });
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen text-xl flex items-center justify-center">
        <Loader color={"black"} />
      </div>
    );
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
