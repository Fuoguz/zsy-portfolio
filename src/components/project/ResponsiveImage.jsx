export function ResponsiveImage({
  src,
  sources = [],
  alt,
  width,
  height,
  aspectRatio,
  sizes = "100vw",
  loading = "lazy",
  decoding = "async",
  zoom = false,
}) {
  const style = aspectRatio ? { aspectRatio } : undefined;
  return (
    <picture className="responsive-image" data-zoom-capable={zoom || undefined} style={style}>
      {sources.map((source) => (
        <source key={`${source.type}-${source.srcSet}`} type={source.type} srcSet={source.srcSet} sizes={source.sizes || sizes} />
      ))}
      <img src={src} alt={alt} width={width} height={height} sizes={sizes} loading={loading} decoding={decoding} />
    </picture>
  );
}

