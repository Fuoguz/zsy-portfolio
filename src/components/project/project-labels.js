const publicLabels = {
  REAL_PROJECT: "真实项目",
  REAL_BUSINESS_WORK: "真实业务",
  INTERNAL_PRODUCT: "内部产品",
  INTERNAL_AUTOMATION: "内部自动化",
  INTERNAL_TOOL: "内部工具",
  EXPERIMENT: "实验",
  SIMULATION: "模拟",
  CREATIVE_WORK: "创意作品",
};

const deliveryLabels = {
  ACTIVE: "进行中",
  SHIPPED: "已交付 / 使用中",
  VALIDATED_PROTOTYPE: "已验证原型 / Dry-run",
  PROTOTYPE: "原型",
  EXPERIMENT: "实验",
  SIMULATION: "模拟",
  ARCHIVED: "已归档",
};

export const formatProjectClassification = (values) => values
  .map((value) => publicLabels[value])
  .filter(Boolean)
  .join(" · ");

export const formatDeliveryStatus = (value) => deliveryLabels[value] || value?.replaceAll("_", " ") || "";
