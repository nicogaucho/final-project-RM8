import { useLoaderData } from 'react-router-dom';
import Genres from './Genres';
import Platforms from './Platforms';

export default function AppSideBar() {
  const { genres, platforms } = useLoaderData();

  return (
    <div>
      <Genres genres={genres} />
      <Platforms platforms={platforms} />
    </div>
  );
}
