"use client";

import * as React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function UiComponentsPlayground() {
  const [emailAlerts, setEmailAlerts] = React.useState(true);
  const [agreed, setAgreed] = React.useState(false);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Buttons and badges</CardTitle>
          <CardDescription>Real components using project theme tokens.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">New</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Inputs and select</CardTitle>
          <CardDescription>Common form controls rendered live.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sample-name">Name</Label>
            <Input id="sample-name" placeholder="Type your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sample-market">Market</Label>
            <Select defaultValue="stocks">
              <SelectTrigger id="sample-market" className="w-full">
                <SelectValue placeholder="Choose market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="etfs">ETFs</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sample-note">Notes</Label>
            <Textarea id="sample-note" placeholder="Write a short note..." />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Tabs, switch and accordion</CardTitle>
          <CardDescription>Interactive primitives for a component playground.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>
            <TabsContent value="settings" className="space-y-4 pt-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="email-alerts">Email alerts</Label>
                <Switch
                  id="email-alerts"
                  checked={emailAlerts}
                  onCheckedChange={setEmailAlerts}
                />
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Checkbox
                  id="agree-terms"
                  checked={agreed}
                  onCheckedChange={(value) => setAgreed(value === true)}
                />
                <Label htmlFor="agree-terms">I agree to receive product updates.</Label>
              </div>
            </TabsContent>
            <TabsContent value="help" className="pt-3">
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Where are the components defined?</AccordionTrigger>
                  <AccordionContent>
                    All of these examples come directly from files in `components/ui`.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I copy these patterns?</AccordionTrigger>
                  <AccordionContent>
                    Yes. This section is meant as a live reference while building product screens.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
          <Separator />
          <p className="text-muted-foreground text-sm">
            This playground is not a static list; each preview is a real mounted component.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
