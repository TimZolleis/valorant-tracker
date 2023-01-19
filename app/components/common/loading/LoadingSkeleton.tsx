import classNames from 'classnames';

export const LoadingSkeleton = ({ width, height }: { width: string; height: string }) => {
    const className = classNames(width, height, 'bg-neutral-600/20', 'animate-pulse', 'rounded-lg');
    return <div className={className}></div>;
};
