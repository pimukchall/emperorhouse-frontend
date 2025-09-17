// หน้า server component แบบเรียบง่าย — ให้ Client ตัดสินใจ redirect เอง
import LoginClient from "./LoginClient";

export const metadata = {
  title: "เข้าสู่ระบบ",
};

export default async function Page() {
  return <LoginClient />;
}
