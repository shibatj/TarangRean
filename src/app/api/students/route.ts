import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { createStudentSchema } from "@/lib/schemas";

export async function GET() {
  const students = await prisma.student.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          studentAssignments: {
            where: {
              status: { in: ["ASSIGNED", "MISSING"] },
            },
          },
        },
      },
    },
  });

  return NextResponse.json({ students });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createStudentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const student = await prisma.student.create({
      data: {
        name: parsed.data.name,
      },
    });

    return NextResponse.json({ student }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Student already exists" },
      { status: 409 },
    );
  }
}
