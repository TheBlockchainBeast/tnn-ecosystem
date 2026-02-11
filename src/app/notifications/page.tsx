import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>In-app</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-muted)]">
            Transaction confirmations and price alerts will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
