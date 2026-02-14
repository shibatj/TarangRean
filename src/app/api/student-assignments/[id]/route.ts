import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { updateStudentAssignmentStatusSchema } from "@/lib/schemas";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = updateStudentAssignmentStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = await prisma.studentAssignment.update({
    where: { id },
    data: {
      status: parsed.data.status,
      submittedAt: parsed.data.status === "SUBMITTED" ? new Date() : undefined,
      gradedAt: parsed.data.status === "GRADED" ? new Date() : undefined,
    },
  });

  return NextResponse.json({ studentAssignment: updated });
}
