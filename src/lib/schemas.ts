import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export const createClassSchema = z.object({
  name: z.string().trim().min(1).max(120),
  teacher: z.string().trim().min(1).max(120).optional(),
});

export const createAssignmentSchema = z.object({
  classId: z.string().min(1),
  title: z.string().trim().min(1).max(160),
  dueDate: z.string().min(1),
  notes: z.string().trim().max(2000).optional(),
});

export const assignAssignmentToStudentsSchema = z.object({
  assignmentId: z.string().min(1),
  studentIds: z.array(z.string().min(1)).min(1),
});

export const updateStudentAssignmentStatusSchema = z.object({
  status: z.enum(["ASSIGNED", "SUBMITTED", "GRADED", "MISSING"]),
});
