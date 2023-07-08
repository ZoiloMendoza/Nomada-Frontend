import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (
  
      <Skeleton height={250} />
  
);

export const SkeletonMisViajes = () => (
  <SkeletonTheme baseColor='#fff' highlightColor='#f2f2f2'>
    <SkeletonCard />
  </SkeletonTheme>
);
