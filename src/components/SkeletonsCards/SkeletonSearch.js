import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonCard = () => (

   
      <Skeleton height={180} width={270} />

);

export const SkeletonSearch = () => (
  <SkeletonTheme baseColor='#c4c9d3' highlightColor='#a8acb8'>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </SkeletonTheme>
);
