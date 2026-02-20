import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

const seedData = [
  {
    title: "CareConnect",
    date: "January 2025",
    category: ["Healthcare", "Service Platform"],
    description: "CareConnect is a full-stack service booking platform that connects users with professional caregivers. Users can browse available services and place bookings through a guided booking process that includes specific location details. Administrators manage services, bookings, and users via a dedicated dashboard. Technologies: Next.js, Node.js, Express.js, MongoDB, NextAuth, Tailwind CSS.",
    longDescription: "CareConnect is a comprehensive full-stack service booking platform designed to bridge the gap between users and professional caregivers. Whether it's baby care, elderly support, or patient assistance, the platform ensures a seamless connection. The system is built with structured workflows to handle complex booking requirements, including date, time, duration, and precise location tracking across Divisions, Districts, and Areas.",
    features: [
        "Advanced Search & Filtering for Caregivers",
        "Guided Booking System with Location Tracking",
        "User & Admin Dashboards",
        "Secure Authentication with NextAuth",
        "Review & Rating System"
    ],
    technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "NextAuth", "Tailwind CSS"],
    image: "", // Placeholder or you can put a path here if you have assets uploaded to public
    gradient: "from-pink-600 to-purple-600",
  },
  {
    title: "Contest Arena",
    date: "November 2024",
    category: ["Contest Management", "Creative"],
    description: "Contest Arena is a web platform designed to manage online creative contests with clearly defined user roles. Users can explore contests using search and filtering features and participate after authentication, while contest creators manage their events. Technologies: React.js, Node.js, Express.js, MongoDB, Firebase, Tailwind CSS.",
    longDescription: "Contest Arena empowers communities to host and manage creative contests effortlessly. It features a robust role-based access control system that distinguishes between Participants, Contest Creators, and Administrators. This ensures that every user has a tailored experience, from submitting entries to judging and managing the entire contest lifecycle.",
    features: [
        "Role-Based Access Control (Admin, Creator, Participant)",
        "Contest Creation & Management Tools",
        "Submission & Voting Systems",
        "Real-time Status Updates",
        "Search & Filter Contests"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS"],
    image: "",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "ZapShift",
    date: "September 2024",
    category: ["Logistics", "Delivery"],
    description: "ZapShift is a logistics web platform built to support delivery-based services through a multi-role architecture. Users can create delivery requests and track orders, riders manage assigned deliveries through a dashboard, and admins oversee the entire operation. Technologies: React.js, Node.js, Express.js, MongoDB, Firebase, Tailwind CSS.",
    longDescription: "ZapShift revolutionizes local logistics by providing a streamlined platform for delivery management. It caters to three distinct user groups: Users who place orders, Riders who fulfill them, and Admins who oversee operations. The system handles the entire delivery lifecycle, ensuring transparency and efficiency from pickup to drop-off.",
    features: [
        "Multi-Role Dashboard (User, Rider, Admin)",
        "Order Creation & Tracking",
        "Rider Assignment System",
        "Status Management Workflow",
        "Scalable Backend Architecture"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS"],
    image: "",
    gradient: "from-purple-600 to-indigo-600",
  }
];

export async function POST() {
  await dbConnect();

  try {
    // Clear existing data to avoid duplicates suitable for dev/test
    await Project.deleteMany({});

    // Insert new data
    const projects = await Project.insertMany(seedData);

    return NextResponse.json({ success: true, count: projects.length, message: "Database seeded successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
