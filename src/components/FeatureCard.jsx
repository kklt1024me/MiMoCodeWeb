export function FeatureCard({ feature, t }) {
  const image = (
    <div className="card__painting">
      <img alt="" src={feature.image} />
    </div>
  );
  const text = (
    <div className="card__text">
      <h3>{t[feature.titleKey]}</h3>
      <p>{t[feature.bodyKey]}</p>
    </div>
  );

  return (
    <article className={`card card--${feature.id}`}>
      {feature.imageFirst ? image : text}
      {feature.imageFirst ? text : image}
    </article>
  );
}
