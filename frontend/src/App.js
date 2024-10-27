import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import MenuListPage from './pages/MenuListPage';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="App">
            <MenuListPage />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
  );
}

export default App;
