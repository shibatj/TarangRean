import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { createAssignmentSchema } from "@/lib/schemas";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const classId = url.searchParams.get("classId");

  const assignments = await prisma.assignment.findMany({
    where: classId ? { classId } : undefined,
    orderBy: { dueDate: "asc" },
    include: {
      class: true,
      _count: {
        select: {
          studentAssignments: true,
        },
      },
    },
  });

  return NextResponse.json({ assignments });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createAssignmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const dueDate = new Date(parsed.data.dueDate);
  if (Number.isNaN(dueDate.getTime())) {
    return NextResponse.json({ error: "Invalid dueDate" }, { status: 400 });
  }

  const assignment = await prisma.assignment.create({
    data: {
      classId: parsed.data.classId,
      title: parsed.data.title,
      dueDate,
      notes: parsed.data.notes,
    },
  });

  return NextResponse.json({ assignment }, { status: 201 });
}
