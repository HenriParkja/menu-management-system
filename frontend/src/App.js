import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import MenuList from './pages/MenuList';

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <div className="App">
            <MenuList />
          </div>
        </RecoilRoot>
      </QueryClientProvider>
  );
}

export default App;
