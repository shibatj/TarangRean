import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/db";

const createEnrollmentSchema = z.object({
  studentId: z.string().min(1),
  classId: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = createEnrollmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: parsed.data.studentId,
        classId: parsed.data.classId,
      },
    });

    await prisma.scheduleItem.upsert({
      where: {
        studentId_classId: {
          studentId: parsed.data.studentId,
          classId: parsed.data.classId,
        },
      },
      create: {
        studentId: parsed.data.studentId,
        classId: parsed.data.classId,
      },
      update: {},
    });

    return NextResponse.json({ enrollment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Already enrolled" }, { status: 409 });
  }
}
