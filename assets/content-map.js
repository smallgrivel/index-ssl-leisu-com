// assets/content-map.js
// Content mapping and search utility for site sections

const siteConfig = {
  baseUrl: "https://index-ssl-leisu.com",
  siteName: "Leisu Content Hub",
  defaultLang: "zh-CN",
  version: "2.1.0"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    keywords: ["雷速", "首页", "导航", "精选"],
    description: "站点主入口与内容概览"
  },
  {
    id: "news",
    title: "新闻中心",
    keywords: ["雷速", "资讯", "报道", "动态", "更新"],
    description: "最新新闻与公告"
  },
  {
    id: "products",
    title: "产品展示",
    keywords: ["雷速", "产品", "服务", "解决方案", "工具"],
    description: "核心产品与服务目录"
  },
  {
    id: "about",
    title: "关于我们",
    keywords: ["雷速", "公司", "团队", "使命", "价值观"],
    description: "公司介绍与文化"
  },
  {
    id: "contact",
    title: "联系方式",
    keywords: ["雷速", "联系", "咨询", "合作", "客服"],
    description: "客户支持与合作渠道"
  }
];

const tagLibrary = [
  { name: "雷速", related: ["快速", "稳定", "高效"] },
  { name: "技术", related: ["前端", "后端", "API", "框架"] },
  { name: "资源", related: ["文档", "下载", "示例", "教程"] },
  { name: "社区", related: ["论坛", "问答", "分享", "活动"] }
];

function searchSections(query) {
  if (!query || query.trim() === "") {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentSections) {
    let score = 0;

    if (section.title.toLowerCase().includes(lowerQuery)) {
      score += 3;
    }

    for (const kw of section.keywords) {
      if (kw.toLowerCase().includes(lowerQuery)) {
        score += 2;
      }
    }

    if (section.description.toLowerCase().includes(lowerQuery)) {
      score += 1;
    }

    if (score > 0) {
      results.push({
        section: section.id,
        title: section.title,
        relevance: score,
        url: siteConfig.baseUrl + "/" + section.id
      });
    }
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function getSectionByKeyword(keyword) {
  const kw = keyword.toLowerCase();
  for (const section of contentSections) {
    for (const sk of section.keywords) {
      if (sk.toLowerCase() === kw) {
        return section;
      }
    }
  }
  return null;
}

function getAllKeywords() {
  const keywordSet = new Set();
  for (const section of contentSections) {
    for (const kw of section.keywords) {
      keywordSet.add(kw);
    }
  }
  return Array.from(keywordSet);
}

function expandTags(baseTags) {
  const expanded = [];
  for (const tag of tagLibrary) {
    if (baseTags.includes(tag.name)) {
      expanded.push(tag.name, ...tag.related);
    }
  }
  return [...new Set(expanded)];
}

export {
  siteConfig,
  contentSections,
  tagLibrary,
  searchSections,
  getSectionByKeyword,
  getAllKeywords,
  expandTags
};