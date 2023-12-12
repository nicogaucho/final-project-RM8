import { useLoaderData } from 'react-router-dom';
import Genres from './Genres';

export default function AppSideBar() {
  const { genres } = useLoaderData();

  return (
    <div
      style={{
        width: '16vw',
      }}
    >
      <Genres genres={genres} />
    </div>
  );
}
