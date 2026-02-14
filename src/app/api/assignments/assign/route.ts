import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { assignAssignmentToStudentsSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = assignAssignmentToStudentsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { assignmentId, studentIds } = parsed.data;

  await prisma.studentAssignment.createMany({
    data: studentIds.map((studentId) => ({
      studentId,
      assignmentId,
      status: "ASSIGNED",
    })),
    skipDuplicates: true as never,
  });

  return NextResponse.json({ ok: true });
}
