type ViewHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ViewHeader({ eyebrow, title, description }: ViewHeaderProps) {
  return (
    <header className="view-header">
      <span className="section-title__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
