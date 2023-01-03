import { CreateProvider } from './context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CreateProvider>{children}</CreateProvider>;
}
