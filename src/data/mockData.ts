/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ITTicket, Announcement, KBArticle, AppFolder, EntraUser } from '../types';

export const mockUsers: EntraUser[] = [
  {
    name: "กิตติศักดิ์ ชัยชนะ",
    email: "krittisak.sales@company.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    jobTitle: "Senior Sales Executive",
    department: "แผนกฝ่ายขายและบริการลูกค้า (Sales & Customer Relations)",
    officeLocation: "อาคารหลัก ชั้น 4, สำนักงานใหญ่ กรุงเทพฯ",
    tokenExpired: false,
    role: "Employee"
  },
  {
    name: "สมชาย รักบริการ",
    email: "somchai.it@company.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    jobTitle: "IT Support Specialist",
    department: "เทคโนโลยีสารสนเทศและการดูแลผู้ใช้งาน (IT Support Helpdesk)",
    officeLocation: "อาคารหลัก ชั้น 12, สำนักงานใหญ่ กรุงเทพฯ",
    tokenExpired: false,
    role: "IT_Support"
  },
  {
    name: "สุชาดา งามกมล",
    email: "suchada.admin@company.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    jobTitle: "IT Director & System Administrator",
    department: "ฝ่ายบริหารระบบเครือข่ายและโครงสร้างพื้นฐานไอที (IT Infrastructure Dept.)",
    officeLocation: "อาคารหลัก ชั้น 12, สำนักงานใหญ่ กรุงเทพฯ",
    tokenExpired: false,
    role: "IT_Admin"
  }
];

export const mockEntraUser: EntraUser = mockUsers[0];

export const initialTickets: ITTicket[] = [
  {
    id: "IT-2026-001",
    title: "ไม่สามารถเชื่อมต่อ VPN จากที่บ้านได้",
    category: "Network & VPN",
    priority: "High",
    description: "ระบบรายงานพอร์ต 443 ปิดกั้น และขึ้นแจ้งเตือน 'TLS handshake failed' หลังจากพยายามอัปเกรดระบบปฏิบัติการ macOS ล่าสุด",
    status: "In Progress",
    requesterEmail: "krittisak.c2007@gmail.com",
    requesterName: "กิตติศักดิ์ ชัยชนะ",
    createdDate: "2026-06-11 09:30",
    assignedTo: "สมชาย รักบริการ (IT Network Admin)",
    comment: "กำลังตรวจสอบการกำหนดนโยบายความปลอดภัยบนคอนโทรลเลอร์ Fortigate"
  },
  {
    id: "IT-2026-002",
    title: "ขออนุมัติใช้งานไลเซนส์ Microsoft Project Plan 3",
    category: "Software & License",
    priority: "Medium",
    description: "ต้องการใช้งานเพื่อบริหารจัดการแผนงานโครงการจัดส่งสินค้าและพัฒนาระบบคลังสินค้าอัจฉริยะ (Smart Warehouse System Group)",
    status: "New",
    requesterEmail: "krittisak.c2007@gmail.com",
    requesterName: "กิตติศักดิ์ ชัยชนะ",
    createdDate: "2026-06-12 08:15",
    assignedTo: "วิชาญ เรืองเดช (IT License Desk)"
  },
  {
    id: "IT-2026-003",
    title: "จอมอนิเตอร์เสีย ไฟไม่เข้าเครื่อง",
    category: "Hardware Desk",
    priority: "Low",
    description: "จอภายนอกยี่ห้อ Dell ขนาด 27 นิ้ว รหัสสินทรัพย์ IT-EQ-4421 ไฟไม่กระพริบเลย คาดว่าหม้อแปลงจ่ายไฟภายนอก (Adapter) เสียหาย",
    status: "Resolved",
    requesterEmail: "krittisak.c2007@gmail.com",
    requesterName: "กิตติศักดิ์ ชัยชนะ",
    createdDate: "2026-06-10 14:00",
    assignedTo: "เกศรา เพ็ญดี (Hardware Support)",
    comment: "เปลี่ยนอะแดปเตอร์ใหม่เรียบร้อยแล้ว พนักงานยืนยันการขึ้นภาพตามปกติ"
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "AN-001",
    title: "🚨 ประกาศด่วน: ปรับปรุงความปลอดภัยระบบจดหมายอิเล็กทรอนิกส์องค์กร (MFA Update)",
    body: "ทางฝ่ายไอทีจะทำการบังคับใช้นโยบายความปลอดภัยสูงสุด โดยขอให้พนักงานทุกคนอัปเดตระบบ Authenticator App ในโทรศัพท์มือถือ เพื่อเตรียมพร้อมรับนโยบาย Passwordless ภายในวันที่ 20 มิถุนายนนี้",
    category: "Security",
    publishedDate: "2026-06-11",
    author: "แผนกโครงสร้างพื้นฐานความปลอดภัยข้อมูลองค์กร (IT Security Team)",
    urgent: true
  },
  {
    id: "AN-002",
    title: "🎉 เปิดใช้งานระบบเบิกค่ารักษาพยาบาลรูปแบบใหม่ผ่านช่องทาง Workday Portal",
    body: "ฝ่ายทรัพยากรบุคคล (HR) ยินดีต้อนรับพนักงานสู่มิติใหม่ของการยื่นเคลม โดยไม่ต้องใช้เอกสารกระดาษอีกต่อไป เพียงถ่ายภาพใบเสร็จและอัปโหลดลงในระบบเบิกจ่าย เงินจะโอนเข้าบัญชีเงินเดือนรอบถัดไปทันที",
    category: "HR News",
    publishedDate: "2026-06-10",
    author: "แผนกผลประโยชน์พนักงานและสวัสดิการ (People & Culture Department)",
    urgent: false
  },
  {
    id: "AN-003",
    title: "💻 การส่งคืนและอัปเดตคอมพิวเตอร์พกพารอบปีงบประมาณ 2026 (IT Hardware Refresh)",
    body: "สำหรับพนักงานที่ใช้อุปกรณ์ในกลุ่มรหัสสินทรัพย์ขึ้นต้นด้วย 2021 กรุณาสำรองข้อมูลภายนอกและนำเครื่องมาเปลี่ยนเป็นโน้ตบุ๊กประสิทธิภาพสูงเครื่องใหม่ได้ที่ห้อง IT Service Desk ชั้น 12",
    category: "IT Update",
    publishedDate: "2026-06-08",
    author: "แผนกสนับสนุนเทคนิคไอที (IT Support Center)",
    urgent: false
  }
];

export const mockKBArticles: KBArticle[] = [
  {
    id: "KB-101",
    title: "วิธีการเปิดใช้งานและเชื่อมต่อ VPN องค์กรจากภายนอกสำนักงาน (FortiClient Guide)",
    category: "Network & VPN",
    content: [
      "1. ดาวน์โหลดโปรแกรม FortiClient VPN Client จาก IT Software Directory ของบริษัท",
      "2. เลือกการเชื่อมต่อรูปแบบ SSL-VPN",
      "3. ใส่ชื่อโฮสต์ของเซิร์ฟเวอร์สำนักงานปลายทาง: vpn.company.com พอร์ต 443",
      "4. ติ๊กเลือกระบบ 'Single Sign-On (SSO)' จากนั้นคลิกปุ่มเชื่อมต่อ",
      "5. ล็อกอินผ่านหน้าต่าง Microsoft Entra ID ของส่วนกลาง และยินยันตัวตนใน Microsoft Authenticator บนโทรศัพท์มือถือ"
    ],
    views: 1245,
    likes: 312
  },
  {
    id: "KB-102",
    title: "แนวทางการกู้คืนและสิทธิ์แก้ไขข้อมูลในไฟล์แชร์สำหรับแผนกบน SharePoint Online",
    category: "SharePoint & OneDrive",
    content: [
      "หากไม่เห็นแฟ้มร่วมประสงค์ใช้งาน ให้ติดต่อผ่าน Owner ลิสต์เพื่อดึงเชิญ",
      "1. คลิกเลือกปุ่ม 'SharePoint' ในแถบเมนูข้าง Office 365 ของคุณ",
      "2. เข้าสู่ 'สถานีงานส่วนบุคคล หรือไซต์แผนกของคุณ (Department Site)'",
      "3. สามารถกู้คืนเอกสารที่หายไปได้ภายใน 93 วันจากการเข้าไปดูที่ถังขยะ 'Recycle Bin' ท้ายคอนเทนต์ไซต์",
      "4. การตั้งค่าการแก้ไขร่วม (Co-authoring) สามารถแชร์ลิงก์แบบระบุผู้ใช้ภายใน (People in Company) ได้ทันที"
    ],
    views: 890,
    likes: 198
  },
  {
    id: "KB-103",
    title: "ขั้นตอนการแก้ไขโปรไฟล์ การจัดการผู้ติดต่อยามฉุกเฉิน และสมุดรายชื่อบน Workday",
    category: "Workday Security",
    content: [
      "1. เข้าใช้งาน Workday ผ่าน Microsoft APP Directory",
      "2. คลิกที่รูปภาพโปรไฟล์ของคุณที่มุมขวาบนของหน้าจอ เลือก 'View Profile'",
      "3. คลิกปุ่ม 'Contact' บนแถบนำทางซ้ายมือ และทำเครื่องหมายการอัปเดตช่องที่แก้ไข",
      "4. ระบุเบอร์โทรศัพท์มือถือสำรองและระบุชื่อความสัมพันธ์ของผู้ติดต่อกรณีฉุกเฉินอย่างเด่นชัด",
      "5. กดปุ่ม 'Submit' เพื่อส่งต่อให้ฝ่ายบุคคลอนุมัติเข้าระบบฐานข้อมูลส่วนกลาง"
    ],
    views: 532,
    likes: 87
  }
];

export const mockApps: AppFolder[] = [
  {
    id: "APP-01",
    title: "Outlook Web Client",
    url: "https://outlook.office.com",
    category: "Workspace",
    description: "ระบบจดหมายอิเล็กทรอนิกส์และปฏิทินนัดหมายหลักขององค์กร"
  },
  {
    id: "APP-02",
    title: "SharePoint Sites & Portal",
    url: "https://company.sharepoint.com",
    category: "Workspace",
    description: "ระบบจัดเก็บเอกสารทางการ แหล่งข่าวสารคลังข้อมูลไซด์กิจกรรมสาขา"
  },
  {
    id: "APP-03",
    title: "Microsoft Teams Desktop/Web",
    url: "https://teams.microsoft.com",
    category: "Workspace",
    description: "ซอฟต์แวร์สื่อสาร ประชุมกลุ่ม และทำงานร่วมกันในทีมแบบบูรณาการ"
  },
  {
    id: "APP-04",
    title: "Workday Human Capital Management",
    url: "https://wd3.myworkday.com",
    category: "HR",
    description: "แพลตฟอร์มบริหารข้อมูลพนักงาน สลิปเงินเดือน สิทธิ์วันหยุด และสวัสดิการ"
  },
  {
    id: "APP-05",
    title: "Power BI Analytics Hub",
    url: "https://app.powerbi.com",
    category: "Finance",
    description: "แดชบอร์ดข้อมูลสถิติ ดัชนีผลกำไรการขนส่ง และวิเคราะห์ตัวชี้วัดภายใน"
  },
  {
    id: "APP-06",
    title: "IT Support Self-Service Suite",
    url: "/it-self-service",
    category: "IT Portal",
    description: "ระบบคำร้องความต้องการไอที การเปิดขอเครื่องมืออุปกรณ์เสริม"
  }
];

export const sharepointSchemaInfo = [
  {
    listName: "IT_Tickets",
    description: "จัดเก็บรายการคำขอรับบริการและการช่วยเหลือทางเทคนิคทั้งหมด (เชื่อมโยงกับฟอร์มแจ้งซ่อม)",
    columns: [
      { name: "ID", type: "Counter / Autonumber", desc: "รหัสคำขออ้างอิง" },
      { name: "Title", type: "Single line of text", desc: "ชื่อหัวเรื่องคำร้องขอช่วยเหลือ" },
      { name: "Category", type: "Choice (Dropdown list)", desc: "หมวดหมู่งานหลัก เช่น Network, Software, Hardware" },
      { name: "Priority", type: "Choice (Low, Medium, High, Critical)", desc: "ระดับความเกี่ยวข้องเร่งด่วนของสถานการณ์" },
      { name: "Description", type: "Multiple lines of text", desc: "รายละเอียดอาการชำรุดหรือคำอธิบายแวดล้อม" },
      { name: "Status", type: "Choice (New, In Progress, Pending Info, Resolved, Closed)", desc: "สถานะการปฏิบัติงานช่วยเหลือ" },
      { name: "RequesterEmail", type: "Single line of text / Person", desc: "อีเมลของผู้ยื่นคำร้องผ่านการถอดรหัส Entra ID SSO" },
      { name: "RequesterName", type: "Single line of text / Person", desc: "ชื่อไทยเต็มของผู้ส่งคำร้อง" },
      { name: "AssignedTo", type: "Person or Group", desc: "เจ้าหน้าที่ผู้ดูแลเคสแก้ไขตามทักษะไอที" }
    ]
  },
  {
    listName: "Announcements",
    description: "คลังข้อมูลเผยแพร่ประกาศข่าวสารภายในระดับฝ่ายไอทีและทรัพยากรบุคคล",
    columns: [
      { name: "ID", type: "Counter", desc: "คีย์ประจำประกาศหลัก" },
      { name: "Title", type: "Single line of text", desc: "ชื่อพาดพิงหัวข่าวเด่น" },
      { name: "Body", type: "Multiple lines of text (HTML enabled)", desc: "รายละเอียดเต็มของประกาศประชาสัมพันธ์" },
      { name: "Category", type: "Choice (IT Update, HR News, General, Security)", desc: "เป้าหมายกลุ่มสาระสำคัญ" },
      { name: "PublishedDate", type: "Date and Time", desc: "วันที่มีมติอนุมัติเผยแพร่ให้พนักงาน" },
      { name: "Urgent", type: "Yes/No (Boolean)", desc: "ทำระดับแจ้งเตือนด่วนสีแดงแถบด้านพอร์ทัล" }
    ]
  },
  {
    listName: "KnowledgeBase",
    description: "ฐานข้อมูลจัดเก็บคู่มือกู้คืนข้อมูลการใช้งาน และถามตอบที่พบบ่อย (FAQs)",
    columns: [
      { name: "ID", type: "Counter", desc: "ดัชนีจำแนกขั้นตอนแก้ไข" },
      { name: "Title", type: "Single line of text", desc: "ชื่อคำถามพบบ่อยหรือคู่มือแก้ปัญหาไอที" },
      { name: "Category", type: "Choice", desc: "ระบบโครงสร้างไอทีที่เกี่ยวข้อง" },
      { name: "Content", type: "Multiple lines of text (RTE / JSON-split)", desc: "ขั้นตอนเรียงความลำดับขั้นตอนการปฏิบัติ" },
      { name: "Views", type: "Number", desc: "ยอดการรับชมเพื่อวิเคราะห์คุณค่างานบริการตนเอง" }
    ]
  }
];
