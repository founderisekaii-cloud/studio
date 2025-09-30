'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  authors: z.string().min(2, "Author names must be provided."),
  document: z.any().optional(), // In a real app, use z.instanceof(File) and refine
  notes: z.string().optional(),
})

export default function SubmissionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      authors: "",
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Submission Received!",
      description: "Your work has been submitted for review.",
    });
    form.reset();
  }
  return (
    <Card className="max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="font-headline text-2xl">Submit Your Work</CardTitle>
            <CardDescription>Fill out the form below to submit your manuscript for review.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Manuscript Title</FormLabel>
                        <FormControl>
                        <Input placeholder="The Future of Quantum Computing" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="authors"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Author(s)</FormLabel>
                        <FormControl>
                        <Input placeholder="John Doe, Jane Smith" {...field} />
                        </FormControl>
                        <FormDescription>
                            Separate multiple author names with a comma.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="document"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Document Upload</FormLabel>
                        <FormControl>
                          <Input type="file" {...field} />
                        </FormControl>
                         <FormDescription>
                            Please upload your manuscript in .doc, .docx, or .pdf format.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Any specific notes for the reviewers..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Submit for Review</Button>
                </form>
            </Form>
        </CardContent>
    </Card>
  )
}
