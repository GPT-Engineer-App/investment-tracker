import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioValue } from "@/services/finance";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Index = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["portfolioValue"],
    queryFn: fetchPortfolioValue,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <Alert>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Error loading portfolio value</AlertDescription>
    </Alert>
  );

  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to InvestTrack</h1>
      <p>Your portfolio overview:</p>
      <div className="mt-4">
        <p>Total Value: ${data.totalValue}</p>
        <p>Number of Assets: {data.numberOfAssets}</p>
      </div>
    </div>
  );
};

export default Index;