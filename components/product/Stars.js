import { Icon } from '@/components/Icon';

export default function Stars({ value, count, large }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const diff = value - (i - 1);
        const filled = diff >= 1;
        const half = !filled && diff >= 0.25;
        const size = large ? '!text-[20px]' : '!text-[15px]';
        return (
          <span key={i} className={`relative inline-flex ${size} text-gold leading-none`}>
            <Icon name="star" filled={false} className={`${size} text-gold`} />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                <Icon name="star" filled className={`${size} text-gold`} />
              </span>
            )}
          </span>
        );
      })}
      <span className={`ml-1 font-semibold ${large ? 'text-base' : 'text-xs'} text-muted-foreground`}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={`${large ? 'text-sm' : 'text-xs'} text-muted-foreground`}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
