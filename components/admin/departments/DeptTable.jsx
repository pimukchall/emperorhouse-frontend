"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export function DeptTable({ items, loading, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Name (TH)</TableHead>
            <TableHead>Name (EN)</TableHead>
            <TableHead className="text-right w-48">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                Loading…
              </TableCell>
            </TableRow>
          ) : items?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          ) : (
            items.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.id}</TableCell>
                <TableCell className="font-mono">{d.code}</TableCell>
                <TableCell>{d.nameTh}</TableCell>
                <TableCell>{d.nameEn}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onEdit(d)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(d.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
