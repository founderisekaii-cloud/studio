// For this placeholder, we will use client-side filtering.
// In a real application, this would ideally be server-side with pagination.
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { publications } from '@/lib/dummy-data';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Search } from 'lucide-react';
import type { Publication } from '@/lib/types';

export default function ArchivesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredPublications = useMemo(() => {
    return publications
      .filter((pub) => {
        if (filterType === 'All') return true;
        return pub.publicationType === filterType;
      })
      .filter((pub) => {
        if (searchTerm === '') return true;
        return (
          pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pub.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }, [searchTerm, filterType]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Archives</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Browse our collection of published books, theses, and research papers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by title or author..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Book">Book</SelectItem>
            <SelectItem value="Thesis">Thesis</SelectItem>
            <SelectItem value="Research Paper">Research Paper</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredPublications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredPublications.map((pub: Publication) => {
            const pubImage = placeholderImages.find(p => p.id === pub.coverImageId);
            return (
              <Card key={pub.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                 <div className="relative h-80 w-full">
                    {pubImage && (
                        <Image
                            src={pubImage.imageUrl}
                            alt={`Cover of ${pub.title}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={pubImage.imageHint}
                        />
                    )}
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <span className="text-xs text-muted-foreground">{pub.publicationType}</span>
                  <h3 className="font-headline text-lg font-bold mt-1 line-clamp-2">{pub.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">by {pub.author}</p>
                  <p className="text-xs text-muted-foreground mt-2">{pub.publishDate}</p>
                  <p className="mt-3 text-sm line-clamp-3 flex-grow">{pub.abstract}</p>
                  <div className="mt-4">
                    {pub.isDownloadable && (
                      <Button size="sm" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground font-semibold">No publications found.</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
