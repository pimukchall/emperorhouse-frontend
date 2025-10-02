"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useDepartments } from "@/hooks/useDepartments";
import { DeptTable } from "@/components/admin/departments/DeptTable";
import { DeptForm } from "@/components/admin/departments/DeptForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function AdminDepartmentsPage() {
  const { items, loading, error, q, setQ, reload, upsert, remove } =
    useDepartments();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null); // { id?, code, nameTh, nameEn }

  const openNew = () => {
    setEditing({ code: "", nameTh: "", nameEn: "" });
    setDialogOpen(true);
  };
  const openEdit = (d) => {
    setEditing({
      id: d.id,
      code: d.code || "",
      nameTh: d.nameTh || "",
      nameEn: d.nameEn || "",
    });
    setDialogOpen(true);
  };

  async function onSubmit(values) {
    await upsert(values);
    setDialogOpen(false);
  }

  return (
    <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold">Departments</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            className="w-60"
            placeholder="ค้นหา department"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Button onClick={openNew} className="hidden sm:inline-flex">
            <Plus className="h-4 w-4 mr-2" /> สร้างใหม่
          </Button>
        </div>
      </header>

      <section className="rounded-xl border dark:border-neutral-800 overflow-hidden">
        <DeptTable
          items={items}
          loading={loading}
          onEdit={openEdit}
          onDelete={remove}
        />
      </section>

      {/* FAB (mobile) */}
      <Button
        onClick={openNew}
        className="sm:hidden fixed bottom-5 right-5 z-40 rounded-full h-12 w-12 p-0"
        size="icon"
      >
        <Plus className="h-5 w-5" />
      </Button>

      {!!error && <div className="text-red-500 text-sm">{error}</div>}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editing?.id ? `แก้ไข #${editing?.id}` : "สร้างใหม่"}
            </DialogTitle>
          </DialogHeader>

          {editing && (
            <DeptForm
              key={editing?.id ?? "new"}
              defaultValues={editing}
              onSubmit={onSubmit}
            />
          )}

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button form="dept-form">บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
