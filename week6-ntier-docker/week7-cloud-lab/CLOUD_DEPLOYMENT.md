# Cloud Deployment Analysis
## ENGSE207 - Week 7 Lab

**ชื่อ-นามสกุล:** พชร จันทร์ยวง
**รหัสนักศึกษา:** 67543210039-3

### 1.1 URLs ของระบบที่ Deploy

| Service | URL |
|---------|-----|
| Frontend | https://independent-charm-production-ffa6.up.railway.app/ |
| Backend API |https://week6-ntier-docker-production-fa5b.up.railway.app/api/tasks |
| Database | (Internal - ไม่มี public URL) |

### 1.2 Screenshot หลักฐาน (5 รูป)

1. [ ] Railway Dashboard แสดง 3 Services
<img width="1920" height="866" alt="3125" src="https://github.com/user-attachments/assets/12806095-5198-44b5-b79d-4104aff3ff4f" />


2.[ ] Frontend ทำงานบน Browser
 <img width="1920" height="1080" alt="Screenshot 2026-02-09 200412" src="https://github.com/user-attachments/assets/c39aeb33-415c-436d-9edb-99e89f76609d" />

3. [ ] API Health check response
<img width="1920" height="869" alt="Screenshot 2026-02-09 200443" src="https://github.com/user-attachments/assets/bf0cecad-f1c3-428a-b604-931967544519" />
<img width="1915" height="727" alt="Screenshot 2026-02-09 220749" src="https://github.com/user-attachments/assets/d2bd4852-476d-40e9-875d-1d3ba54c8079" />


4. [ ] Logs แสดง requests
<img width="1920" height="869" alt="3123" src="https://github.com/user-attachments/assets/6971ea57-ce5a-48d5-bda9-1c63710c79c1" />


5. [ ] Metrics แสดง CPU/Memory
<img width="1920" height="852" alt="3121" src="https://github.com/user-attachments/assets/efd8a225-de1f-4f3d-82bb-aaeadf5cc30a" />

---

## ส่วนที่ 2: เปรียบเทียบ Docker vs Cloud (15 คะแนน)

### 2.1 ความแตกต่างที่สังเกตเห็น (10 คะแนน)

| ด้าน | Docker (Week 6) | Railway (Week 7) |
|------|-----------------|------------------|
| เวลา Deploy | ต้อง build และ run เอง ใช้เวลานานกว่า | Deploy อัตโนมัติจาก Git เร็ว |
| การตั้งค่า Network | ต้องตั้ง port และ network เอง | จัดการให้โดยอัตโนมัติ |
| การจัดการ ENV | ใช้ไฟล์ `.env` ในเครื่อง | ตั้งค่าใน Variables tab |
| การดู Logs | ดูผ่าน terminal | ดูได้จาก Dashboard |
| การ Scale | ต้อง config เอง | รองรับการ scale ง่ายกว่า |

---
### 2.2 ข้อดี/ข้อเสีย ของแต่ละแบบ (5 คะแนน)

**Docker Local:**
- ข้อดี: ควบคุมระบบได้ทั้งหมดและเหมาะกับการพัฒนา
- ข้อเสีย: ต้องตั้งค่าหลายอย่างและไม่สะดวกสำหรับ production

**Railway Cloud:**
- ข้อดี: Deployง่ายรวดเร็วและมีDashboardให้ดูLogs/Metrics
- ข้อเสีย: ขึ้นกับCloud Providerและมีข้อจำกัดตามPlanและงบประมานในการใช้

---
## ส่วนที่ 3: Cloud Service Models (10 คะแนน)

### 3.1 Railway เป็น Service Model แบบไหน?

[ ] IaaS   [x] PaaS   [ ] SaaS  

เพราะ: Railway จัดการ Infrastructure, Network และ Runtime ให้ ผู้พัฒนาโฟกัสที่โค้ดและการ deploy เท่านั้น

---
### 3.2 ถ้าใช้ IaaS (เช่น AWS EC2) ต้องทำอะไรเพิ่มอีก? (ยกตัวอย่าง 4 ข้อ)

1. ตั้งค่าและดูแล Server (OS, Security)
2. ติดตั้ง Runtime เช่น Node.js, Docker
3. ตั้งค่า Network และ Firewall
4. จัดการ Scaling และ Monitoring เอง

---
## ส่วนที่ 4: 12-Factor App Analysis (15 คะแนน)

### 4.1 Factors ที่เห็นจาก Lab (10 คะแนน)

| Factor | เห็นจากไหน? | ทำไมสำคัญ? |
|--------|-------------|-------------|
| Factor 3: Config | Variables tab | แยก config ออกจาก code ทำให้ปลอดภัย |
| Factor 6: Processes | Railway service run | แอปรันแบบ stateless |
| Factor 7: Port Binding | Railway auto expose port | รองรับ cloud-native |
| Factor 10: Dev/Prod Parity | ใช้ environment ใกล้เคียงกัน | ลดปัญหาต่าง environment |
| Factor 11: Logs | Logs tab | ช่วย debug และ monitor ระบบ |

---

### 4.2 ถ้าไม่ทำตาม 12-Factor จะมีปัญหาอะไร? (5 คะแนน)

**ปัญหา 1:** ถ้าไม่ทำตาม Factor 3 (Config)  
- สิ่งที่จะเกิด: ข้อมูลสำคัญอาจรั่ว และเปลี่ยน environment ยาก

**ปัญหา 2:** ถ้าไม่ทำตาม Factor 11 (Logs)  
- สิ่งที่จะเกิด: ตรวจสอบปัญหาใน production ได้ยาก

---
## ส่วนที่ 5: Reflection (10 คะแนน)

### 5.1 สิ่งที่เรียนรู้จาก Lab นี้

1. เข้าใจขั้นตอนการ deploy ระบบขึ้น Cloud
2. เห็นความแตกต่างระหว่าง Docker local กับ PaaS
3. เรียนรู้การใช้ Logs และ Metrics เพื่อ monitor ระบบ
---

### 5.2 ความท้าทาย/ปัญหาที่พบ และวิธีแก้ไข

ปัญหา: ต้แการปรับพื้นหลังให้น่าสนใจ น่าใช้แต่ไฟล์.scssที่ได้ไปหาาจากในเน็ตนั้นแก้erorr
การใช้งาน Sass (SCSS) ใน frontend ไม่สามารถ compile เป็น CSS ได้ และ VS Code แสดง error ตลอด
เช่น error expected ";", no such file or directory, และไฟล์ .scss ไม่ถูกพบตาม path ที่กำหนด
รวมถึงไม่สามารถติดตั้ง sass แบบ global ได้เนื่องจากปัญหา permission (EACCES)
วิธีแก้: ใช้ npx sass แทน global install และจัด path ไฟล์ SCSS → CSS ให้ถูกต้องก่อน deploy


ปัญหา: การตั้งค่า environment และ path ของ frontend/backend  
วิธีแก้: ตรวจสอบ config และใช้ Variables ใน Railway


ปัญหา:

การเชื่อมต่อระหว่าง Frontend และ Backend หลังจาก Deploy ขึ้น Railway ไม่ทำงานตามที่คาดไว้
เช่น เรียก API แล้วขึ้น error (Cannot DELETE /api/tasks/:id, ECONNREFUSED) และ frontend ไม่สามารถลบหรืออัปเดตข้อมูลได้

วิธีแก้:
ตรวจสอบ path ของ API และ HTTP method ให้ตรงกันระหว่าง frontend และ backend
รวมถึงตั้งค่า Base URL ของ API ผ่านไฟล์ config.js และ Variables ของ Railway
หลังจากแก้ไข route และ redeploy ระบบใหม่ จึงสามารถเรียกใช้งาน API ได้ถูกต้อง


---

### 5.3 จะเลือกใช้ Docker หรือ Cloud เมื่อไหร่?

- ใช้ Docker เมื่อ: พัฒนาและทดสอบระบบในเครื่อง
- ใช้ Cloud (PaaS) เมื่อ: ต้อง deploy ให้ใช้งานจริงและดูแลระบบง่าย
