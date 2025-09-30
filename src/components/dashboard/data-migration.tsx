import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud } from "lucide-react"

export default function DataMigration() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Data Migration Tools</CardTitle>
          <CardDescription>
            Bulk import existing publications and users from a CSV or JSON file.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Bulk Publication Upload</CardTitle>
          <CardDescription>
            Upload a CSV/JSON file to add your backlog of publications to the database.
            Ensure your file has columns like: Title, Author, PublishDate, Abstract, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="publication-file">Publication File</Label>
            <Input id="publication-file" type="file" />
            <Button className="mt-2">
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Publications
            </Button>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Bulk User Import</CardTitle>
          <CardDescription>
            Upload a CSV/JSON file to create accounts for your existing user base.
            Required columns: Name, Email, Role (Customer, Employee, or Admin).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-2">
            <Label htmlFor="user-file">User File</Label>
            <Input id="user-file" type="file" />
             <Button className="mt-2">
                <UploadCloud className="mr-2 h-4 w-4" />
                Import Users
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
