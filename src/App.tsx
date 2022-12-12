import styled from '@emotion/styled';
import TagsPage from './pages/Tags';
import { QueryClient, QueryClientProvider } from 'react-query';
import FirebaseContextProvider from './services/firebase/FirebaseContext';
const queryClient = new QueryClient();

const Root = styled.main({
  backgroundColor: '#0093c4',
  fontFamily: "'Source Sans Pro', sans-serif;",
  minHeight: '100vh',
  fontWeight: 300
});

function App(): JSX.Element {
  return (
    <FirebaseContextProvider>
      <QueryClientProvider client={queryClient}>
        <Root>
          <TagsPage />
        </Root>
      </QueryClientProvider>
    </FirebaseContextProvider>
  );
}

export default App;
