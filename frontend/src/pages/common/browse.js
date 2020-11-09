import { BrowseContainer } from '../../containers';
import { BookContextProvider } from '../../store/contexts';

export default function Browse() {
  return (
    <BookContextProvider>
      <BrowseContainer />
    </BookContextProvider>
  );
}
