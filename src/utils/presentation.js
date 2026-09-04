const PROJECT_TITLES_ZH = Object.freeze({
  eaglehub: "企业人才培养管理平台",
  "onboarding-automation": "新人入职流程自动化",
  "ai-content-growth-workflow": "AI 内容增长工作流",
  "team-formation-platform": "自由组队平台",
  "eagle-training": "雏鹰专项集训",
  "memory-museum": "记忆博物馆",
  "video-motion": "影像与动态视觉练习",
  "game-ads-simulation": "游戏广告脚本模拟",
});

export function projectTitleZh(project) {
  return PROJECT_TITLES_ZH[project.slug] || project.title || project.shortTitle;
}

export function projectTitleEn(project) {
  return project.englishTitle || project.shortTitle || project.title;
}
