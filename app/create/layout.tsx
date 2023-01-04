import { CollectionProvider } from './context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CollectionProvider>{children}</CollectionProvider>;
}
