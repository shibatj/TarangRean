import { NextResponse } from "next/server";

import { prisma } from "@/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const studentId = url.searchParams.get("studentId");

  const now = new Date();

  const rows = await prisma.studentAssignment.findMany({
    where: {
      status: { in: ["ASSIGNED", "MISSING"] },
      assignment: {
        dueDate: { lt: now },
      },
      studentId: studentId ?? undefined,
    },
    orderBy: [{ assignment: { dueDate: "asc" } }],
    include: {
      student: true,
      assignment: {
        include: { class: true },
      },
    },
  });

  return NextResponse.json({ outstanding: rows });
}
