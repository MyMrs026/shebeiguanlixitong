/** 
 * 所有文件一些公共状态的存放即管理
*/
import Vue from 'vue';
import Vuex from 'vuex';
//状态持久化插件，比如说登录用户为admin但是进去后一刷新登录用户就丢失，为了防止这种情况发生
import createPersistedState from 'vuex-persistedstate'; 

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex)

const state = {
  // 用户登录状态
  cu_role:'',
  
  // 公告信息
  notices:[
    {
      notice_id: 1,
      title: '2023年浙江大学全球人才招聘，欢迎加盟!',
      date: new Date('2022-11-01')
    },
    {
      notice_id: 2,
      title: '浙江大学2023年行政专员、技术专员公开招聘公告!',
      date: new Date('2022-11-04')
    },
    {
      notice_id: 3,
      title: '浙江大学计划财务处公开招聘技术专员启事!',
      date: new Date('2022-11-06')

    },
    {
      notice_id: 4,
      title: '浙江大学超重力研究中心2023年上半年实验技术岗位公开招聘公告!',
      date: new Date('2022-11-09')
    },
    {
      notice_id: 5,
      title: '浙江大学图书资料报废处置招标公告（20230404）!',
      date: new Date('2022-11-12'),
      content: ` 根据浙江大学校务会议决定事项通知单（【2022】26号）要求，学校拟对一批报废的图书、期刊进行公开招标处置，欢迎具有相关资质的各造纸企业、废品回收公司报名竞标。

      一、项目名称及基本内容
      
      1. 项目编号：ZJU-BFTS-20230404
      
      2. 项目名称：浙江大学图书资料报废处置
      
      3. 投标内容：清运并化浆旧损图书、期刊合订本一批，共计101603册（现存放于浙大宁波理工学院，需现场踏勘）
      
      二、投标单位资格条件
      
      1. 基本要求：中国境内合法注册，具有独立法人资格的企业，且营业执照合格有效。
      
      2. 资质要求：应为具有法人资格的废旧物品回收企业或纸制品生产企业。
      
      3. 信誉要求：有良好的社会信誉，近三年无违法或重大涉诉事件及不良行为记录：
      
      （1）投标单位及其法定代表人未被《信用中国》列入失信被执行人；
      
      （2）投标单位未被《国家企业信用信息公示系统》列入经营异常名录且未被移出、严重违法失信企业名单（黑名单）且未被移出等不良情况。
      
      4. 其他要求：本项目不接受联合体投标。
      
      三、公开处置投标安排
      
      （一）报名及要求
      
      1. 报名时间：即日起至2023年4月9日，逾期不予受理。
      
      2. 报名所需材料：
      
      （1）营业执照（副本）复印件（加盖公章）；
      
      （2）投标单位法定代表人及被授权人的身份证复印件；
      
      （3）投标单位法定代表人授权委托书原件（如是法定代表人经办，则无需此资料）（格式见附件1）。
      
      3. 报名资料递交方式：
      
      投标单位将报名所需材料原件的扫描件发送至电子邮箱sxyu@zju.edu.cn，纸质报名材料带到踏勘现场与《浙江大学报废图书资料处置竞标书》（格式见附件2）一起递交。
      
      4. 报名时间截止前未收到或未按要求递交上述所有资料者，不具备参与投标资格。
      
      （二）现场踏勘及投标
      
      1. 现场踏勘地点：浙大宁波理工学院（地址：浙江省宁波市钱湖南路1号）。
      
      2. 现场踏勘时间：另行通知。
      
      3. 现场踏勘须知：每家投标单位现场踏勘人员须遵守浙大宁波理工学院相关校园管理规定，并于现场踏勘前一天中午12：00前，将参与踏勘人员的姓名、身份证号码、联系电话及汽车车牌号等信息发送至电子邮箱sxyu@zju.edu.cn，以便统一办理进校手续。未及时递交者，视为主动放弃现场踏勘及投标资格。
      
      4. 现场投标报价：本次竞标，为一次性书面报价，价高者中标。投标单位经现场踏勘后，当场填写《浙江大学报废图书资料处置竞标书》（可先行下载打印并加盖公章），填好后自行密封，交由浙江大学图书馆现场对接人员保存。未当场提交的，视为自动放弃本次招标。
      
      （三）残值交款
      
      中标单位在收到中标通知后2个工作日内完成缴款，并将报废图书、期刊处置残值款以转账形式交至以下指定账户：
      
      账户名称：浙江大学        
      
      统一社会信用代码：12100000470095016Q
      
      开户银行：中国农业银行杭州紫金港支行
      
      账号：19042201040000014
      
      备注：报废图书资料残值款
      
      （四）投标单位注意事项及要求
      
      1. 该批处置的报废图书、期刊以现场看样实物为准，浙江大学不对本次处置的废旧书刊现状做出任何承诺。
      
      2. 中标单位收购的报废图书资料仅可用于化浆造纸用途，不得以任何形式进行二次销售或其他商业用途，一经发现将取消中标资格并严肃追究相应责任。化浆过程须在浙江大学图书馆相关人员监督见证下方可操作执行。
      
      3. 中标单位自行承担该批报废书刊的搬运、运输及保洁等费用，缴纳价款后在浙江大学规定时间内将报废书刊清运出浙大宁波理工学院。清运回收的报废书刊须按照国家相关法律、法规进行处置，处置过程中的一切法律责任自负，浙江大学概不负责。
      
      四、其他
      
      公告解释权归浙江大学图书馆所有，投标单位的报名行为视为已理解并接受该公告所有内容。
      
      五、联系人及电话
      
      联系人：虞舜贤                    电话：0571-87952421
      
      地  址：浙江大学玉泉校区图书馆315室
      
      
      
       
      
      图书馆
      
      2023-4-4
      
      
      
      附件1：授权委托书.docx
      
      附件2：浙江大学报废图书资料处置竞标书.docx
      `
    },
    {
      notice_id: 6,
      title: '浙江大学2023年技术专员岗位公开招聘拟录用人员公示（三）!',
      date: new Date('2022-11-14'),
      content: `经公开招聘，院（系）、单位组织考评，人力资源处审核，并报学校同意，拟录用物理学院张利等2人为技术专员。公示期从2023年3月23日至2023年3月31日17:30止。

      公示受理部门：人力资源处（紫金港校区东三104-5）
      
      联系电话：0571-88981959 
      
      院（系）、单位
      
      姓名
      
      学历/学位
      
      原学习、工作单位
      
      物理学院
      
      张利
      
      研究生/硕士
      
      歌尔股份有限公司
      
      信电学院
      
      綦成林
      
      研究生/硕士
      
      北京博达微科技有限公司
      
      公示期结束后，由杭州江南人才服务有限公司按程序办理相关入职手续。
      `
    },
    {
      notice_id: 7,
      title: '浙江大学2023年拟录用人员名单公示（四）!',
      date: new Date('2022-11-15'),
      content: `经公开招聘，院（系）、单位组织考评，人力资源处审核，并报学校同意，拟录用海宁校区陈迪等4人为我校教职员工。公示期从2023年3月23日至2023年3月31日17:30止。

      公示受理部门：人力资源处（紫金港校区东三104-5）
      
      联系电话：88981959 
      
      拟聘用岗位
      
      院（系）、单位
      
      姓名
      
      学历/学位
      
      原学习、工作单位
      
      教学科研并重岗
      
      海宁校区
      
      陈迪
      
      研究生/博士
      
      南京大学
      
      专职研究员
      
      航空航天学院
      
      朱志新
      
      研究生/博士
      
      本校博后
      
      实验技术岗
      
      物理学院
      
      居乐乐
      
      研究生/博士
      
      本校博士
      
      实验技术岗
      
      信电学院
      
      王改利
      
      研究生/博士
      
      加拿大滑铁卢大学
      
       公示期结束后，无异议者即可启动入职流程，具体可见：http://hr.zju.edu.cn/cn/2018/1205/c28804a1182879/page.htm
      `
    },
    {
      notice_id: 8,
      title: '关于浙江大学2023年党政管理人员招聘拟录用名单的公示!',
      date: new Date('2022-11-18'),
      content: `根据浙江大学2023年从校内外招聘党政管理人员的通知，经本人申请、资格审查及选聘考试，现将拟录用人员名单和替补人员名单予以公示，并同步开展体检和考察工作。

      公示期从2023年2月28日至2023年3月8日。单位和个人对公示对象存在的问题，均可以书面、电话、邮件等形式向学校组织人事部门反映。单位反映问题的，须加盖公章；个人反映问题的，提倡署报本人真实姓名。学校组织人事部门对反映人和反映内容严格保密，并依法保护反映人的合法权益。反映问题要实事求是，客观公正，对故意诬陷他人的，一经查实，按有关规定严肃处理。
      
      公示受理部门：浙江大学党委组织部（浙江大学紫金港校区纳米楼509B室）、浙江大学人力资源处（浙江大学紫金港校区东三教学楼104-5室）
      
      联系电话：0571-88981824、0571-88982685
      
      电子邮箱：zzb@zju.edu.cn、rsc@zju.edu.cn 
      
       
      
      浙江大学2023年党政管理人员拟录用和替补名单
      
      序号
      
      姓名
      
      学校
      
      录用情况
      
      1
      
      胡棋昱
      
      浙江大学
      
      拟录用
      
      2
      
      楼  雨
      
      北京大学
      
      拟录用
      
      3
      
      李  备
      
      清华大学
      
      拟录用
      
      4
      
      薛  凡
      
      浙江大学
      
      拟录用
      
      5
      
      赵  壮
      
      中国科学技术大学
      
      拟录用
      
      6
      
      黄  浩
      
      清华大学
      
      拟录用
      
      7
      
      邓旭萌
      
      浙江大学
      
      拟录用
      
      8
      
      叶  骏
      
      清华大学
      
      拟录用
      
      9
      
      刘  源
      
      浙江大学
      
      拟录用
      
      10
      
      潘应昊
      
      浙江大学
      
      拟录用
      
      1
      
      高  飞
      
      浙江大学
      
      替补1
      
      2
      
      李  玥
      
      吉林大学
      
      替补2
      
      3
      
      尹启航
      
      浙江大学
      
      替补3
      
      4
      
      陈丽哲
      
      浙江大学
      
      替补4
      
      5
      
      周  蕾
      
      同济大学
      
      替补5
      
      6
      
      陈雪倩
      
      北京大学
      
      替补6
      
      7
      
      张  娇
      
      浙江大学
      
      替补7
      
      8
      
      黄夏晔
      
      英国埃克塞特大学
      
      替补8
      
       
      
        
      
                                                         浙江大学党委组织部   
      
                                                         浙江大学人力资源处
      
                                                             2023年2月28日
      
      
      `
    },
    {
      notice_id: 9,
      title: '关于浙江大学2023年专职辅导员招聘拟录用名单的公示!',
      date: new Date('2022-11-20'),
      content: `根据浙江大学2023年从校内外招聘专职辅导员的通知，经本人申请、资格审查及选聘考试，现将拟录用人员名单和替补人员名单予以公示，并同步开展体检和考察工作。

      公示期从2023年2月28日至2023年3月8日。单位和个人对公示对象存在的问题，均可以书面、电话、邮件等形式向学校组织人事部门反映。单位反映问题的，须加盖公章；个人反映问题的，提倡署报本人真实姓名。学校组织人事部门对反映人和反映内容严格保密，并依法保护反映人的合法权益。反映问题要实事求是，客观公正，对故意诬陷他人的，一经查实，按有关规定严肃处理。
      
      公示受理部门：浙江大学党委组织部（浙江大学紫金港校区纳米楼509B室）、浙江大学人力资源处（浙江大学紫金港校区东三教学楼104-5室）
      
      联系电话：0571-88981824、0571-88982685
      
      电子邮箱：zzb@zju.edu.cn、rsc@zju.edu.cn
      
       
      
      浙江大学2023年博士学历专职辅导员拟录用和替补名单
      
      序号
      
      姓名
      
      学校
      
      录用情况
      
      1
      
      崔晓宇
      
      浙江大学
      
      拟录用
      
      2
      
      许亦非
      
      浙江大学
      
      拟录用
      
      3
      
      何映晖
      
      浙江大学
      
      拟录用
      
      4
      
      宋相杰
      
      中国科学技术大学
      
      拟录用
      
      5
      
      翟  明
      
      山东大学
      
      拟录用
      
      6
      
      段玮茵
      
      浙江大学
      
      拟录用
      
      7
      
      刘志楠
      
      南京大学
      
      拟录用
      
      8
      
      淳于训洲
      
      河海大学
      
      拟录用
      
      9
      
      连晨炜
      
      上海交通大学
      
      拟录用
      
      10
      
      叶碧欣
      
      北京师范大学
      
      拟录用
      
      11
      
      苏  凡
      
      北京大学
      
      拟录用
      
      12
      
      姜子鹏
      
      浙江大学
      
      拟录用
      
      13
      
      陈梦瑶
      
      浙江大学
      
      拟录用
      
      14
      
      周之琰
      
      浙江大学
      
      拟录用
      
      15
      
      禹  禄
      
      吉林大学
      
      拟录用
      
      16
      
      王雪莹
      
      中国科学技术大学
      
      拟录用
      
      17
      
      吴润秋
      
      浙江大学
      
      拟录用
      
      18
      
      李  恒
      
      浙江大学
      
      拟录用
      
      19
      
      姚松坪
      
      浙江大学
      
      拟录用
      
      20
      
      王  威
      
      荷兰阿姆斯特丹大学
      
      拟录用
      
      1
      
      安建宇
      
      浙江大学
      
      替补1
      
      2
      
      张云然
      
      浙江大学
      
      替补2
      
      3
      
      袁  凡
      
      上海交通大学
      
      替补3
      
      4
      
      林扬子
      
      浙江大学
      
      替补4
      
      5
      
      李  曦
      
      浙江大学
      
      替补5
      
      6
      
      唐  磊
      
      中国科学技术大学
      
      替补6
      
      7
      
      朱敏艳
      
      浙江大学
      
      替补7
      
      8
      
      马舒颜
      
      浙江大学
      
      替补8
      
      9
      
      李津津
      
      东南大学
      
      替补9
      
      10
      
      马  勤
      
      中国科学院大学
      
      替补10
      `
    },
    {
      notice_id: 10,
      title: '浙江大学2022年拟录用人员名单公示（二十一）!',
      date: new Date('2022-11-22'),
      content: `经公开招聘，院（系）、单位组织考评，人力资源处审核，并报学校同意，拟录用电气工程学院邱剑等3人为我校教职员工。公示期从2022年12月22日至2022年12月30日17:30止。

      公示受理部门：人力资源处（紫金港校区东三104-5）
      
      联系电话：88981959
      
             
      
      聘用岗位
      
      院（系）、单位
      
      姓名
      
      学历/学位
      
      原学习、工作单位
      
      专职研究员
      
      电气工程学院
      
      邱剑
      
      研究生/博士
      
      阿里云计算有限公司
      
      专职研究员
      
      化学工程与生物工程学院
      
      刘铁峰
      
      研究生/博士
      
      浙江工业大学
      
      专职研究员
      
      信息与电子工程学院
      
      朱怀宇
      
      研究生/博士
      
      本校博后
      
      
      
      
       公示期结束后，无异议者即可启动入职流程，具体可见：http://hr.zju.edu.cn/cn/2018/1205/c28804a1182879/page.htm
      
       
      `
    },
    {
      notice_id: 11,
      title: '国际教育学院面向海内外招聘英才!',
      date: new Date('2022-11-23'),
      content: `浙江大学国际教育学院是学校国际学生工作归口管理部门，承担国际学生教育的管理和协调职能，负责国际学生汉语和中国文化教学，并对全校国际学生提供留学生活指导和服务。因工作需要，现面向海内外诚聘事业编制对外汉语教师1名。热忱欢迎海内外优秀人才加盟国际教育学院。

      一、基本条件
      
      坚持正确政治方向，遵守外事纪律，热爱教育事业，具有良好的思想品德和学术道德、严谨的科研作风、健康向上的心理素质，以及团队合作精神；对浙江大学文化和价值观高度认同；能够全职在浙江大学国际教育学院工作。
      
      二、招聘岗位及要求
      
        
      
      招聘岗位	工作职责	招聘条件
      对外汉语教师	从事来华国际学生经贸课程、创新创业、商务汉语、国情教学以及相关教学和教研工作。	教授：
      1.年龄在50周岁及以下；2.具有经济类、管理类博士学位；3.教学科研成效显著。
      副教授：
      1.年龄在40周岁及以下；2.具有经济类、管理类博士学位；3.教育教学成效显著。
      讲师：
      1.年龄在35周岁及以下；2.毕业于海内外高水平大学、科研院所，具有经济类、管理类博士学位；3.熟练掌握一门以上外语，普通话水平二级甲等以上；4.有海外教学经历或较强科研能力者优先。
      
      
      三、薪酬待遇
      
      薪酬待遇按学校事业编制相关政策执行，按国家有关规定缴纳社保与公积金。
      
      四、应聘程序
      
      请将个人简历及相关材料（包括自本科开始至申请之日连续的学习、工作简历，2篇代表性论文等）发送至邮箱：zjuiec@163.com。
      
      国际教育学院将根据报名情况对应聘人员进行资料审核和筛选，通过初审者参加由学院组织的面试和试讲。
      
      报名截止日期：2023年1月5日。
      
       
      
      
      
      浙江大学国际教育学院
      
      2022年12月16日
      `
    },
    {
      notice_id: 12,
      title: '浙江大学国际化雇员全球招聘启事 Zhejiang University International Job Opportunities!',
      date: new Date('2022-11-25'),
      content: `浙江大学坐落于中国历史文化名城、风景旅游胜地杭州，是一所特色鲜明、在海内外有较大影响的综合型、研究型、创新型大学，前身求是书院创立于1897年，为中国人自己最早创办的新式高等学校之一。学校致力于传播与创造知识，弘扬与引领文化，服务与奉献社会，努力加快走向世界一流大学前列，为促进人类文明进步作出卓越贡献。根据浙江大学事业发展需要，现面向海内外公开招聘国际化雇员3名。有关事项公告如下：

 

      Zhejiang University (ZJU), located in the historical and picturesque city of Hangzhou, China, is a comprehensive, research-oriented, and innovative university with great  influence at home and abroad. With more than one hundred years of history, its root can be traced back to the Qiushi Academy founded in 1897. Zhejiang University is striving to become a world-class university with Chinese characteristics. Adhering to the spirit of seeking truth and pursuing innovation, Zhejiang University is committed to spreading and creating knowledge, promoting and leading culture, serving and contributing to society, and making outstanding contributions to the great rejuvenation of the Chinese nation and the progressing of human civilization. In order to meet the international development, Zhejiang University opens 3 positions for international applicants. The job description and requirement are listed as follows:
      
       
      
      一、招聘岗位1
      
      职位：全球伙伴关系主管
      
      工作性质：全职
      
      工作单位：浙江大学国际合作与交流处
      
      工作地点：中国杭州
      
      招聘人数：1人
      
      （一）岗位职责
      
      1.  与学院（系）和相关职能部门密切协同，协助做好学校对外合作交流工作的谋划和落实；
      
      2.  与各类海外高校、研究机构、国际组织和企业建立并维护富有成效的伙伴关系；
      
      3.  策划协调各类国际合作计划、项目和活动，助力提升学校的国际能见度和影响力；
      
      4.  研判学校在全球伙伴关系建设上所面临的机遇与挑战。
      
      （二）基本条件和要求
      
      1. 原则要求硕士及以上学位，有丰富工作经验者可适当放宽条件；
      
      2. 英语为母语或者达到相当水平，具有优秀的口头和书面沟通能力；  
      
      3. 具有三年以上行政、管理类工作经验；
      
      4. 熟悉全球高等教育行业；
      
      5. 具备取得来华工作许可和工作类居留证件所需要的条件。
      
      （三）优先招聘条件
      
      1. 高校工作经验，尤其是教育科研国际合作管理经验；
      
      2. 优秀的组织协调能力；
      
      3. 出色的跨文化交流和适应能力；
      
      4. 突出的文稿写作、编辑和分析能力；
      
      5. 具有一定的中文表达能力。
      
      （四）薪酬福利
      
      提供有竞争力的薪酬，具体根据个人能力和经验面议。
      
      （五）申请方式及截止时间
      
          请将英文简历和求职信发送至wscwsc@zju.edu.cn。截止时间2022年12月30日。
      
      
      
      POSITION ONE
      
      Job Title: Global Partnerships Manager
      
      Job Type: Full-time
      
      Affiliation: Office of Global Engagement, Zhejiang University 
      
      Location: Hangzhou, China
      
      Vacancy: 1
      
      
      
      JOB DESCRIPTION & RESPONSIBILITIES
      
      1. Support strategic and operational leadership in shaping and delivering the University’s global engagement agenda; work closely with the Colleges/Schools and other administrative units.
      
      2. Develop and maintain successful international partnerships with various universities, research institutions, international organizations, and companies.
      
      3. Lead and coordinate events and programs of international collaboration and help raise the University’s global profile and visibility.
      
      4. Be able to identify global opportunities and potential risks for the University’s international collaborations.
      
      
      
      BASIC REQUIREMENTS
      
      1. Master’s Degree or above; applicants with relevant working experience will also be considered prioritized.
      
      2. Native English speakers or those with advanced English language ability, who are excellent oral and written communication skills.
      
      3. With three years of working experience in administrative or management positions.
      
      4. Be familiar with working systems and environment of global higher education.
      
      5. Be qualified to obtain work permit and work-type residence permit in China.
      
      
      
      DESIRED EXPERIENCE
      
      1. Experience of working in higher education, particularly in managing complex international educational and research partnerships.
      
      2. Excellent organizational and events management skills.
      
      3. Strong cross-cultural competence and ability in international working environments.
      
      4. Strong drafting, editing, and analytical skills.
      
      5. Master a basic level of communication in Chinese.
      
      
      
      SALARY & BENEFIT
      
      Commensurate with qualifications and working experience
      
      
      
      TO APPLY
      
      Resumé / CV and cover letter (in English);
      
      Send by email to: wscwsc@zju.edu.cn
      
      Application deadline: December 30, 2022
      
       
      
      二、招聘岗位2
      
      职位：全球人才发展主管
      
      工作性质：全职
      
      工作单位：浙江大学人力资源处
      
      工作地点：中国杭州
      
      招聘人数：1人
      
      （一）岗位职责
      
      1. 协助制定全球人才队伍建设规划；
      
      2. 开展全球人才招聘工作，加快海外高水平人才汇聚；
      
      3. 发展和协调外籍教职工事务、活动和项目，做好外籍教职工和各类兼任专家服务；
      
      4. 发展和维护与国际高水平院校的关系，促进人事人才方面的国际交流与合作，提升学校的国际声誉和影响力。
      
      （二）基本条件和要求
      
      1. 具有硕士研究生及以上学历学位；
      
      2. 遵守中国法律法规，遵守中国的公序良俗和教师职业道德，遵守教育与宗教相分离的原则，认同浙江大学文化精神；
      
      3. 品行端正、身心健康，具有良好的职业道德，熟悉全球高等教育动态，能胜任岗位工作要求；
      
      4. 具有一定的中文表达能力；
      
      5. 具备取得来华工作许可和工作类居留证件所需要的条件。
      
      （三）优先招聘条件
      
      1. 有高等教育行业或著名企业三年及以上管理经验；
      
      2. 较强的跨文化能力和适应新环境的能力；
      
      3. 优秀的组织和事务管理能力；
      
      4. 较强的起草、编辑和分析能力。
      
      （四）薪酬福利
      
      提供有竞争力的薪酬，具体根据个人能力和经验面议。
      
      （五）申请方式及截止时间
      
      请将英文简历和求职信发送至zdrs@zju.edu.cn。截止时间2022年12月30日。
      
      
      
      POSITION TWO
      
      Job Title: Global Talent Development Manager
      
      Job Type: Full-time
      
      Affiliation: Human Resources Department, Zhejiang University
      
      Location: Hangzhou, China
      
      Vacancy: 1
      
       
      
      JOB DESCRIPTION & RESPONSIBILITIES
      
      1.Assist in making the global talent team development strategy.
      
      2.Be responsible for global talent recruitment, and accelerate the importing of high-level overseas talent.
      
      3.Be responsible for international staffs’ management, activities organization, and projects application, and provide services for international staff and part-time experts.
      
      4.Develop and maintain the relationship with international high-level universities, promote the international exchange and cooperation in personnel, and enhance the international reputation and influence of Zhejiang university.
      
      
      
      BASIC REQUIREMENTS
      
      1. Master’s Degree or above.
      
      2. Abide by Chinese laws and regulations and Chinese public order; follow the Chinese customs and teachers’ professional ethics; abide by the principle of the separation of education and religion, and approve the cultural spirit of Zhejiang University.
      
      3. With good personal and professional ethics, and being physically and mentally healthy; be familiar with global higher education trends, and be qualified for the job requirements.
      
      4. Master a basic level of communication in Chinese.
      
      5. Be qualified to apply for the work permit and work-type residence permit in China.
      
      
      
      DESIRED EXPERIENCE
      
      1. At least 3 years of management experience in higher education industry or famous enterprises.
      
      2. Strong cross-cultural competence and ability to adapt in new environments.
      
      3. Excellent organizational and management skills.
      
      4. Strong drafting, editing, and analytical skills.
      
      
      
      SALARY & BENEFIT
      
      Commensurate with qualifications and working experience
      
      
      
      TO APPLY
      
      Resumé / CV and cover letter (in English);
      
      Send by email to: zdrs@zju.edu.cn
      
      Application deadline: December 30, 2022
      
       
      
      三、招聘岗位3
      
      职位：促进博士后全球发展主管
      
      工作性质：全职
      
      工作单位：浙江大学人力资源处
      
      工作地点：中国杭州
      
      招聘人数：1人
      
      （一）岗位职责
      
      1. 浙江大学博士后政策优势的海外宣传，提高浙江大学博士后岗位的国际认同度；
      
      2. 对接校内各学科、实验室博士后岗位招聘需求，从海外一流高校、学科与机构延揽优秀博士来校工作，为海外应聘人员提供各类咨询服务；
      
      3. 参与外籍博士后政策与合同的制定，帮助新入职的外籍博士后融入学校环境，协助其办理来华工作、居住的各类手续；对接校内外相关单位完善外籍博士后服务体系；
      
      4. 组织好外籍博士后的入职培训，日常保持与每位外籍博士后的沟通交流、并帮助其解决困难，增强外籍博士后对学校文化的认同。
      
      （二）基本条件和要求
      
      1. 原则要求硕士及以上学位，有丰富工作经验者可适当放宽条件；
      
      2. 英语为母语或达到相当水平，具有优秀的口头和书面沟通能力；  
      
      3. 具有一定的中文表达能力；
      
      4. 具有相关行政、管理类工作经验；
      
      5. 熟悉全球高等教育行业；
      
      6. 具备取得来华工作许可和工作类居留证件所需要的条件。
      
      （三）优先招聘条件
      
      1.优秀的组织协调能力；
      
      2.出色的跨文化交流和适应能力；
      
      3.突出的文稿写作、编辑和分析能力。
      
      （四）薪酬福利
      
      提供有竞争力的薪酬，具体根据个人能力和经验面议。
      
      （五）申请方式及截止时间
      
      请将英文简历和求职信发送至zdrs@zju.edu.cn。截止时间2022年12月30日。
      
       
      
      POSITION THREE
      
      Job Title: Postdoctoral Global Development Promotion manager
      
      Job Type: Full-time
      
      Affiliation: Human Resource Department, Zhejiang University 
      
      Location: Hangzhou, China
      
      Vacancy: 1
      
       
      
      JOB DESCRIPTION & RESPONSIBILITIES
      
      1. Promote and advertise the advantages of Zhejiang University postdoctoral policies in oversea regions, increase the international recognition of Zhejiang University postdoctoral programs.
      
      2. Coordinate recruiting demands of postdoctoral positions with the university’s disciplines and labs, invite talented doctors from international first-class universities, disciplines, and institutions to work in Zhejiang University, and provide consulting services for oversea applicants.
      
      3. Participate in the formulation of international postdoctoral policies and contracts, help new international postdoctoral researchers fit in the university environment, and assist their application for work permit in China house renting procedures, etc.; connect with relevant departments in and outside the university to improve the international postdoctoral researchers’ service system.
      
      4. Organize the orientation annually, keep contact with every international postdoctoral researcher, assist them with their daily problems, and enhance their recognition to the university culture.
      
       
      
      BASIC REQUIREMENTS
      
      1. Master’s Degree or above, or applications with relevant  working experience will be considered prioritized.
      
      2. Native English speakers or those with advanced English language ability, who are excellent oral and written communication skills.
      
      3. Master a basic level of communication in Chinese.
      
      4. Experience of working in an administrative or management role.
      
      5. Good knowledge of affairs relating to global higher education.
      
      6. With the qualification of applying the work permit and work-type residence permit in China.
      
       
      
      DESIRED EXPERIENCE
      
      1. Excellent organizational and events management skills.
      
      2. Strong cross-cultural competence and ability to adapt in new environments.
      
      3. Strong drafting, editing, and analytical skills.
      
       
      
      SALARY & BENEFIT
      
      Commensurate with qualifications and working experience
      
       
      
      TO APPLY
      
      Resumé/ CV and cover letter (in English); 
      
      Send by email to: zdrs@zju.edu.cn
      
      Application deadline: December 30, 2022
      `
    },
    {
      notice_id: 13,
      title: '浙江大学2022年拟录用人员名单公示（二十）',
      date: new Date('2022-11-27'),
      content: `经公开招聘，院（系）、单位组织考评，人力资源处审核，并报学校同意，拟录用马克思主义学院刘少阳等4人为我校教职员工。公示期从2022年12月7日至2022年12月15日17:30止。

      公示受理部门：人力资源处（紫金港校区东三104-5） 
      
      联系电话：88981959
      
      
      
      拟聘用岗位
      
      院（系）、单位
      
      姓名
      
      学历/学位
      
      原学习、工作单位
      
      教学科研并重岗
      
      马克思主义学院
      
      刘少阳
      
      研究生/博士
      
      复旦大学
      
      教学科研并重岗
      
      马克思主义学院
      
      奚佳梦
      
      研究生/博士
      
      北京大学
      
      专职研究员
      
      能源工程学院
      
      王君
      
      研究生/博士
      
      本校博后
      
      专职研究员
      
      脑机智能重点实验室
      
      何恩慧
      
      研究生/博士
      
      中科院空天信息创新研究院
      
      
      
        公示期结束后，无异议者即可启动入职流程，具体可见：http://hr.zju.edu.cn/cn/2018/1205/c28804a1182879/page.htm
      `
    },
    {
      notice_id: 14,
      title: '浙江大学建筑设计研究院公开招聘高级专业技术人员启事',
      date: new Date('2022-11-30'),
      content: `浙江大学建筑设计研究院因工作需要，现面向社会公开招聘高级专业技术人员，纳入事业编制管理。现将有关事项通知如下：

      一、招聘岗位及条件
      
      本次公开招聘高级专业技术人员4人。
      
      1.具有良好的政治素质和敬业精神，热爱建筑设计事业，身心健康；
      
      2.具有全日制本科及以上学历，以及副高级及以上专业技术职务；
      
      3.具有相关行业甲级资质单位5年及以上工作经历，且担任中层正职或主任工程师及以上岗位3年及以上；
      
      4.应聘设计岗位人员必须具有相关执业资格（如一级注册建筑师、一级注册结构工程师、注册公用设备工程师、注册土木工程师、注册咨询工程师等）；
      
      5.年龄不超过45周岁（1978年1月1日及以后出生，以有效期内身份证上的日期为准），特别优秀的引进人才可适当放宽。
      
      二、招聘流程
      
      1.报名
      
      报名时间自公告之日起至2022年12月12日17:00。请符合招聘岗位要求且有意向者填写应聘人员登记表.doc，将表格及其它证明本人能力、水平的相关资料（学历学位、职称、执业资格、获奖、荣誉等）发至邮箱zhaopin@zuadr.com，邮件主题和文件名命名为“事业编制_现单位_姓名”。
      
      联系方式：建筑设计研究院人力资源部，张冬雯，0571-85891017。
      
      2.资格初审
      
      由用人单位根据招聘岗位条件确定通过资格初审的人员，并报人力资源处审核。岗位通过资格初审的报名人数应不少于计划招聘人数的3倍，否则相应核减有关岗位招聘人数直至取消招聘计划。
      
      3.面试
      
      由学校及用人单位组织实施，采取面试、考察的方式，对通过资格初审人员的思想政治表现、道德品质、技术水平和业务能力进行考核，按计划招聘数确定拟录用人员。
      
      竭诚欢迎院士、工程勘察设计大师、享受政府特殊津贴专家、优秀中青年科技专家、省级有突出贡献的中青年科技人员、省级“人才工程”培养人选、公司主导专业学术技术带头人等领军人物加盟。
      
       
      
       
      
      浙江大学建筑设计研究院
      
         2022年12月6日
      
      
      `
    },
    {
      notice_id: 15,
      title: '浙江大学2023年党政管理人员和专职辅导员招聘启事',
      date: new Date('2022-12-03'),
      content: `“国有成均，在浙之滨”。浙江大学是一所历史悠久、声誉卓著的高等学府，始终秉承“求是创新”校训，坚定不移地打造更高质量、更加卓越、更受尊敬、更有梦想的大学。根据浙江大学事业发展需要，现公开招聘党政管理人员和专职辅导员。有关事项公告如下：

      一、招聘岗位
      
      计划招聘党政管理人员5名左右，要求博士毕业研究生；计划招聘专职辅导员20名左右，其中博士毕业研究生不少于10名。党政管理人员和专职辅导员均纳入学校事业编制。
      
      二、基本条件
      
      （一）中国共产党党员，政治素质好，具有较高的思想政治觉悟和政策理论水平，具有良好的道德品质、强烈的事业心和责任感。
      
      （二）具有硕士研究生及以上学历学位，需取得相应的学历学位证书；各学习阶段均为统招毕业并获相应学位；留学回国人员，需提供国（境）外学历学位相关证明材料。其中，博士研究生不超过32周岁（1990年1月1日以后出生），硕士研究生不超过28周岁（1994年1月1日以后出生）。
      
      （三）具有较强的组织协调能力、发现解决问题能力、语言文字表达能力和国际化视野，对全球高等教育动态有一定了解，热爱学生工作，善于做高校学生思想政治工作和党政管理工作。担任过学生骨干且工作业绩突出者优先，优秀博士研究生或有辅导员工作经历者优先。
      
      （四）品学兼优，获得过校级以上奖励或荣誉称号，具有较强的外语表达能力。
      
      （五）身心健康，能胜任岗位要求。
      
      三、选聘程序
      
      （一）网上报名
      
      
      本次选聘采取网上报名方式，不接受任何其他形式的报名。应聘人员可于2022年11月18日8:00至2022年11月26日17:00期间登录浙江大学招聘网站（报名入口：http://ehr.zju.edu.cn/vuejs/recruitment/position-detail.htm?id=N1749162086530809869）进行网上信息填报。登录招聘系统进行个人注册后，点击右上角“应聘”按钮，填写报名信息。信息填写应真实、准确、完整。凡弄虚作假者，一经查实，一律取消考试资格。
      
      相关证明材料请以扫描件的形式上传：包括本科起至最高学历的毕业证书、学位证书（应届毕业生还未取得学历学位的可上传院系盖章的《就业推荐报名表》；国（境）外学历者，还需上传教育部留学服务中心出具的学历学位认证），相关学生工作经历的证明（校级和院级需分开，并盖章），资质证书，获奖证书等其他材料。
      
      （二）资格审查
      
      浙江大学对应聘人员进行资格审查，择优确定入围考试环节的人员。应聘人员可于12月5日10:00起登录报名系统查看审核结果。
      
      （三）选聘考试
      
      考试采用笔试、面试相结合的方式。综合考试成绩、个人志愿等，确定拟录取人员和候补人员的考察名单。
      
      （四）体检和考察
      
      浙江大学统一组织体检和考察，重点考察思想政治表现、道德品质、心理素质、业务能力、工作实绩等。若有放弃或被取消体检、考察资格的，或体检、考察等环节出现不合格的，从考察名单中安排递补。
      
      （五）公示和聘用
      
      经考察合格的人员，确定为拟聘用人员，并在网上公示7个工作日。公示结果不影响聘用的，按规定程序办理聘用手续。拟聘用人员原则上应于2023年8月15日前报到，逾期一般不再保留聘用资格。对于优秀的博士毕业研究生，经研究同意，报到时间最迟不得晚于2024年1月15日。
      
      拟聘用人员办理入职手续时，应如实提供有关证明材料。凡弄虚作假的，一经发现取消选聘资格。已办理入职手续的，则按有关程序解除聘用合同。
      
      浙江大学统一安排拟聘用人员的工作岗位，并签订首聘期为一年的聘用合同。首聘期期满考核优秀者由学校统筹安排具体用人单位，并签订新一期聘用合同；考核未达到优秀者不再续聘。
      
      四、政策待遇
      
      （一）实施传帮带的导师制，由业务主管部门负责人和资深思政工作者、党政管理干部担任生涯导师，提供职业发展帮助和指导。
      
      （二）学校为党政管理人员制定专项培养计划，统一安排系统培训和轮岗历练，加强组织领导、资源投入和关心关爱，提供学习成长平台，强化综合素质提升。
      
      （三）专职辅导员实行职级、职称“双线晋升”通道，拓宽职业发展空间；党政管理人员可申请担任兼职辅导员，享受学校相关政策。
      
      （四）专职辅导员工作期间可以享受辅导员专项津贴，可申请免费入住学生公寓；在异地办学单位工作的，同时享受异地津贴，资源许可条件下可申请入住经济型教师公寓。党政管理人员可申请入住经济型教师公寓，在异地办学单位工作的，享受异地津贴。
      
      （五）表现特别优秀的专职辅导员，经研究同意，可申请攻读博士学位。对于教学工作能力突出的博士研究生学历辅导员，优先提供兼聘或转岗为思想政治理论课教师的机会。
      
      （六）设立专项工作研究课题，开展各类学术研讨活动，组织研究成果交流和评比。
      
      （七）培养培训纳入相应的教师和干部队伍培训整体规划，享受学校有关政策和待遇。
      
      （八）综合素质过硬、工作实绩突出者，优先提供职务晋升、挂职锻炼、境内外培训等机会，或根据组织安排和个人意愿择优推荐到校外重点地区重点领域的关键岗位任职。
      
      （九）对从省外来浙江大学参加笔试和面试的应聘人员给予一定的交通和住宿补贴。
      
      五、联系方式
      
      党政管理人员咨询：
      
      陈老师  0571-88982685  rsc@zju.edu.cn
      
      专职辅导员咨询：
      
      许老师 0571-88206058  xgb@zju.edu.cn
      
      网上填报技术咨询：
      
      陈老师 15258861647
      
       
      
       
      
                                  
      
      浙江大学人力资源处
      
      2022年11月17日
      `
    },
  ],
  
  //项目列表
  proData: [{
    id: '1',
    name: '项目一',
    category: 'Ⅰ类',
    desc: '本项目是一个普通项目',
    equp: 'ASE',
    purpose: '目的一',
    member: '张三',
    leader: '张三',
  }, {
    id: '2',
    name: '项目二',
    category: 'Ⅰ类',
    desc: '本项目是一个不普通项目',
    equp: 'AWM',
    purpose: '目的二',
    member: '李四、王五',
    leader: '李四',
  }, {
    id: '3',
    name: '项目三',
    category: 'Ⅱ类',
    desc: '本项目是一个省级项目',
    equp: 'AOPU',
    purpose: '目的三',
    member: '小明、小张、小亮',
    leader: '小明',
  }, {
    id: '4',
    name: '项目四',
    category: 'Ⅲ类',
    desc: '本项目是一个国家级项目',
    equp: 'OOPEE',
    purpose: '目的四',
    member: '王浩、张伟、李鹏',
    leader: '王浩',
  }],
  
  // 设备使用表
  equpsUse:[
    {
      equp: 'ASE',
      status: '开启',
      user: 'admin',
      org: '红雨伞',
      starttime: '2023-07-10 17:30:03',
      endtime: '2023-07-10 19:49:21'
    }, {
      equp: 'OEA',
      status: '开启',
      user: '关帅奇',
      org: '浙江大学嘉兴研究院',
      starttime: '2023-07-11 17:30:03',
      endtime: '2023-07-11 17:49:21'
    }, {
      equp: 'DTP',
      status: '开启',
      user: 'admin',
      org: '红雨伞',
      starttime: '2023-07-12 17:30:03',
      endtime: '2023-07-12 19:49:21'
    }, {
      equp: 'MKI',
      status: '开启',
      user: '小明',
      org: '华强科技有限公司',
      starttime: '2023-07-13 17:30:03',
      endtime: '2023-07-13 19:49:21'
    },
    {
      equp: 'OSD',
      status: '关闭',
      user: 'staff',
      org: '红雨伞',
      starttime: '2023-07-13 17:30:03',
      endtime: '2023-07-13 19:49:21'
    }
  ],

  // 设备状态表
  equpsStatus: [
    {
      equp: 'ASE',
      status: '不在使用中',
      expected: '未设置',
      statuslog: '正常工作'
    },
    {
      equp: 'OEA',
      status: '不在使用中',
      expected: '未设置',
      statuslog: '正式停止使用'
    },
    {
      equp: 'DTP',
      status: '限制使用',
      expected: '2023-07-14',
      statuslog: '情况良好'
    },
    {
      equp: 'MKI',
      status: '限制使用',
      expected: '2023-07-15',
      statuslog: '最大功率良好运行'
    },
    {
      equp: 'OSD',
      status: '正在使用',
      expected: '2023-07-14',
      statuslog: '设备下一次使用前需要保养'
    }
  ],

  //用户预约设备情况
  myBooks:[
    {
      equp: 'ASE',
      status: '良好',
      user: 'admin',
      start:'19:00',
      end:'20:00',
      cal:'日程规划',
      action:'已授权'
    },
    {
      equp: 'DTP',
      status: '良好',
      user: 'admin',
      start:'19:00',
      end:'20:00',
      cal:'日程规划',
      action:'已授权'
    }
  ],

  //设备预约信息
  equpsBooks:[
  {
    equpsBook_id:1,
    user_id:1,
    title:'分光光度计-血液葡萄糖的测定',
    date:new Date('2022-11-01'),
    content:'分光光度计-血液葡萄糖的测定内容'
  },
  {
    equpsBook_id:2,
    user_id:2,
    title:'离心机-植物组织中维生素c的测定',
    date:new Date('2022-11-02'),
    content:'离心机-植物组织中维生素c的测定内容'
  },
  {
    equpsBook_id:3,
    user_id:3,
    title:'电热恒温水浴锅-双缩脲法测动物蛋白含量',
    date:new Date('2022-11-03'),
    content:'电热恒温水浴锅-双缩脲法测动物蛋白含量内容'
  },
  {
    equpsBook_id:4,
    user_id:4,
    title:'离心机-牛奶中蛋白质的提取与鉴定',
    date:new Date('2022-11-04'),
    content:'离心机-牛奶中蛋白质的提取与鉴定内容'
  },
  {
    equpsBook_id:5,
    user_id:5,
    title:'移液器-植物组织中DNA的提取与鉴定',
    date:new Date('2022-11-05'),
    content:'移液器-植物组织中DNA的提取与鉴定内容'
  },
  ],

  //培训预约信息
  trainBooks:[
    {
      trainBook_id:1,
      user_id:1,
      title:'作业规程培训2',
      date:new Date('2022-11-01'),
    },
    {
      trainBook_id:2,
      user_id:2,
      title:'专业知识培训1',
      date:new Date('2022-11-02'),
    },
    {
      trainBook_id:3,
      user_id:3,
      title:'作业规程培训2',
      date:new Date('2022-11-03'),
    },
    {
      trainBook_id:4,
      user_id:4,
      title:'技能培训1',
      date:new Date('2022-11-04'),
    },
    {
      trainBook_id:5,
      user_id:5,
      title:'专业知识培训1',
      date:new Date('2022-11-05'),
    },
  ],

  //设备维修数据
  MaintainData:[
    {
      deviceMaintenanceId: 1,
      deviceId: 1,
      content: "设备1维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员1",
      remark: "好评",
    },
    {
      deviceMaintenanceId: 2,
      deviceId: 1,
      content: "设备1维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员2",
      remark: "好评",
    },
    {
      deviceMaintenanceId: 3,
      deviceId: 1,
      content: "设备3维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员1",
      remark: "好评",
    },
    {
      deviceMaintenanceId: 4,
      deviceId: 1,
      content: "设备3维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员1",
      remark: "好评",
    },
    {
      deviceMaintenanceId: 5,
      deviceId: 1,
      content: "设备3维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员1",
      remark: "好评",
    },
    {
      deviceMaintenanceId: 6,
      deviceId: 1,
      content: "设备3维修",
      expectedEndTime: "2023/3/12",
      startTime: "2023/2/10",
      actualEndTime: "2023/3/20",
      maintenanceStaff: "维修人员1",
      remark: "好评",
    },
  ],

  //设备工艺
  equCrafts:[
    {
      deviceName:'ASE',//设备名
      deviceType:'型号一',//设备型号
      size:'50in*50in',//设备尺寸
      weight:'500g',//设备重量
      power:'180W',//功率信息
    },
    {
      deviceName:'OEA',//设备名
      deviceType:'型号二',//设备型号
      size:'60in*60in',//设备尺寸
      weight:'400g',//设备重量
      power:'190W',//功率信息
    },
    {
      deviceName:'DTP',//设备名
      deviceType:'型号三',//设备型号
      size:'55in*55in',//设备尺寸
      weight:'550g',//设备重量
      power:'200W',//功率信息
    },
    {
      deviceName:'MKI',//设备名
      deviceType:'型号一',//设备型号
      size:'50in*50in',//设备尺寸
      weight:'500g',//设备重量
      power:'180W',//功率信息
    },
    {
      deviceName:'OSD',//设备名
      deviceType:'型号二',//设备型号
      size:'50in*50in',//设备尺寸
      weight:'500g',//设备重量
      power:'170W',//功率信息
    }
  ],
  
  //工艺参数
  craftParams:[
    {
      deviceName: 'ASE',
      temperature: '105 °F',
      pressure: '105 Pa',
      speed: '1000 转/秒',
      time: '2016-01-05',
    },
    {
      deviceName:'ASF',
      temperature: '102 °F',
      pressure: '102 Pa',
      speed: '1100 转/秒',
      time: '2016-01-10',
    },
    {
      deviceName:'ASG',
      temperature: '110 °F',
      pressure: '120 Pa',
      speed: '880 转/秒',
      time: '2016-02-01',
    },
    {
      deviceName:'ASP',
      temperature: '124 °F',
      pressure: '120 Pa',
      speed: '999 转/秒',
      time: '2016-03-04',
    }
  ],

  //商品参数
  goodsItems: [
    {
      number:'1',
      name:'商品1',
      pic:'good1.jpg',
      cate:'Ⅰ类',
      sku:'台',
      storage:'1000',
      price:'100￥',
      desc:'商品1相关描述'
    },
    {
      number:'2',
      name:'商品2',
      pic:'good2.jpg',
      cate:'Ⅰ类',
      sku:'台',
      storage:'2000',
      price:'120￥',
      desc:'商品2相关描述'
    },
    {
      number:'3',
      name:'商品3',
      pic:'good3.jpg',
      cate:'Ⅱ类',
      sku:'台',
      storage:'1500',
      price:'150￥',
      desc:'商品3相关描述'
    },
    {
      number:'4',
      name:'商品4',
      pic:'good4.jpg',
      cate:'Ⅲ类',
      sku:'台',
      storage:'2000',
      price:'160￥',
      desc:'商品4相关描述'
    },
  ]
}

const store = new Vuex.Store({
  state,
  plugins:[createPersistedState({  //将用户登录状态设为持久化状态
    storage:window.localStorage,
    reducer(state) {
      return {
        cu_role:state.cu_role //  只持久化cu_role状态，可以根据需求配置其他状态
      };
    }
  })],
  mutations,
  actions,
  getters
})
export default store