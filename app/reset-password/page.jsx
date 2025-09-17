import ResetPasswordClient from "./ResetPasswordClient";
export const metadata = { title: "รีเซ็ตรหัสผ่าน" };
export default async function Page({ searchParams }) {
  const token = searchParams?.token || "";
  return <ResetPasswordClient token={token} />;
}