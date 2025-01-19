import { Error } from "@/pages/error";
import { TaxForm } from "@/pages/tax-form";
import type { ErrorInfo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "@/components/chakra/provider";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const logError = (error: Error, info: ErrorInfo) => {
    // This would be a call to our logging service, but making it a console.error for sake of simplicty
    console.error(error, info);
  };

  return (
    <Provider>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            onError={logError}
            FallbackComponent={Error}
          >
            <QueryClientProvider client={queryClient}>
              <TaxForm />
            </QueryClientProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Provider>
  );
}
export default App;
