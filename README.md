# fastify-backend-typescript

### 🟢 Description (อธิบายเหตุผล)
❗เหตุผลทำไมถึงใช้ Fastify แทนการใช้ Express

### - Fastify
- ✔️ การอ่าน Route ค่อนข้างง่าย 
- ✔️ รองรับการ Request Life Cycle
- ✔️ รองรับการเขียน OOP
- ✔️ รองรับการเขียน Generic
- ✔️ สามารถต่อยอดกับ Framework hapi
- ✔️ ยืดหยุ่น ปรับแต่งองค์ประกอบได้
- ✔️ รองรับการทำ Socket and Stream Video
- ✔️ tutorial อ่านง่ายและมีตัวอย่าง
- ✔️ สามารถแตกเป็น Microservice ได้ในอนาคต
- ✔️ Payload ค่อนข้างจัดการง่ายและแยกเป็นส่วน
- ❌ ซับซ้อนน้อยกว่า LoopBack
- ❌ เหมาะสำหรับ BackEnd ที่มีพื้นฐาน NodeJS

---

### How to Use main
เป็นส่วนประกอบการทำ Server Run Fastif (เบื้องต้น เน้น POC ในการทดลองเท่านั้น)

### How to Use controller
เป็นส่วนประกอบการ จัดการ Business Script ภายใต้การทำงานของ Routes

### How to Use router
เป็นส่วนประกอบการ จัดการ Path ที่วิ่งเข้ามา โดยสามารถเขียน Middleware validations ตรวจสอบได้

### How to Use transactions
เป็นส่วนประกอบการ จัดการ ธุรกรรมของการติดต่อ Database ยกตัวอย่างเช่น การโอนเงินเป็นต้น

### How to Use repository
เป็นส่วนประกอบการ จัดการ การติดต่อสื่อสารและ Logic Database

### How to Use database.ts
เป็นส่วนประกอบการทำ Database Config สามารถต่อยอดตามที่ต้องการได้

---
### Install Eslint
```
    npm install eslint --save-dev
    npm init @eslint/config
        -  How would you like to use ESLint? : To check syntax, find problems , and enforce code style
        -  What type of modules does your project use? : JavaScript
        -  Which framework does your project use? : None of these
        -  Does your project use TypeScript? : Yes
        -  Where does your code run? : Node
        -  How would you like to define a style for your project? : Use a popular style guide
        -  Which style guide do you want to follow? : google
        -  What format do you want your config file to be in? : JSON
        -  Would you like to install them now? : Yes
        -  Which package manager do you want to use? : yarn
```

### Install Global 
```
    npm install -g typescript 
    npm install -g ts-node 
```

### Docker Setup
```
    docker-compose  -f ./postgres/docker-compose.yml up -d    
    docker-compose  -f ./postgres/docker-compose.yml down
```

### BackEnd Setup
```
    yarn dev || yarn start
```

---
### NodeJS Version
- v14.17.3 + {node} 
- 6.14.13 + {npm}
- 1.22.5 + {yarn}
