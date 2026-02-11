"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useTheme } from "@/providers/ThemeProvider";
import { Select } from "@/components/ui/Select";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="mb-2 block text-sm font-medium">Theme</label>
          <Select
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ]}
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
          />
        </CardContent>
      </Card>
    </div>
  );
}
