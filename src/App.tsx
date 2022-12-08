import styled from '@emotion/styled';
import TagsPage from './pages/Tags';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const Root = styled.main({
  backgroundColor: '#0093c4',
  fontFamily: "'Source Sans Pro', sans-serif;",
  minHeight: '100vh',
  fontWeight: 300
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Root>
        <TagsPage />
      </Root>
    </QueryClientProvider>
  );
}

export default App;
