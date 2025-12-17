import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, Video, Clock, FileText } from "lucide-react";

export const localServiceCategories = [
    {
        id: 'electrician',
        title: 'Electrician',
        icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-4H8l4-8v6h2v6z',
        color: 'bg-yellow-500',
    },
    {
        id: 'plumber',
        title: 'Plumber',
        icon: 'M7 2v2H5v2h2v4h2V6h2V4H9V2H7zm10 6v8h-2v4h6v-4h-2V8h-2z',
        color: 'bg-blue-500',
    },
    {
        id: 'carpenter',
        title: 'Carpenter',
        icon: 'M2 12l10 10 10-10-10-10L2 12zm10 4l6-6-6-6-6 6 6 6z',
        color: 'bg-orange-500',
    },
    {
        id: 'painter',
        title: 'Painter',
        icon: 'M12 2a10 10 0 00-10 10c0 4.97 4.03 9 9 9h2v-3h-2a6 6 0 010-12 6 6 0 016 6v1h3v-1a9 9 0 00-9-9z',
        color: 'bg-pink-500',
    },
    {
        id: 'cleaning',
        title: 'Cleaning Services',
        icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
        color: 'bg-green-500',
    },
    {
        id: 'tutor',
        title: 'Home Tutor',
        icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3l7 4-7 4-7-4 7-4zm0 14v-6l7-4v6l-7 4z',
        color: 'bg-purple-500',
    },
    {
        id: 'mechanic',
        title: 'Mechanic',
        icon: 'M12 2a10 10 0 100 20 10 10 0 000-20zm2 14h-4v-2h4v2zm-2-4a2 2 0 110-4 2 2 0 010 4z',
        color: 'bg-gray-600',
    },
    {
        id: 'gardener',
        title: 'Gardener',
        icon: 'M12 2C7 2 3 6 3 11s4 9 9 9 9-4 9-9S17 2 12 2zm0 14c-2.76 0-5-2.24-5-5h10c0 2.76-2.24 5-5 5z',
        color: 'bg-emerald-500',
    },
    {
        id: 'pest-control',
        title: 'Pest Control',
        icon: 'M12 2a10 10 0 00-10 10v2h2v6h16v-6h2v-2a10 10 0 00-10-10zm0 12a2 2 0 110-4 2 2 0 010 4z',
        color: 'bg-red-500',
    },
    {
        id: 'appliance-repair',
        title: 'Appliance Repair',
        icon: 'M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm6 16a1 1 0 100-2 1 1 0 000 2zm-6-4h12V6H6v8z',
        color: 'bg-indigo-500',
    },
];

export const localServiceCatrgories1 = [{
    id: 'ac-repair',
    title: 'AC Repair',
    icon: 'M4 6h16v8H4V6zm2 10h12v2H6v-2zm3-6h2v2H9v-2zm4 0h2v2h-2v-2z',
    color: 'bg-cyan-500',
},
{
    id: 'refrigerator-repair',
    title: 'Refrigerator Repair',
    icon: 'M6 2h12v20H6V2zm2 2v6h8V4H8zm0 8v8h8v-8H8z',
    color: 'bg-sky-500',
},
{
    id: 'washing-machine',
    title: 'Washing Machine Repair',
    icon: 'M4 2h16v20H4V2zm8 6a5 5 0 100 10 5 5 0 000-10z',
    color: 'bg-blue-600',
},
{
    id: 'internet-technician',
    title: 'Internet Technician',
    icon: 'M2 10a10 10 0 0120 0h-2a8 8 0 00-16 0H2zm4 0a6 6 0 0112 0h-2a4 4 0 00-8 0H6zm4 0a2 2 0 014 0h-4z',
    color: 'bg-violet-500',
},
{
    id: 'cctv-installation',
    title: 'CCTV Installation',
    icon: 'M2 7l10-4 10 4-10 4-10-4zm10 6l6-2v4l-6 2-6-2v-4l6 2z',
    color: 'bg-slate-600',
},
{
    id: 'moving-service',
    title: 'Packers & Movers',
    icon: 'M3 7h18v10H3V7zm2 2v6h14V9H5z',
    color: 'bg-amber-500',
},
{
    id: 'laundry',
    title: 'Laundry Service',
    icon: 'M6 2h12v20H6V2zm6 6a4 4 0 100 8 4 4 0 000-8z',
    color: 'bg-teal-500',
},
{
    id: 'computer-repair',
    title: 'Computer Repair',
    icon: 'M4 4h16v10H4V4zm6 12h4v2h-4v-2z',
    color: 'bg-zinc-700',
},
{
    id: 'mobile-repair',
    title: 'Mobile Repair',
    icon: 'M8 2h8v20H8V2zm4 18a1 1 0 100-2 1 1 0 000 2z',
    color: 'bg-rose-500',
},
{
    id: 'security-guard',
    title: 'Security Guard',
    icon: 'M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z',
    color: 'bg-neutral-700',
},
]


export const testimonials = [
    {
        rating: 5,
        text: "The electrician arrived on time, fixed the wiring quickly, and explained everything in simple terms. Very professional and reliable service!",
        author: "Rohit Sharma",
        location: "From Delhi",
        bgColor: "bg-[#E0F2FE]" // light blue
    },
    {
        rating: 5,
        text: "I hired a plumber through the platform and the experience was seamless. He solved the issue within an hour and left everything clean.",
        author: "Priya Singh",
        location: "From Mumbai",
        bgColor: "bg-[#FEF3C7]" // light yellow
    },
    {
        rating: 5,
        text: "Booked a home tutor for my son. The tutor was patient, very knowledgeable, and made learning fun. Highly recommend!",
        author: "Ananya Mehta",
        location: "From Bengaluru",
        bgColor: "bg-[#DCFCE7]" // light green
    },
    {
        rating: 5,
        text: "The carpenter was punctual and did an amazing job fixing our furniture. The quality of work exceeded my expectations. Super easy booking!",
        author: "Vikram Kapoor",
        location: "From Hyderabad",
        bgColor: "bg-[#FFE3E3]" // light red
    }
];



export const trustLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/2/28/Business_Insider_Logo.png", "https://upload.wikimedia.org/wikipedia/commons/5/52/CBS_News_logo.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/2560px-CNBC_logo.svg.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYDifNoGmPCktncfPW94aeUWyRDQ-Cv4KsZQ&s", "https://img-cdn.publive.online/fit-in/1200x675/afaqs/media/post_attachments/e437eb33c4409c0d1343c5257147f440376c3c78b073a2104b30bba3257b5fb4.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Fox_Business_%282%29.svg/330px-Fox_Business_%282%29.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Healthline_logo.svg/2560px-Healthline_logo.svg.png", "https://upload.wikimedia.org/wikipedia/commons/f/f4/Inc._magazine_logo.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Men%27s_Health.svg/2560px-Men%27s_Health.svg.png", "https://strictlyvc.com/wp-content/uploads/2019/02/techcrunch-logo.png", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/NewYorkTimes.svg/1200px-NewYorkTimes.svg.png", "https://www.nicepng.com/png/detail/155-1550192_wall-street-journal-logo-png.png"
];

export const faqs = [
    {
        question: "How much does hiring a local helper cost?",
        answer: "The cost depends on the service type and duration. For example, electricians and plumbers charge between ₹500–₹2,500 per visit, while tutors may charge hourly rates. You can see exact pricing before booking."
    },
    {
        question: "Do you provide verified and trustworthy helpers?",
        answer: "Yes! All our helpers are background-checked, verified, and reviewed by previous customers. We ensure you hire reliable and skilled professionals for every task."
    },
    {
        question: "What types of services are available?",
        answer: "You can hire local helpers for plumbing, electrical work, carpentry, home tutoring, appliance repair, gardening, cleaning, and more. We cover a wide range of home and personal services."
    },
    {
        question: "How quickly can a helper arrive?",
        answer: "Many of our helpers are available same-day, depending on your location and service type. You can schedule an appointment at a convenient time, often within a few hours of booking."
    },
    {
        question: "Can I book recurring services?",
        answer: "Yes, you can schedule recurring services such as weekly tutoring sessions, monthly home cleaning, or regular appliance maintenance. You can manage all bookings through your account dashboard."
    }
];

export const footerSections = [
    {
        title: "Company",
        links: [
            { text: "About Us", href: "/about" },
            { text: "How It Works", href: "/how-it-works" },
            { text: "Contact Us", href: "/contact" },
        ],
    },
    {
        title: "For Helpers",
        links: [
            { text: "Join as a Service Provider", href: "/signup/helper" },
            { text: "Partner Resources", href: "/resources" },
        ],
    },
    {
        title: "For Customers",
        links: [
            { text: "Find Local Helpers", href: "/helpers" },
            { text: "Book a Service", href: "/book-service" },
        ],
    },
    {
        title: "Legal",
        links: [
            { text: "Privacy Policy", href: "/privacy" },
            { text: "Terms & Conditions", href: "/terms" },
        ],
    },
];


export const contactInfo = [
    {
        icon: Phone,
        text: "+9170-5060-2972",
    },
    {
        icon: Mail,
        text: "support@helphive.com",
    },
    {
        icon: MapPin,
        text: "Gaya, Bihar - 824232, India",
    },
];


export const socials = [
    { name: "twitter", icon: Twitter, url: "https://twitter.com/localhelpindia" },
    { name: "facebook", icon: Facebook, url: "https://facebook.com/localhelpindia" },
    { name: "linkedin", icon: Linkedin, url: "https://linkedin.com/company/localhelpindia" },
    { name: "instagram", icon: Instagram, url: "https://instagram.com/localhelp.in" },
];


