import Image from "next/image";

import Link from "next/link";

import Card from "@/app/_components/Card";
import Shell from "@/app/_components/Shell";

export default function Home() {
  return (
    <Shell>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Students">
          <p className="text-sm text-zinc-600">
            Register student names and view who has outstanding work.
          </p>
          <div className="mt-4">
            <Link
              href="/students"
              className="text-sm font-medium text-zinc-900 underline"
            >
              Go to Students
            </Link>
          </div>
        </Card>

        <Card title="Classes">
          <p className="text-sm text-zinc-600">
            Create classes and enroll students (adds the class to their schedule).
          </p>
          <div className="mt-4">
            <Link
              href="/classes"
              className="text-sm font-medium text-zinc-900 underline"
            >
              Go to Classes
            </Link>
          </div>
        </Card>

        <Card title="Assignments">
          <p className="text-sm text-zinc-600">
            Create assignments for a class and assign them to students.
          </p>
          <div className="mt-4">
            <Link
              href="/assignments"
              className="text-sm font-medium text-zinc-900 underline"
            >
              Go to Assignments
            </Link>
          </div>
        </Card>

        <Card title="Outstanding">
          <p className="text-sm text-zinc-600">
            See which students have assignments past due that are not submitted.
          </p>
          <div className="mt-4">
            <Link
              href="/outstanding"
              className="text-sm font-medium text-zinc-900 underline"
            >
              Go to Outstanding
            </Link>
          </div>
        </Card>
      </div>
    </Shell>
  );
}
