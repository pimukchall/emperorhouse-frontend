"use client";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeptForm({ defaultValues, onSubmit }) {
  const [values, setValues] = useState(defaultValues);
  const [submitting, setSubmitting] = useState(false);
  const formId = useId();

  useEffect(() => setValues(defaultValues), [defaultValues]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!values.code?.trim()) return alert("กรุณากรอก Code");
    if (!values.nameTh?.trim()) return alert("กรุณากรอกชื่อ (TH)");
    setSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form id="dept-form" onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="id" value={values.id ?? ""} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${formId}-code`}>Code</Label>
          <Input
            id={`${formId}-code`}
            value={values.code}
            onChange={(e) => setValues((s) => ({ ...s, code: e.target.value }))}
            placeholder="EX: HR, MK, QS"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-nameTh`}>Name (TH)</Label>
          <Input
            id={`${formId}-nameTh`}
            value={values.nameTh}
            onChange={(e) =>
              setValues((s) => ({ ...s, nameTh: e.target.value }))
            }
            placeholder="เช่น ทรัพยากรบุคคล"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-nameEn`}>Name (EN)</Label>
          <Input
            id={`${formId}-nameEn`}
            value={values.nameEn}
            onChange={(e) =>
              setValues((s) => ({ ...s, nameEn: e.target.value }))
            }
            placeholder="e.g., Human Resources"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
        <span>{values.id ? `#${values.id}` : "New"}</span>
        {submitting && <span>Saving…</span>}
      </div>
    </form>
  );
}
