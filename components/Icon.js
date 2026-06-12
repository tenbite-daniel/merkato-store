export function Icon({ name, className, filled }) {
  return (
    <span
      className={['material-symbols-outlined select-none', className].filter(Boolean).join(' ')}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}
