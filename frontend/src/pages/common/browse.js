import { BrowseContainer } from '../../containers';
import { BookContextProvider } from '../../store/contexts/bookContext';

export default function Browse() {
  return (
    <BookContextProvider>
      <BrowseContainer />
    </BookContextProvider>
  );
}
