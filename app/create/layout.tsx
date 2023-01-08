import { Provider } from './context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
