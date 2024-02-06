import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Item from "./components/Item";
import AddForm from "./components/AddForm";
function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [title, setTitle] = useState("");
  // State ที่ใช้แก้ไขข้อมูล
  const [editID, setEditID] = useState(null);
  const [theme, setTheme] = useState("light");
  // รูปแบบที่ 1
  // เรียกใช้ useEffect ทุกการกระทำในหน้าเว็บ
  // useEffect(() => {
  //   console.log("Run it useEffect in App Components 1");
  // }, );

  // รูปแบบที่ 2
  // เรียกใช้ useEffect แค่ครั้งเดียวเมื่อมีการรันหน้าเว็บขึ้นมา
  // React18 โหมดพัฒนาจะเรียกใช้งาน 2 ครั้งเป็นปกติ แต่ถ้า build app แล้วจะเหลือแค่ 1 ครั้ง
  // useEffect(() => {
  //   console.log("Run it useEffect in App Components 2");
  // }, []);

  // รูปแบบที่ 3
  // มีการเปลี่ยนแปลงค่าใน tasks จะเรียกใช้ useEffect ให้เรา
  useEffect(() => {
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }, [tasks]);

  // function ส่วนลบข้อมูล
  // 1.const result = tasks.filter((list) => list.id !== id);
  // ใช้ filter method บน array tasks เพื่อสร้าง array ใหม่ที่มี tasks ที่มี ID ต่างกับ ID ที่ถูกส่งเข้ามา.
  // list คือแต่ละ element ใน array tasks.
  // list.id !== id คือเงื่อนไขที่ใช้ในการกรอง tasks ที่มี ID ต่างกับ ID ที่ต้องการลบ.

  // 2.setTasks(result);:
  // ใช้ setTasks (ฟังก์ชันที่ใช้ในการอัพเดท state tasks ใน React) เพื่อกำหนดค่าให้กับ state tasks ด้วย array ที่ได้หลังจากการกรอง.
  // นั่นคือ, tasks ใน state tasks จะถูกอัพเดทเป็น tasks ที่ไม่มี ID ตรงกับ ID ที่ถูกส่งมา.

  // เมื่อฟังก์ชัน deleteTask ถูกเรียก, มันจะทำการลบ task ที่มี ID ตรงกับ ID ที่ถูกส่งมา, และอัพเดท state tasks ด้วย tasks ที่เหลือ. การใช้ filter ทำให้เราได้ array ใหม่ที่มีเฉพาะ tasks ที่ไม่ตรงกับ ID ที่ต้องการลบ.

  function deleteTask(id) {
    const result = tasks.filter((list) => list.id !== id);
    setTasks(result);
  }

  // function ส่วนแก้ไขข้อมูล

  // 1.setEditID(id);:
  // 1.1 ใช้ setEditID (ฟังก์ชันที่ใช้ในการอัพเดท state editID ใน React) เพื่อกำหนดค่า id ลงใน state editID.
  // 1.2 นั่นคือ, เมื่อเราเรียกใช้ editTask แล้วเราจะได้ id นี้ไปใช้งานต่อในการแก้ไข.

  // 2.const editTask = tasks.find((item) => item.id === id);
  // 2.1 ใช้ find method บน array tasks เพื่อค้นหา task ที่มี id ตรงกับ id ที่ถูกส่งมา.
  // 2.2 item คือแต่ละ element ใน array tasks.
  // 2.3 item.id === id คือเงื่อนไขที่ใช้ในการค้นหา task ที่มี id ตรงกับ id ที่ถูกส่งมา.

  // 3.setTitle(editTask.title);:
  // 3.1 ใช้ setTitle (ฟังก์ชันที่ใช้ในการอัพเดท state title ใน React) เพื่อกำหนดค่า editTask.title ลงใน state title.
  // 3.2 editTask.title คือ title ของ task ที่ถูกค้นหา.

  // ดังนั้น, เมื่อเราเรียกใช้ editTask โดยส่ง id เข้ามา, ฟังก์ชันนี้จะทำการ:
  // กำหนดค่า id ลงใน state editID.
  // ค้นหา task ที่มี id ตรงกับ id ที่ถูกส่งมาใน array tasks.
  // กำหนดค่า title ของ task ที่ถูกค้นหาลงใน state title.
  // นั่นคือ, เราจะได้รับข้อมูลของ task ที่ต้องการแก้ไขและนำมาใช้ในการแสดงบนฟอร์มหรือในการปรับปรุงข้อมูลต่อไป.

  function editTask(id) {
    setEditID(id);
    const editTask = tasks.find((item) => item.id === id);
    setTitle(editTask.title);
  }

  // function ส่วนบันทึกข้อมูล

  // 1.event.preventDefault();:
  // 1.1 บรรทัดนี้ใช้เพื่อป้องกันการโหลดหน้าเว็บใหม่ (preventing the default behavior) เมื่อ form ถูก submit โดยทำให้ไม่ต้อง refresh หน้าเว็บ.

  // 2. if (!title) { alert("กรุณาป้อนข้อมูล"); }:
  // 2.1 ตรวจสอบว่าตัวแปร title ไม่มีค่าหรือเป็นค่าว่าง (falsy) หรือไม่.
  // 2.2 หาก title เป็นค่าว่าง, จะแสดง Alert เพื่อแจ้งให้ผู้ใช้ป้อนข้อมูล.

  // 3.else if (editID) { ... }:
  // 3.1 ถ้า editID มีค่า (ไม่เป็น null หรือ undefined), แสดงว่าเราอยู่ในโหมดการแก้ไข task ที่มี editID นี้.
  // 3.2 ดังนั้น, เราจะทำการอัปเดต task ที่มี id เท่ากับ editID ด้วยข้อมูลใหม่ที่ผู้ใช้ป้อน.
  // 3.3 อัปเดตข้อมูลด้วยการใช้ map method บน array tasks โดยเปลี่ยน task ที่ตรงกับ editID ด้วยข้อมูลใหม่.

  // 4.const newTask = { id: Math.floor(Math.random() * 1000), title: title, };:
  // 4.1 ถ้าไม่ได้อยู่ในโหมดการแก้ไข, แสดงว่าเรากำลังเพิ่ม task ใหม่.
  // 4.2 สร้าง object newTask ที่มี properties id และ title.
  // 4.3 id ถูกกำหนดค่าเป็นเลขสุ่มจากการคำนวณ Math.random() และทำการปัดเศษลงด้วย Math.floor() โดยคูณด้วย 1000 เพื่อให้ได้เลขจำนวนเต็ม.

  // 5.setTasks([...tasks, newTask]);:
  // 5.1 ถ้าไม่ได้อยู่ในโหมดการแก้ไข, ใช้ setTasks เพื่อเพิ่ม newTask ลงใน array tasks.
  // 5.2 ...tasks ใน array literal คือการ spread ข้อมูลทุกตัวใน array tasks ที่มีอยู่.

  // 6.setTitle("");:
  // 6.1 เคลียร์ค่าของ title เพื่อเตรียมรับข้อมูล task ถัดไป.

  // 7.setEditID(null);:
  // 7.1 เคลียร์ค่าของ editID เพื่อเอาไว้ในกรณีที่กำลังแก้ไขและต้องการกลับไปทำงานในโหมดเพิ่ม task ใหม่.

  // ดังนั้น, ฟังก์ชันนี้ทำหน้าที่จัดการกับกรณีทั้งหมด ทั้งการเพิ่ม task ใหม่, การแก้ไข task ที่มีอยู่, และการแจ้งเตือนในกรณีที่ผู้ใช้ไม่ได้ป้อนข้อมูล.
  function saveTask(event) {
    event.preventDefault();

    if (!title) {
      alert("กรุณาป้อนข้อมูล");
    } else if (editID) {
      // อัปเดตข้อมูล
      // Map array มาเก็บไว้ใน item แล้วนำไปใช้งาน
      const updateTask = tasks.map((item) => {
        // รายการใดมีรหัสตรงกับรหัสแก้ไข
        if (item.id === editID) {
          // อ้างอิง title(state): title (นำค่าตัวให่ม่ไปเก็บใน) state title)
          return { ...item, title: title };
        }
        return item;
      });
      setTasks(updateTask);
      setEditID(null);
      setTitle("");
    } else {
      const newTask = {
        //เพิ่มรายการใหม่
        id: Math.floor(Math.random() * 1000),
        title: title,
      };
      setTasks([...tasks, newTask]);
      setTitle("");
    }
  }

  return (
    <div className={"App "+theme}>
      <Header theme={theme} setTheme={setTheme}/>
      <div className="container">
        {/* การกระจาย props ไปทำงานในแต่ละ components */}
        <AddForm
          title={title}
          setTitle={setTitle}
          saveTask={saveTask}
          editID={editID}
        />
        <section>
          {tasks.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
