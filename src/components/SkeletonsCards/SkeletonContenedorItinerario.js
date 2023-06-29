import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  <article className='card m-3' style={{ padding: '0px' }}>
    <div className='card-body'>
      <Skeleton height={500} width={940} />
    </div>
  </article>
);

export const SkeletonContenedorItinerario = () => (
  <SkeletonTheme baseColor='#c4c9d3' highlightColor='#a8acb8'>
    <SkeletonCard />
  </SkeletonTheme>
);
