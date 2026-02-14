import { NextResponse } from "next/server";

import { prisma } from "@/db";
import { createClassSchema } from "@/lib/schemas";

export async function GET() {
  const classes = await prisma.class.findMany({
    orderBy: [{ name: "asc" }, { teacher: "asc" }],
    include: {
      _count: {
        select: {
          enrollments: true,
          assignments: true,
        },
      },
    },
  });

  return NextResponse.json({ classes });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createClassSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const created = await prisma.class.create({
    data: {
      name: parsed.data.name,
      teacher: parsed.data.teacher,
    },
  });

  return NextResponse.json({ class: created }, { status: 201 });
}
