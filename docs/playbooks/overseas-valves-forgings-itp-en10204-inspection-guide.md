# 海外特种管阀与承压铸锻件出厂监造 (ITP) 及 EN 10204 3.2 真实材质单核验防骗指南
## Field Protocol: Manufacturing ITP, EN 10204 3.2 Witnessing & Counter-Fraud Inspection for Overseas Critical Valves, Castings and Forgings

> **版本**：2026-11-19 | **配套网站文章**：[`/blog/overseas-valves-forgings-itp-en10204-inspection-guide`](https://www.sourcerating.com/blog/overseas-valves-forgings-itp-en10204-inspection-guide) | **适用品类**：API 600 / API 6D / ASME B16.34 承压阀门；ASTM A216 / A352 铸件；ASTM A105 / A350 / A182 锻件（含双相钢 F51/F53）
>
> **使用边界**：本规程是采购方工程化执行模板，不替代合同适用标准的现行版本、公告机构 (Notified Body) 意见或律师审阅。所有试验时长、温度、验收值以采购订单写明的标准版本为准。

---

## 目录
1. [为什么 3.2 也会“失效”：Bradken 案的教训](#1-为什么-32-也会失效bradken-案的教训)
2. [EN 10204 四类文件的法律与实操差异](#2-en-10204-四类文件的法律与实操差异)
3. [PED 2014/68/EU 何时“强制”要求 3.2](#3-ped-201468eu-何时强制要求-32)
4. [手持 XRF 看不见的材质调包](#4-手持-xrf-看不见的材质调包)
5. [ITP 设计：H / W / R / M 的真实义务](#5-itp-设计h--w--r--m-的真实义务)
6. [阀门与铸锻件标准 ITP 模板（中英双语）](#6-阀门与铸锻件标准-itp-模板中英双语)
7. [3.2 见证人员必须亲手控制的六个环节](#7-32-见证人员必须亲手控制的六个环节)
8. [第三方检验机构签字真伪核验（LR / TÜV / DNV / BV）](#8-第三方检验机构签字真伪核验lr--tüv--dnv--bv)
9. [现场 PMI、硬度、铁素体与金相复型实操](#9-现场-pmi硬度铁素体与金相复型实操)
10. [合同防坑条款（中英对照）](#10-合同防坑条款中英对照)
11. [出货放行 Checklist 与 3.2 证书核验登记表](#11-出货放行-checklist-与-32-证书核验登记表)

---

## 1. 为什么 3.2 也会“失效”：Bradken 案的教训

2022 年 2 月，美国华盛顿西区联邦检察官办公室公布：Bradken 塔科马铸造厂前冶金实验室主任因在 1985–2017 年间篡改供美国海军潜艇用钢铸件的强度与韧性试验结果（涉及 240 余批次），被判处 30 个月监禁（[DOJ 公告](https://www.justice.gov/usao-wdwa/pr/former-lab-director-sentenced-prison-falsifying-results-steel-testing-parts-navy-subs)）。

关键事实：
- 工厂是真工厂，证书是真证书，签字人是工厂授权的检验负责人——**这正是 EN 10204 3.1 的签字结构**；
- 造假被发现，靠的是实验室员工发现**试验卡片被改**，而不是客户审阅证书。

**结论**：3.2 的价值不在“多一个签名”，而在第二个签名者**是否物理控制了试样身份链**。若 TPI 只是事后在会议室核对工厂打印件，本质上仍是“贴了更贵抬头的 3.1”。

---

## 2. EN 10204 四类文件的法律与实操差异

| 类型 | 试验基础 | 签认方 | 对买方的证明力 |
| :--- | :--- | :--- | :--- |
| **2.1** 符合性声明 | 无试验数据 | 制造商 | 仅为制造商声称符合 |
| **2.2** 试验报告 | 非特定检验（同类产品数据，不一定是你的批次） | 制造商 | 典型能力，非交付炉号 |
| **3.1** 检验证书 | 针对交付产品/试验单元的特定检验 | 制造商授权、独立于生产部门的检验代表 | 你的炉号/批次结果，由制造商担保 |
| **3.2** 检验证书 | 针对交付产品/试验单元的特定检验 | 制造商检验代表 **+** 买方授权代表或法规指定检验员 | 你的炉号/批次结果，且第二方应控制试样身份并见证试验 |

**两条实操要点**：
1. **EN 10204 是金属材料文件标准，不是阀门总成标准。** 采购单写“阀门带 3.2 证书”等于什么都没写。必须写明：*阀体、阀盖、启闭件材料 3.2（炉号化学成分、拉伸、冲击、硬度）+ 同一检验机构签署的整阀压力试验见证报告*。
2. **3.2 不会升级材料牌号。** A105 的 3.2 依然是无冲击要求的锻钢；完全可能拿到一份“见证无懈可击、牌号却是错的”证书。

---

## 3. PED 2014/68/EU 何时“强制”要求 3.2

- [PED 2014/68/EU](https://eur-lex.europa.eu/eli/dir/2014/68/oj) 附件 I 第 4.3 条：II、III、IV 类设备的**主要承压部件**材料须附“特定产品控制证书”。
- 一般实践：若材料制造商持有由欧盟境内主管机构针对材料专项评估认证的质量体系，**3.1 可接受**；否则通常需要由公告机构 / 认可第三方组织 (RTPO) 等签认的 **3.2**。
- 核验动作：证书上的四位公告机构编号，到欧盟 NANDO 数据库（入口见[欧盟委员会 PED 页面](https://single-market-economy.ec.europa.eu/sectors/pressure-equipment-and-gas-appliances/pressure-equipment-sector/pressure-equipment-directive_en)）核对：**编号 ↔ 机构名称 ↔ 指令 ↔ 模块** 是否一致。
- 询问供应商的正确方式不是“你能做 PED 吗？”，而是：**哪家钢厂/锻厂、哪张认证证书、哪家公告机构签发、覆盖哪种产品形态？**

---

## 4. 手持 XRF 看不见的材质调包

| 调包风险 | 手持 XRF 能否识别 | 真正有效的识别手段 |
| :--- | :--- | :--- |
| F51/F53 双相钢 ↔ 316 | **能**（Cr/Ni/Mo 比例差异明显） | 所有承压件 XRF + 双相钢铁素体测量 |
| 316 冒充 316L | **不能**（XRF 测不了碳） | 带碳通道的火花直读光谱 (OES) 或见证取样化验 |
| **A105 冒充 A350 LF2** | **不能**（化学成分重叠） | 同炉号、同热处理炉次试块在规定温度下的**见证冲击试验** + 热处理曲线 |
| A216 WCB 冒充 A352 LCB/LCC | **不能** | 见证冲击试验 + 热处理记录 + 试块与铸件炉号追溯 |
| 双相钢牌号正确但热处理错误（σ 相析出） | **不能** | ASTM A923（注明方法 A/B/C）、铁素体计数、金相复型 |
| 酸性环境碳钢硬度超标 | **不能** | 按采购单写明的 NACE MR0175 / ISO 15156 限值做硬度普查 |

> **核心洞察**：低温钢（LF2 Class 1、LCB、LCC 冲击温度 −46 °C）的“牌号”本质上就是**韧性证明**。任何仪器测得再准的化学成分，都证明不了韧性。没有独立见证的冲击试验 = 没有独立验证的牌号。

---

## 5. ITP 设计：H / W / R / M 的真实义务

| 代码 | 中文 | 义务 | 设置原则 |
| :--- | :--- | :--- | :--- |
| **H** Hold Point | 停工待检点 | 检验员未到场或未书面放行，**生产不得越过** | 只设在“下一步会销毁或掩盖证据”的工序前 |
| **W** Witness Point | 见证点 | 须按约定提前通知；通知到位而检验员未到，可继续 | 通知期必须现实（异地 1,500 km 只给 24 h = 实际变成 R） |
| **R** Review | 文件审查 | 事后审查记录 | 适用于不依赖见证即客观存在的记录（如校准过的炉温曲线） |
| **M/S** Monitor / Surveillance | 巡检 | 不预约随机抽查 | 适用于两个 H 点之间的过程控制（如铸件补焊） |

**设计口诀**：*“证据不可逆处设 H”*——试块切离前的钢印移植、涂漆前的压力试验必须是 H；尺寸可在成品上复测，通常不必设 H。

---

## 6. 阀门与铸锻件标准 ITP 模板（中英双语）

| # | 工序 Activity | 依据/验收 Reference & Acceptance | 记录 Record | 制造商 | 3.2 检验员 | 买方 |
| :-- | :--- | :--- | :--- | :-: | :-: | :-: |
| 1 | 检验前会议 Pre-inspection meeting（ITP、牌号、热处理与 NDT 程序、通知期） | PO、数据表、ITP 版本 | 会议纪要 | H | H | H |
| 2 | 原材料入厂炉号核对 Raw material heat-number check | A182/A350/A105/A216/A352 | 入库台账、炉号分布图 | R | R | R |
| 3 | **试块选取与钢印移植** Coupon selection & hard-stamp transfer（锻件延长段/单独锻制试块/铸造基尔试块） | A961（锻件）、A703/A781（铸件） | 钢印记录 + 照片 | **H** | **H** | R |
| 4 | 试块与零件同炉热处理 Heat treatment with coupons in same load | 热处理工艺、校准热电偶 | 炉温曲线 + 装炉清单 | R | W(首炉)/R | R |
| 5 | 拉伸、冲击、硬度 Tensile / impact / hardness | 产品标准；冲击温度；ISO 6892-1 / ASTM A370 | 检验员会签试验报告 | H | **W** | R |
| 6 | 熔炼分析与成品复验 Heat & product analysis | 产品标准；碳用 OES | 化学分析报告 | R | R / W(复验) | R |
| 7 | 铸件 NDT：目视 MSS SP-55、MT/PT、RT（如 ASME B16.34 Special Class） | NDT 程序、人员资格、参考底片 | NDT 报告、底片 | R | W(评片) | R |
| 8 | 锻件 UT Forging UT | ASTM A388 或规定程序 | UT 报告 | R | W | R |
| 9 | **铸件重大补焊** Major weld repair | 材料标准补焊限值、合格 WPS | 补焊位置图、补焊后 NDT 与热处理 | **H** | **H** | R |
| 10 | 机加工承压件与内件 PMI | PO 牌号表；标样校验 | 按序列号 PMI 记录 | R | W | R |
| 11 | 尺寸与标识 Dimensional & marking（MSS SP-25、ASME B16.10） | GA 图 | 尺寸报告 | R | R | R |
| 12 | **壳体、上密封、密封试验** Shell / backseat / closure tests | API 598 或 API 6D（**PO 注明版本**）；介质与时长按标准 | 压力试验报告 + 压力表校准编号 | **H** | **H** | W |
| 13 | 逸散性/低温试验（如规定） Fugitive emission / cryogenic | ISO 15848-1 / 规定程序 | 试验报告 | R | W | W |
| 14 | 涂装与防护 Coating & preservation | 涂装体系、DFT、端口保护 | 涂装报告 | R | R | R |
| 15 | **最终资料包与放行单** Final dossier & IRN | 证书按序列号映射 | 检验放行单 | **H** | **H** | R |

> **压力试验时长**：不要自己写数字，**引用标准及版本**。API 598 / API 6D 按口径与试验类型规定最短保压时间，且各版本有过变化。要求每台阀门报告注明所用压力表编号；“一块表一个下午测了 40 台”值得追问。

---

## 7. 3.2 见证人员必须亲手控制的六个环节

1. **来源身份**：确认锻件/铸件炉号，试料为本体延长段，或符合标准允许的同炉单独锻制试块/基尔试块。
2. **切离前钢印移植**：检验员用**本人可追溯编号**的钢印同时打在试块与产品上，再切离。照片须在同一画面中出现：钢印 + 炉号 + 产品序列号。
3. **热处理关联**：带钢印试块与其代表的产品同炉装载；检验员见证装炉或审查列明试块的装炉清单 + 炉温曲线。
4. **试样制备**：钢印再次移植到加工好的拉伸/冲击试样上，或见证机加工。试验当天端出一盒“无标识冲击试样”≠ 3.2 证据。
5. **试验本身**：冲击——核对冷却槽温度与保温时间、清点 3 支试样、亲自读取冲击功；拉伸——核查试验机校准状态（ISO 7500-1 / ASTM E4）、引伸计或标距。
6. **本人记录**：检验员当场在自己的记录中写下结果；证书签字引用其机构可调取的**报告号/工单号**。机构事后查不到工单号，签字背后就是空的。

**最便宜的防伪动作——日期合理性**：同一检验员同一天在相距数百公里的多家工厂签了多个炉号？出货前（不是出货后）给检验机构打电话。

---

## 8. 第三方检验机构签字真伪核验（LR / TÜV / DNV / BV）

**总原则：永远不要用可疑证书上印的联系方式去核验。**

| 机构 | 核验路径 | 注意事项 |
| :--- | :--- | :--- |
| **DNV** | [公开证书查询](https://certificatechecker.dnv.com/)；原生 PDF [数字签名验证](https://www.dnv.com/supplychain/general/validating-digital-signatures/) | 扫描件没有可验证的签名，必须索要原生签名 PDF |
| **Bureau Veritas** | 按业务线/国家不同；例如英国 BV 通过条码或发至签发办公室[核验真伪](https://bureauveritas.co.uk/needs/check-authenticity-certificates) | 通过 BV 官网独立查找签发办公室联系方式 |
| **Lloyd's Register / LRQA** | 分别向各自实体核验 | 2021 年起 LR 已出售其认证业务 LRQA，两者为不同公司；先看清证书上是哪个实体 |
| **TÜV** | 核实完整法人实体、地址；PED 项目查 NANDO 编号 | TÜV SÜD、TÜV Rheinland、TÜV NORD、TÜV AUSTRIA 是相互独立的集团，另有名称近似的无关公司 |
| **任何机构** | 向独立查得的区域办公室发邮件附证书，要求确认：**工单号、检验员姓名、钢印号、到场日期** | 回复存入订单档案 |

**证书本身的红旗信号**：
- 证书编号格式与该机构其他真实证书不符；
- 钢印图像在多份证书上像素级一致（角度、墨色完全相同）；
- 试验日期早于检验预约日期；
- 不同炉号的试验结果精确到末位完全相同；
- 证书炉号与产品钢印炉号不一致；
- 出具 3.2 的“检验公司”与卖方贸易公司**同地址或同股东**（用工商登记穿透核查）。

---

## 9. 现场 PMI、硬度、铁素体与金相复型实操

| 方法 | 操作要点 | 常见翻车点 |
| :--- | :--- | :--- |
| **手持 XRF** | 每班开始与结束用相近合金的有证标样校验并记录；打磨至光亮金属，去除油漆、氧化皮、镀层；每个位置 ≥2 次读数；记录序列号、位置、**全元素读数**（不只是“牌号匹配”标签） | 测在镀锌/镀镍层上；只截图牌号匹配结果 |
| **火花 OES** | 碳决定牌号时使用（L 级不锈钢、碳当量限值、低温碳钢碳上限）；事先约定烧点位置 | 在密封面或成品外观面留下烧痕引发争议 |
| **便携硬度** | 里氏 (ASTM A956)、UCI (ASTM A1038) 对表面粗糙度、质量、壁厚敏感，换算为 HB/HRC 只是近似 | 用里氏换算值直接判定 NACE 22 HRC 限值——须在 PO 中写明方法与换算或见证台式试验 |
| **铁素体** | Ferritescope 快速筛查；PO 写明验收范围以及是否以 ASTM E562 点计数为准 | 只测一个点就下结论 |
| **σ 相/金属间相** | ASTM A923，**须写明方法 A、B 或 C**（回答的问题不同） | 只写“按 A923”而不指定方法 |
| **金相复型** | 按 ASTM E1351 在实物上取复型，可显示 σ 相、碳化物网、未正火组织，无需破坏取样 | 抛光/腐蚀不当导致无法判读 |

---

## 10. 合同防坑条款（中英对照）

> 以下为起草起点，须由律师按合同适用法律调整。

1. **材料替代 Material substitution**
   - EN: No material grade, product form or source mill other than those listed in Appendix A may be used without the Buyer's prior written approval. Approval of a substitute does not relieve the Seller of any requirement of the original specification.
   - 中：未经买方事先书面批准，不得使用附件 A 所列以外的材料牌号、产品形态或来源钢厂。替代批准不免除卖方对原规格任何要求的责任。
2. **检验员指定 Inspector designation**
   - EN: EN 10204 type 3.2 certificates shall be validated by the inspection body named by the Buyer in Appendix B. Certificates validated by any other party will be treated as type 3.1.
   - 中：EN 10204 3.2 证书须由买方在附件 B 中指定的检验机构签认。由任何其他方签认的证书一律视为 3.1。
3. **通知期 Notification**
   - EN: The Seller shall give the Buyer and the inspection body not less than five working days' written notice of each hold and witness point. Work performed past a hold point without written release may be rejected at the Seller's cost.
   - 中：卖方须就每个停工待检点和见证点提前不少于五个工作日书面通知买方及检验机构。未经书面放行越过停工待检点的工作，买方可拒收，费用由卖方承担。
4. **试块留存 Coupon retention**
   - EN: Broken test specimens and coupon remnants bearing the inspector's stamp shall be retained for twelve months after delivery and made available for re-test on request.
   - 中：带检验员钢印的断裂试样及试块余料须在交货后保留十二个月，并按要求提供复验。
5. **复验与费用分担 Re-test and cost allocation**
   - EN: The Buyer may perform independent verification testing at any stage. If any result fails the specification, the Seller bears the cost of the verification test, replacement, re-inspection and associated freight.
   - 中：买方可在任何阶段进行独立验证试验。任何结果不符合规格时，验证试验、更换、复检及相关运费均由卖方承担。
6. **文件真实性 Document authenticity**
   - EN: Submission of any certificate that the issuing inspection body does not confirm as genuine is a material breach.
   - 中：提交任何未获签发检验机构确认为真实的证书，构成根本违约。

---

## 11. 出货放行 Checklist 与 3.2 证书核验登记表

### 11.1 出货放行 Checklist
- [ ] 每个承压件序列号 → 炉号 → 3.2 证书，且检验机构已**书面确认**工单号
- [ ] 低温牌号均有规定温度下的见证冲击试验，试块与零件同一炉次热处理
- [ ] 炉温曲线附有列明试块的装炉清单
- [ ] 钢印移植照片同框显示：检验员钢印 + 炉号 + 产品序列号
- [ ] 压力试验报告逐台注明：标准及版本、介质、压力、时长、压力表编号，检验员按 H 点签字
- [ ] PMI 记录覆盖全部承压件与内件（按序列号），含每班首末标样校验读数
- [ ] PED 货物：证书公告机构编号与 NANDO 一致，且覆盖相应模块与产品形态
- [ ] 无任何证书来自与卖方存在股权或地址关联的检验公司

### 11.2 3.2 证书核验登记表（模板）

| 证书编号 | 炉号 | 产品序列号 | 检验机构法人实体 | 检验员/钢印号 | 到场日期与地址 | 工单号 | 核验渠道（独立来源） | 机构回复日期 | 结论 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| | | | | | | | | | ☐ 真实 ☐ 存疑 ☐ 否认 |

---

### 参考资料
- U.S. Attorney's Office W.D. Washington — [Bradken 案判决公告](https://www.justice.gov/usao-wdwa/pr/former-lab-director-sentenced-prison-falsifying-results-steel-testing-parts-navy-subs)
- CEN — [EN 10204:2004](https://standards.iteh.ai/catalog/standards/cen/e944ea59-001d-4f76-bc3a-96947b19a169/en-10204-2004)
- EUR-Lex — [Directive 2014/68/EU](https://eur-lex.europa.eu/eli/dir/2014/68/oj)
- European Commission — [Pressure Equipment Directive / NANDO](https://single-market-economy.ec.europa.eu/sectors/pressure-equipment-and-gas-appliances/pressure-equipment-sector/pressure-equipment-directive_en)
- DNV — [Certificate checker](https://certificatechecker.dnv.com/)、[Digital signature validation](https://www.dnv.com/supplychain/general/validating-digital-signatures/)
- Bureau Veritas UK — [Check the authenticity of certificates](https://bureauveritas.co.uk/needs/check-authenticity-certificates)
- API — [Standards](https://www.api.org/products-and-services/standards)（API 598 / 600 / 6D，采用前确认现行版本）
- ASTM A105、A182、A216、A350、A352、A370、A388、A923、A956、A1038、E1351；ASME B16.34、B16.10；MSS SP-25、SP-55；ISO 15848-1、ISO 15156（按标准编号引用，以 PO 指定版本为准）
