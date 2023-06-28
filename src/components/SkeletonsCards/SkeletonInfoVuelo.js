import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  <article className='card m-3' style={{ padding: '0px' }}>
    <div className='card-body'>
      <Skeleton height={260} width={778} />
    </div>
  </article>
);

export const SkeletonInfoVuelo = () => (
  <SkeletonTheme baseColor='#c4c9d3' highlightColor='#a8acb8'>
    <SkeletonCard />
  </SkeletonTheme>
);
