# 海外设备采购预付款保函 (APG)、履约保函与质保保函：URDG 758 买方核验与索赔实操规程
## Buyer's Protocol: Advance Payment, Performance and Warranty Guarantees for Overseas Capital Equipment under URDG 758

> **版本**：2026-11-20 | **配套网站文章**：[`/blog/advance-payment-guarantee-performance-bond-urdg-758-buyer-guide`](https://www.sourcerating.com/blog/advance-payment-guarantee-performance-bond-urdg-758-buyer-guide) | **适用品类**：机床、压力机、破碎筛分线、变压器与开关柜、泵与压缩机、包装与工艺生产线等需支付预付款的成套设备与工程包
>
> **使用边界**：本规程为采购方执行模板，不构成法律意见。保函最终文本须由熟悉保函适用法律（通常为开立行所在地法律，URDG 758 第 34 条）的律师审阅。URDG 条文以 ICC 第 758 号出版物正式文本为准。

---

## 目录
1. [为什么"收到保函"不等于"有保障"](#1-为什么收到保函不等于有保障)
2. [保函、备用证、保证保险与留置金的区别](#2-保函备用证保证保险与留置金的区别)
3. [一份设备合同的三段保函时间轴](#3-一份设备合同的三段保函时间轴)
4. [五个让保函失效的陷阱](#4-五个让保函失效的陷阱)
5. [保函真伪核验六步法（SWIFT MT760）](#5-保函真伪核验六步法swift-mt760)
6. [保函关键条款审阅表（中英对照）](#6-保函关键条款审阅表中英对照)
7. [索赔函、展期或付款函与减额声明模板](#7-索赔函展期或付款函与减额声明模板)
8. [中国法下的止付风险与证据链准备](#8-中国法下的止付风险与证据链准备)
9. [付款节点与保函联动表](#9-付款节点与保函联动表)
10. [采购合同保函条款（中英对照）](#10-采购合同保函条款中英对照)
11. [付预付款前 Checklist 与保函台账](#11-付预付款前-checklist-与保函台账)

---

## 1. 为什么"收到保函"不等于"有保障"

典型翻车路径（示例场景）：买方采购 120 万美元破碎筛分线，付 30% 预付款，供应商邮件发来一份 PDF"不可撤销无条件保函"。11 个月后设备未发、联系中断，律师持 PDF 联系银行——银行答复无此保函记录。

已有公开警示：
- **FBI IC3（2019-03-18 公告）**：诈骗者使用伪造的 SWIFT "MT 799"/"MT 760" 报文或文件，使虚构的银行工具看起来合法（[来源](https://www.ic3.gov/media/2019/190318.aspx)）。
- **ICC 金融调查局 FIB（2004）**：虚假保函常见特征包括"有效期一年零一天"、"可分割、可转让、可让渡 (divisible, assignable and transferable)"等措辞（[来源](https://iccwbo.org/news-publications/news/fib-warns-of-fake-bank-guarantees/)）。

**即使保函是真的，也可能因措辞而失效**：生效条件未满足、发运即自动减额、到期日早于验收、索赔需供应商配合出具的单据。

---

## 2. 保函、备用证、保证保险与留置金的区别

| 工具 | 常用规则 | 是否独立于基础合同 | 付款触发 | 买方用途 |
| :--- | :--- | :--- | :--- | :--- |
| 见索即付保函 (Demand guarantee) | URDG 758 | 是 | 相符索赔 + 保函列明单据 | 预付款、履约、质保担保 |
| 备用信用证 (Standby L/C) | ISP98（或 UCP 600） | 是 | 备用证列明单据 | 同上，美国银行开立常见 |
| 从属性保证 / 保证保险 (Surety bond) | 合同法；或 URCB 524 | 否：担保人可援引供应商抗辩 | 违约与损失证明，常需裁决/判决 | 跨境供货少用、周期长 |
| 母公司担保 | 合同法 | 通常否 | 证明子公司违约 | 仅当母公司有可执行资产 |
| 买方现金留置金 (Retention) | 供货合同 | 不适用（钱在买方手里） | 买方自行抵扣 | 质保期担保，无银行风险 |

> 若对方提供的是保险公司或担保公司出具的"保证保险/履约保证书"，先看是**见索即付**还是**须证明违约**，二者不可等价比价。

---

## 3. 一份设备合同的三段保函时间轴

| 保函 | 金额（市场惯例） | 生效 | 减额 | 到期不得早于 |
| :--- | :--- | :--- | :--- | :--- |
| 预付款保函 APG | 等于预付款，如合同价 30% | 预付款到达保函指定账户 | 仅按**已交付并验收**设备价值减额，凭买方控制的单据 | 预付款所对应设备最终交付 + 60–90 天 |
| 履约保函 Performance | 合同价 5%–10% | 合同签署或首笔付款 | 一般不减额 | 最终/临时验收（SAT 或性能考核）+ 余量 |
| 质保保函 Warranty | 5%–10%，常替代现金留置 | 验收时，常与退还履约保函互换 | 一般不减额 | 质保期结束 + 发现、通知、提交索赔所需时间 |

**最常见空窗期**：发运即减额 APG + 履约保函按原合同交期到期 → 设备在买方现场未调试，无任何有效担保。

---

## 4. 五个让保函失效的陷阱

### 陷阱 1：保函从未生效
- 生效条款通常为"收到预付款至供应商在我行账号 X 后生效"。
- URDG 758 第 7 条：未指定单据证明的条件视为未规定而不予理会，**但可依据担保人自身记录判断的条件除外**——"款项到我行某账户"正是银行可自查的条件。
- **对策**：
  - 预付款账户以**经买方银行通知的保函文本**为准，不以形式发票或邮件为准；
  - 任何改账户请求 = 先当作 APG 问题处理（新账户会导致保函不生效），再当作 BEC 诈骗排查；
  - 到账后通过买方银行请开立行以加押报文确认保函已生效；
  - 分笔支付时把措辞改为"收到预付款或其任何部分后，按已收金额生效"。

### 陷阱 2：PDF 不是可核验的保函
见第 5 节。

### 陷阱 3：减额与到期条款
- 弱措辞："凭提单副本按每批发运价值自动减额"——提单在供应商手中，便宜部件或空箱发运即可大幅减额。
- URDG 758 第 25(c) 条：保函既无到期日也无到期事件时，开立满三年终止——"无限期"并非无限期。
- URDG 758 第 23 条"展期或付款 (extend or pay)"：本质是附有替代展期要求的相符索赔。担保人可暂停付款不超过 30 个日历日；若期满未达成展期，银行须立即付款。验收拖延、到期临近时使用，但需明确若对方拒绝展期将直接触发打款。
- 到期前至少 30 个工作日设置提醒，指定责任人。

### 陷阱 4：无法满足的索赔条件
- URDG 758 第 15(a) 条：索赔须附保函规定单据，**并在任何情况下**附受益人关于申请人在何方面违约的声明；第 15(c) 条允许保函排除该声明。
- 第 20 条：担保人在交单次日起 5 个营业日内审单；第 24 条：拒付须一次性列明全部不符点，否则丧失主张不符的权利。
- 拒绝接受的附加条件：申请人签署的证明、法院判决、仲裁裁决、供应商指定检验机构的证书。

### 陷阱 5：供应商申请止付
见第 8 节。

---

## 5. 保函真伪核验六步法（SWIFT MT760）

| 步骤 | 操作 | 记录 |
| :--- | :--- | :--- |
| 1 | 合同约定：保函须由开立行以加押 SWIFT **MT760** 发至买方指定银行（写明 BIC）通知买方；拒收邮件/快递原件/"MT799 预通知" | 合同附件 G |
| 2 | 经买方银行查 SWIFT 目录核对开立分行 BIC 与银行法定名称；警惕在真实银行名后加"International""Investment"等仿冒后缀 | BIC 核对截图 |
| 3 | 请买方银行贸易融资部书面确认：MT760 来自所述开立行且押码/RMA 校验通过 | 银行确认邮件 |
| 4 | **不使用**保函或供应商邮件上的任何电话/邮箱联系"银行" | — |
| 5 | 逐字比对银行通知的保函正文与事先商定的格式（金额、币种、受益人、到期、生效、索赔条件）；任何差异即为修改，须书面接受或拒绝。修改以 MT767 传递 | 比对记录 |
| 6 | 大额合同：询问买方银行能否保兑或以反担保形式开立本地保函；银行不愿意本身就是信号 | 银行答复 |

---

## 6. 保函关键条款审阅表（中英对照）

| 条款 | 拒绝的弱措辞 | 要求的措辞 |
| :--- | :--- | :--- |
| APG 减额 Reduction | 凭提单副本或商业发票自动减额 / Reduced automatically on presentation of copy B/L or invoice | 仅凭买方签署的减额声明或买方会签的交付验收证书减额 / Reduced only on presentation of a reduction statement signed by the Buyer |
| 到期日 Expiry date | 等于合同交期的固定日期 | 最晚现实验收日 + 60–90 天，且合同约定供应商须展期 |
| 到期事件 Expiry event | "发运时""交货时" | 单据化事件：提交签署的验收证书 |
| 交单地点 Place of presentation | 境外总行、仅限纸质 | 开立分行或通知行；明确允许经买方银行以加押 SWIFT 交单 |
| 索赔单据 Demand documents | 附申请人证明、判决、裁决或供应商指定机构证书 | 仅索赔函 + 受益人违约声明（URDG 758 第 15 条） |
| 部分索赔 Partial demands | 未规定或"仅限一次" | "允许多次及部分索赔 / Multiple and partial demands permitted" |
| 适用规则 Rules | 未写，或仅写"适用[供应商国]法律" | "Subject to URDG 758"，并写明适用法律与管辖 |

---

## 7. 索赔函、展期或付款函与减额声明模板

### 7.1 索赔函 Demand（URDG 758 第 15 条）
> We refer to your advance payment guarantee no. [编号] dated [日期] issued in our favour on behalf of [供应商]. We hereby demand payment of USD [金额]. [供应商] is in breach of its obligations under contract no. [合同号] dated [日期] in that it has failed to deliver the equipment listed in Schedule 1 by the contractual delivery date of [日期] and has not refunded the advance payment. Please pay to account [账户信息].
>
> 兹援引贵行应 [供应商] 申请、以我方为受益人、于 [日期] 开立的第 [编号] 号预付款保函。我方现索赔 [金额] 美元。[供应商] 违反了 [日期] 签订的第 [合同号] 号合同项下义务，即未能在合同交货日 [日期] 前交付附表 1 所列设备，且未退还预付款。请将款项付至 [账户信息]。

### 7.2 展期或付款 Extend or Pay（URDG 758 第 23 条）
> We refer to guarantee no. [编号]. [供应商] is in breach of contract no. [合同号] in that [违约事实]. We hereby demand payment of USD [金额] or, alternatively, extension of the expiry date of the guarantee to [新到期日].

### 7.3 买方减额声明 Reduction Statement
> We, [买方], confirm that equipment with a contract value of USD [金额], identified by serial numbers [铭牌序列号], has been delivered and accepted under contract no. [合同号] per acceptance certificate no. [编号] dated [日期]. The amount of advance payment guarantee no. [编号] may be reduced by USD [金额 × 预付比例].

### 7.4 交单执行要点
- 按保函规定的地点与形式交单；保函未明确允许电子交单（及格式、地址）时，以纸质原件快递至开立分行；
- 由保函载明的受益人授权签字人签署；公司更名/合并须在到期前解决；
- 准确引用保函编号与开立行参考号，金额不超过减额后可用余额；
- **到期前至少 10 个营业日交单**，保留送达时间证明。

---

## 8. 中国法下的止付风险与证据链准备

- URDG 758 第 34 条：除另有约定，保函适用开立分行所在地法律——中国境内银行开立的保函适用中国法。
- 《最高人民法院关于审理独立保函纠纷案件若干问题的规定》（法释〔2016〕24 号，2016-12-01 施行，[原文](https://www.court.gov.cn/fabu/xiangqing/31291.html)）：
  - **第十二条** 欺诈情形：受益人与他人串通虚构基础交易；提交伪造或虚假第三方单据；判决/裁决认定基础债务人无付款责任；**受益人确认基础债务已完全履行或付款到期事件未发生**；受益人明知无付款请求权仍滥用权利。
  - **第十四条** 止付须同时具备：第十二条情形存在高度可能性；情况紧急、不止付将造成难以弥补的损害；止付申请人提供足以弥补被申请人损失的担保。**以受益人在基础交易中违约为由请求止付的，人民法院不予支持。**
- **买方对策**：
  1. 项目期间不签署"最终验收""无未决索赔"类文件后再索赔；
  2. 从第一个延误节点起建立证据档案：书面延误通知、FAT 记录、检验报告、往来函件；
  3. 大额合同考虑**转开保函**结构：买方所在地银行开立本地保函（适用买方本地法、在本地交单），由供应商银行出具反担保。

---

## 9. 付款节点与保函联动表

| 节点 | 付款 | 有效担保 | 买方控制的证据 |
| :--- | :--- | :--- | :--- |
| 合同签署 | 预付款（如 30%）付至 APG 指定账户 | APG 已生效（开立行确认）；履约保函已开立 | 经买方银行通知的 MT760；生效确认 |
| 主材与外协订单下达 | 无 | APG 全额 | 主要外协订单副本；长周期件材质证书 |
| 工厂验收 FAT 通过 | 进度款（如 30%–40%） | APG 仍全额 | 买方检验员签署的 FAT 记录及尾项清单 |
| 发运 | 凭单付款，宜用信用证 | APG 仅凭买方减额声明减额 | 装运前检验报告；装箱/装柜监装 |
| 现场验收 SAT / 性能考核 | 尾款扣除留置金 | 履约保函换质保保函 | 签署的验收证书 |
| 质保期结束 | 释放留置金或质保保函到期 | 无 | 已关闭的缺陷清单 |

---

## 10. 采购合同保函条款（中英对照）

1. **形式与开立行 Form and issuer**
   - EN: The Seller shall procure an advance payment guarantee in the form of Appendix G, subject to URDG 758, issued by a bank acceptable to the Buyer and transmitted by authenticated SWIFT MT760 to [Buyer's bank, BIC]. No advance is payable until the Buyer's bank has confirmed receipt and authentication.
   - 中：卖方应按附件 G 格式、依 URDG 758、由买方认可的银行开立预付款保函，并以加押 SWIFT MT760 发送至 [买方银行及 BIC]。在买方银行确认收妥并核押前，买方无义务支付预付款。
2. **预付款账户 Account for the advance**
   - EN: The advance shall be paid only to the account named in the guarantee. Any request to pay to another account shall be made by the Seller's authorised signatory and accompanied by an amended guarantee naming that account.
   - 中：预付款仅支付至保函载明的账户。任何变更收款账户的请求须由卖方授权签字人提出，并同时提供载明新账户的保函修改。
3. **展期义务 Extension obligation**
   - EN: If acceptance has not occurred 45 days before the expiry of any guarantee, the Seller shall procure its extension by not less than 90 days. Failure to do so is a breach entitling the Buyer to demand payment in full.
   - 中：任何保函到期前 45 天仍未完成验收的，卖方应促使该保函展期不少于 90 天；未展期构成违约，买方有权全额索赔。
4. **仅凭买方单据减额 Reduction only by Buyer document**
   - EN: The advance payment guarantee shall reduce only on presentation of a reduction statement signed by the Buyer stating the value of equipment delivered and accepted.
   - 中：预付款保函仅凭买方签署、载明已交付并验收设备价值的减额声明减额。
5. **费用承担 Charges**
   - EN: All charges of the issuing bank, any confirming bank and any counter-guarantor are for the Seller's account.
   - 中：开立行、保兑行及反担保行的全部费用由卖方承担。
6. **评级下调替换 Replacement on downgrade**
   - EN: If the issuing bank's long-term credit rating falls below [rating], the Seller shall within 30 days provide a replacement guarantee from an acceptable bank.
   - 中：开立行长期信用评级低于 [评级] 时，卖方应在 30 日内提供买方认可银行开立的替代保函。

---

## 11. 付预付款前 Checklist 与保函台账

### 11.1 Checklist
- [ ] 保函正文与附件 G 逐字一致（金额、币种、受益人名称、合同号）
- [ ] 注明 Subject to URDG 758，并写明适用法律、交单地点与交单形式
- [ ] 经买方银行收到加押 MT760，银行书面确认核押通过
- [ ] 开立行法定名称与 BIC 经买方银行核对（不使用文件或邮件中的联系方式）
- [ ] 生效条款中的账户、银行、户名、币种与付款指令完全一致
- [ ] 减额仅凭买方签署单据
- [ ] 到期日 ≥ 最晚现实验收日 + 余量；合同约定展期义务
- [ ] 索赔仅需索赔函 + 违约声明，无判决/裁决/申请人证明/第三方证书
- [ ] 允许多次及部分索赔
- [ ] 到期日与提前 30 个工作日提醒已录入合同管理日历，指定责任人
- [ ] 违约证据档案已建立（延误通知、检验报告、往来函件）

### 11.2 保函台账（每份保函一行）

| 保函编号 | 类型 (APG/履约/质保) | 开立行 / BIC | 通知行 | 金额 / 币种 | 当前可用余额 | 生效确认日期 | 到期日 / 到期事件 | 提醒日 | 交单地点与形式 | 责任人 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| | | | | | | | | | | | |

---

**参考来源**（2026-11-20 核查）：ICC [URDG 758](https://2go.iccwbo.org/uniform-rules-for-demand-guarantees-urdg-2010-revision-english.html)；最高人民法院[法释〔2016〕24 号](https://www.court.gov.cn/fabu/xiangqing/31291.html)；FBI IC3 [2019-03-18 公告](https://www.ic3.gov/media/2019/190318.aspx)；ICC FIB [虚假保函警示](https://iccwbo.org/news-publications/news/fib-warns-of-fake-bank-guarantees/)。
