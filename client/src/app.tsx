import Container from '@mui/material/Container';
import {Poll} from './components/poll/poll';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient()

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <Poll pollID="11" />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
