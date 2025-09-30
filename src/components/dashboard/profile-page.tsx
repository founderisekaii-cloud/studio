'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast";
import { users } from "@/lib/dummy-data";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(),
  affiliation: z.string().optional(),
  phone: z.string().optional(),
})

export default function ProfilePage() {
    // In a real app, this would be the logged-in user from context.
    const currentUser = users[2];

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: currentUser.name || "",
            email: currentUser.email || "",
            affiliation: currentUser.affiliation || "",
            phone: currentUser.phone || "",
        },
    });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values)
    toast({
      title: "Profile Updated",
      description: "Your information has been successfully saved.",
    });
  }

  return (
    <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">My Profile</CardTitle>
            <CardDescription>Manage your personal information and account settings.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" readOnly disabled {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="affiliation"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Affiliation (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="University of Knowledge" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Save Changes</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
