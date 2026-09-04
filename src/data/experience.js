import { CONTENT_STATUS, VISIBILITY } from "../content/schema.js";

export const experience = Object.freeze([
  {
    id: "transsion-talent-ops",
    publicLabel: "TRANSSION",
    internalLabel: "传音控股 / TEX AI / 传音学院",
    role: "项目与人才运营",
    start: "2026.06",
    end: "Present",
    visibility: VISIBILITY.PUBLIC,
    contentStatus: CONTENT_STATUS.PARTIAL,
    internalNotes: "TEX AI / 传音学院公开组织层级 wording 仍需用户确认。",
  },
  {
    id: "unicareer-content-ops",
    publicLabel: "UNICAREER",
    internalLabel: "UNICAREER",
    role: "内容运营",
    start: "2024.07",
    end: "2026.07",
    visibility: VISIBILITY.PUBLIC,
    contentStatus: CONTENT_STATUS.READY,
    internalNotes: null,
  },
  {
    id: "xintong-social-ops",
    publicLabel: "新通教育",
    internalLabel: "新通教育",
    role: "新媒体运营",
    start: "2025.12",
    end: "2026.03",
    visibility: VISIBILITY.PUBLIC,
    contentStatus: CONTENT_STATUS.PARTIAL,
    internalNotes: "旧量化转化口径未验证，不进入公开摘要。",
  },
]);

