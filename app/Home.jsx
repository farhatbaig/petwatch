import PetList from './PetList.jsx';
import { useDarkMode } from './_layout';

export default function Home() {
  const { isDark } = useDarkMode();
  return <PetList isDark={isDark} />;
} 