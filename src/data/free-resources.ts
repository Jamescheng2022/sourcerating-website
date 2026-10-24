export type Resource = { id:string; category:string; title:string; chinese:string; publisher:string; stage:string; summary:string; url:string; rights:string };
export const sourceReviewDate = "2026-10-24";
export const categories = ["Supplier checks","CBAM / steel","Tariffs & origin","Shipping documents","Restricted-party checks"];
export const officialResources: Resource[] = [
  {
    "id": "SR-01",
    "category": "Supplier checks",
    "title": "SourceRating Engineering Supplier Verification Playbook",
    "chinese": "中国工程供应商审核手册",
    "publisher": "SourceRating",
    "stage": "Before deposit",
    "summary": "首次审查供应商主体、质量体系、生产及出货证据。",
    "url": "https://www.sourcerating.com/playbook",
    "rights": "Self-owned, direct site link"
  },
  {
    "id": "CB-01",
    "category": "CBAM / steel",
    "title": "EU CBAM Installation Communication Template (XLSX)",
    "chinese": "欧盟CBAM设施数据沟通模板（Excel）",
    "publisher": "European Commission",
    "stage": "Before quote / emissions data",
    "summary": "要求钢厂准备装置级排放沟通信息，避免把缺失字段当作零。",
    "url": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
    "rights": "Source link only; do not mirror individual files without rights review"
  },
  {
    "id": "CB-02",
    "category": "CBAM / steel",
    "title": "EU CBAM Sector-Filled Examples ZIP",
    "chinese": "欧盟CBAM分行业填表示例ZIP",
    "publisher": "European Commission",
    "stage": "Before data exchange",
    "summary": "用官方填写示例理解钢铁等行业的表格结构；不要将示例当作实际申报。",
    "url": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-communication-and-news_en",
    "rights": "Source link only"
  },
  {
    "id": "CB-03",
    "category": "CBAM / steel",
    "title": "CBAM Non-EU Operator Guidance: Iron and Steel (5d)",
    "chinese": "CBAM非欧盟钢铁生产商指南5d",
    "publisher": "European Commission",
    "stage": "Supplier technical review",
    "summary": "弄清钢铁产品在CBAM下应讨论的工艺、边界与排放数据，避免凭供应商口头说明估算。",
    "url": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
    "rights": "Source link only; guidance dated Aug 2026 on source page"
  },
  {
    "id": "CB-04",
    "category": "CBAM / steel",
    "title": "CBAM Default Values and Benchmarks (2026)",
    "chinese": "2026年CBAM默认值及基准值参考数据",
    "publisher": "European Commission",
    "stage": "Cost model review",
    "summary": "官方明确Excel仅供信息参考；法律效力以实施条例为准，且需留意修订。",
    "url": "https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/cbam-legislation-and-guidance_en",
    "rights": "Source link only; not a substitute for legal text"
  },
  {
    "id": "TR-01",
    "category": "Tariffs & origin",
    "title": "EU Access2Markets / My Trade Assistant",
    "chinese": "欧盟进口税费及原产地辅助查询工具",
    "publisher": "European Commission",
    "stage": "Before landed-cost estimate",
    "summary": "按产品/出口国/进口国定位税费、原产地规则与手续；第三国数据可能有禁止转售条款。",
    "url": "https://trade.ec.europa.eu/access-to-markets/en/my-trade-assistant",
    "rights": "Link only; no export or reuse of underlying database"
  },
  {
    "id": "TR-02",
    "category": "Tariffs & origin",
    "title": "EU TARIC Customs Tariff Database",
    "chinese": "欧盟TARIC关税措施数据库",
    "publisher": "European Commission",
    "stage": "Import compliance",
    "summary": "检查反倾销、配额、许可和进口限制；注意不包含成员国增值税等全部税费。",
    "url": "https://taxation-customs.ec.europa.eu/online-services/online-services-and-databases-customs/eu-customs-tariff-taric_en",
    "rights": "Link only"
  },
  {
    "id": "TR-03",
    "category": "Tariffs & origin",
    "title": "USITC Harmonized Tariff Schedule (HTS)",
    "chinese": "美国HTS税则及历史版本",
    "publisher": "USITC",
    "stage": "Import cost review",
    "summary": "当前版本和历史版本均有入口，分类应按美国系统核对，不照搬中国出口编码。",
    "url": "https://www.usitc.gov/harmonized_tariff_information",
    "rights": "Link only; use official current revision"
  },
  {
    "id": "TR-04",
    "category": "Tariffs & origin",
    "title": "UK Trade Tariff Lookup",
    "chinese": "英国商品编码、关税及增值税查询",
    "publisher": "UK Government",
    "stage": "Import cost review",
    "summary": "先收集材质、功能、生产方法与包装信息，再查英国税号和进口措施。",
    "url": "https://www.gov.uk/trade-tariff",
    "rights": "Link only"
  },
  {
    "id": "DO-01",
    "category": "Shipping documents",
    "title": "Common Export Documents Guide",
    "chinese": "商业发票、装箱单、提单等常用外贸单证指南",
    "publisher": "US International Trade Administration",
    "stage": "Before shipment",
    "summary": "对照商业发票、装箱单、运输单据的数据一致性；美出口细则不能直接套用中国出口。",
    "url": "https://www.trade.gov/common-export-documents",
    "rights": "Link only; country-specific applicability"
  },
  {
    "id": "DO-02",
    "category": "Shipping documents",
    "title": "U.S. ISPM 15 Wood Packaging Import Guidance",
    "chinese": "美国木质包装ISPM 15入境规定",
    "publisher": "USDA APHIS",
    "stage": "Packaging design & inspection",
    "summary": "木箱、垫木、托盘与ISPM15标识要与实际包装方案和进口要求对应。",
    "url": "https://www.aphis.usda.gov/plant-imports/wood-packaging-material/import",
    "rights": "Link only"
  },
  {
    "id": "DO-03",
    "category": "Shipping documents",
    "title": "ICC Free Incoterms® 2020 Checklist & Flowcharts",
    "chinese": "ICC免费贸易术语选择流程图",
    "publisher": "International Chamber of Commerce",
    "stage": "RFQ and contract terms",
    "summary": "按指定地点明确交付责任和费用风险；ICC内容有版权，不能自行翻译规则或打包转售。",
    "url": "https://2go.iccwbo.org/incoterms-2020-checklist-flowcharts-choosing-the-right-incotermsr-rule.html",
    "rights": "Link only; ICC is not affiliated with SourceRating"
  },
  {
    "id": "CO-01",
    "category": "Restricted-party checks",
    "title": "U.S. Consolidated Screening List (CSL)",
    "chinese": "美国贸易限制主体综合查询",
    "publisher": "US International Trade Administration",
    "stage": "Counterparty check",
    "summary": "用于美国出口相关受限主体初筛；疑似匹配需进一步核实，不能当作全司法辖区合规证明。",
    "url": "https://www.trade.gov/consolidated-screening-list",
    "rights": "Link only; not a global sanctions clearance"
  },
  {
    "id": "TR-05",
    "category": "Tariffs & origin",
    "title": "Why Supplier HS Code May Not Match U.S. HTS",
    "chinese": "为什么供应商出口HS编码不能直接用于美国进口",
    "publisher": "USITC",
    "stage": "Before customs classification",
    "summary": "官方解释六位国际统一和国家附加编码的区别，帮助买卖双方减少成本估算误差。",
    "url": "https://www.usitc.gov/faq/question/my_foreign_suppliershipper_china_gave_me_code_code.htm",
    "rights": "Link only"
  }
];
