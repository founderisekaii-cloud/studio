import type { Publication, Service, PricingTier, Announcement, User } from '@/lib/types';

export const services: Service[] = [
  {
    id: 's1',
    title: 'Manuscript Submission',
    description: 'Easy and secure submission process for your manuscripts. Our platform guides you through every step.',
    icon: 'FileText',
  },
  {
    id: 's2',
    title: 'Peer Review & Editing',
    description: 'Comprehensive peer review and professional editing services to ensure the quality of your work.',
    icon: 'BookOpen',
  },
  {
    id: 's3',
    title: 'Publishing & Distribution',
    description: 'Global distribution to major platforms and libraries. We handle the entire publication process.',
    icon: 'Globe',
  },
  {
    id: 's4',
    title: 'Cover Design',
    description: 'Professional and eye-catching cover designs that capture the essence of your work.',
    icon: 'Palette',
  },
  {
    id: 's5',
    title: 'ISBN & DOI Assignment',
    description: 'We handle all the necessary registrations, including ISBN and DOI for your publications.',
    icon: 'Fingerprint',
  },
  {
    id: 's6',
    title: 'Marketing & Promotion',
    description: 'Targeted marketing campaigns to help your publication reach the right audience.',
    icon: 'Megaphone',
  },
];

export const publications: Publication[] = [
  {
    id: 'p1',
    title: 'The Genesis of Time',
    author: 'Dr. Evelyn Reed',
    publishDate: '2023-10-15',
    isDownloadable: true,
    coverImageId: 'cover-1',
    abstract: 'A groundbreaking exploration of temporal physics and its philosophical implications. Dr. Reed challenges our understanding of reality itself.',
    publicationType: 'Book',
    ISBN: '978-3-16-148410-0',
    DOI: '10.1000/182',
  },
  {
    id: 'p2',
    title: 'Echoes of the Void',
    author: 'Marcus Cole',
    publishDate: '2023-09-01',
    isDownloadable: false,
    coverImageId: 'cover-2',
    abstract: 'A science fiction epic set in a distant galaxy, where humanity confronts an ancient, silent intelligence.',
    publicationType: 'Book',
    ISBN: '978-1-4028-9462-6',
  },
  {
    id: 'p3',
    title: 'The Alchemist\'s Secret',
    author: 'Helena Vance',
    publishDate: '2023-07-22',
    isDownloadable: true,
    coverImageId: 'cover-3',
    abstract: 'A historical novel weaving mystery and alchemy in 17th-century Prague. A young apprentice uncovers a conspiracy that could change the world.',
    publicationType: 'Book',
    ISBN: '978-0-321-76572-3',
  },
  {
    id: 'p4',
    title: 'City of Whispers',
    author: 'Leo Chen',
    publishDate: '2023-05-18',
    isDownloadable: false,
    coverImageId: 'cover-4',
    abstract: 'A noir thriller set in a rain-soaked, neon-lit metropolis. A detective hunts for a killer who leaves behind only cryptic messages.',
    publicationType: 'Book',
    ISBN: '978-0-596-52068-7',
  },
  {
    id: 'p5',
    title: 'AI in Modern Medicine',
    author: 'Dr. Sofia Khan',
    publishDate: '2023-03-10',
    isDownloadable: true,
    coverImageId: 'cover-5',
    abstract: 'A comprehensive review of the application of artificial intelligence in diagnostics, treatment planning, and drug discovery.',
    publicationType: 'Research Paper',
    DOI: '10.1234/j.med.2023.03.001',
  },
  {
    id: 'p6',
    title: 'The Last Voyage',
    author: 'Samuel Green',
    publishDate: '2023-01-20',
    isDownloadable: true,
    coverImageId: 'cover-6',
    abstract: 'A thrilling adventure on the high seas, following the final journey of a legendary pirate captain and his hidden treasure.',
    publicationType: 'Book',
    ISBN: '978-0-7432-7356-5',
  },
];

export const pricing: PricingTier[] = [
  {
    id: 'price_1',
    packageName: 'Basic',
    price: '$299',
    features: ['Manuscript Submission', 'Basic Formatting', 'Digital Publication'],
  },
  {
    id: 'price_2',
    packageName: 'Professional',
    price: '$799',
    features: [
      'Everything in Basic',
      'Peer Review Coordination',
      'Professional Editing',
      'Cover Design',
    ],
    isPopular: true,
  },
  {
    id: 'price_3',
    packageName: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Everything in Professional',
      'Hardcover Printing',
      'Global Distribution',
      'Dedicated Marketing',
    ],
  },
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'New Submission System Launch',
    content: 'We are thrilled to announce our new, streamlined submission system. Authors can now track their manuscript status in real-time through their dashboard.',
    date: '2024-05-01',
  },
  {
    id: 'a2',
    title: 'Call for Papers: AI & Society',
    content: 'We are accepting submissions for a special journal issue on the impact of Artificial Intelligence on society. Deadline is August 31st, 2024.',
    date: '2024-04-15',
  },
  {
    id: 'a3',
    title: 'Welcome to the New Shivay Digital Press Website',
    content: 'Our new online home is here! Explore our services, browse our archives, and connect with us like never before.',
    date: '2024-04-01',
  },
];

export const users: User[] = [
  { id: 'user1', email: 'admin@shivay.com', name: 'Admin User', role: 'Admin', dateJoined: '2020-01-01' },
  { id: 'user2', email: 'employee@shivay.com', name: 'Employee User', role: 'Employee', dateJoined: '2021-02-15' },
  { id: 'user3', email: 'customer@shivay.com', name: 'Customer User', role: 'Customer', dateJoined: '2022-03-20' },
];

export const submissions: Submission[] = [
    {
        id: 'sub1',
        customerId: 'user3',
        title: 'The Quantum Paradox',
        authors: ['Customer User'],
        status: 'In Review',
        submissionDate: '2024-05-10',
    },
    {
        id: 'sub2',
        customerId: 'user3',
        title: 'A Study of Ancient Marine Life',
        authors: ['Customer User'],
        status: 'Submitted',
        submissionDate: '2024-05-20',
    }
];
