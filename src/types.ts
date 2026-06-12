/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ITTicket {
  id: string; // Maps to SharePoint 'ID' (Counter)
  title: string; // Maps to SharePoint 'Title' (Single line of text)
  category: string; // Maps to SharePoint 'Category' (Choice: Hardware, Software, Network, Access, Workday/HR, Others)
  priority: 'Low' | 'Medium' | 'High' | 'Critical'; // Choice
  description: string; // Multiple lines of text
  status: 'New' | 'In Progress' | 'Pending Info' | 'Resolved' | 'Closed'; // Choice
  requesterEmail: string; // Person or Group / Single text
  requesterName: string; // Person or Group
  createdDate: string; // Date and Time
  assignedTo?: string; // Person or Group
  comment?: string; // Additional comments
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: 'IT Update' | 'HR News' | 'General' | 'Security';
  publishedDate: string;
  author: string;
  urgent: boolean;
}

export interface KBArticle {
  id: string;
  title: string;
  category: string;
  content: string[];
  views: number;
  likes: number;
}

export interface AppFolder {
  id: string;
  title: string;
  url: string;
  category: 'Workspace' | 'HR' | 'Finance' | 'IT Portal';
  description: string;
}

export type UserRole = 'Employee' | 'IT_Support' | 'IT_Admin';

export interface Booking {
  id: string;
  roomName: string;
  date: string;
  timeSlot: string;
  purpose: string;
  bookedBy: string;
  department: string;
  status: 'Approved' | 'Pending';
}

export interface BorrowedItem {
  id: string;
  name: string;
  category: 'Laptop' | 'Peripherals' | 'Tablet' | 'Accessories';
  serialNumber: string;
  status: 'Available' | 'Borrowed';
  borrowerName?: string;
  borrowerEmail?: string;
  expectedReturnDate?: string;
}

export interface EntraUser {
  name: string;
  email: string;
  avatar: string;
  jobTitle: string;
  department: string;
  officeLocation: string;
  tokenExpired: boolean;
  role: UserRole;
}
