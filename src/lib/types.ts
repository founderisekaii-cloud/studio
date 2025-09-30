export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Customer' | 'Employee' | 'Admin';
  affiliation?: string;
  phone?: string;
  dateJoined: string;
};

export type Submission = {
  id: string;
  customerId: string;
  title: string;
  authors: string[];
  status: 'Submitted' | 'In Review' | 'Approved' | 'Rejected';
  fileURL?: string;
  submissionDate: string;
  notes?: string;
};

export type Publication = {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  downloadURL?: string;
  isDownloadable: boolean;
  coverImageId: string;
  abstract: string;
  publicationType: 'Book' | 'Thesis' | 'Research Paper';
  ISBN?: string;
  DOI?: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type PricingTier = {
  id: string;
  packageName: string;
  price: string;
  features: string[];
  isPopular?: boolean;
};
