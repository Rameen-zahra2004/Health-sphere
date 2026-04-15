// src/constants/index.ts

import { Feature, Stat } from '@/backend/types'
import {
  Search,
  Calendar,
  FileText,
  Video,
  ClipboardList,
  Headphones,
} from 'lucide-react'

// -------------------- FEATURES --------------------
export const features: Feature[] = [
  {
    title: 'Find Doctors',
    description: 'Search and connect with verified healthcare professionals in your area.',
    icon: Search,
  },
  {
    title: 'Book Appointments',
    description: 'Schedule appointments easily with our intuitive booking system.',
    icon: Calendar,
  },
  {
    title: 'Health Records',
    description: 'Access and manage all your medical records securely in one place.',
    icon: FileText,
  },
  {
    title: 'Telemedicine',
    description: 'Consult with doctors remotely through secure video consultations.',
    icon: Video,
  },
  {
    title: 'Prescription Management',
    description: 'Track and manage your prescriptions and medication schedules.',
    icon: ClipboardList,
  },
  {
    title: '24/7 Support',
    description: 'Get help whenever you need it with our round-the-clock support team.',
    icon: Headphones,
  },
]

// -------------------- STATS --------------------
export const stats: Readonly<Stat[]> = [
  { value: '50K+', label: 'Active Users' },
  { value: '1000+', label: 'Verified Doctors' },
  { value: '100K+', label: 'Appointments Booked' },
  { value: '4.9/5', label: 'User Rating' },
]

// -------------------- NAV LINKS --------------------
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Contact', href: '/contact' },
] as const

// -------------------- FOOTER LINKS --------------------
export const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  services: [
    { label: 'Find Doctors', href: '/doctors' },
    { label: 'Book Appointment', href: '/appointments' },
    { label: 'Health Records', href: '/records' },
    { label: 'Telemedicine', href: '/telemedicine' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
} as const