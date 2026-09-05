import portfolioSignalMap from "../../assets/portfolio-signal-map.webp";

const COPY = Object.freeze({
  home: {
    label: "工作信号图",
    note: "从复杂输入到可验证输出",
    alt: "由连线、节点、半圆仪表与结果面板构成的工作信号图",
  },
  work: {
    label: "项目阅读路径",
    note: "工作、证据与结果之间的关系",
    alt: "用于项目索引的工作信号图局部",
  },
  about: {
    label: "我的工作方法",
    note: "观察、判断、协作、交付",
    alt: "用于说明工作方法的工作信号图局部",
  },
});

export function PortfolioSignalVisual({ variant = "home", priority = false }) {
  const copy = COPY[variant] || COPY.home;
  return (
    <figure className="portfolio-signal-visual" data-variant={variant}>
      <div className="portfolio-signal-visual__frame">
        <img
          src={portfolioSignalMap}
          alt={copy.alt}
          width="1448"
          height="1086"
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <figcaption><span>{copy.note}</span><small>工作方法意象 · 非项目证据</small></figcaption>
    </figure>
  );
}
