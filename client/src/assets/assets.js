import profile_pic from './profile_pic.png'
import appointment_img from './appointment_img.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'


export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    appointment_img,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}


export const providers = [
    {
        _id: 'prov1',
        name: 'Ravi Kumar',
        image:
            'https://img.freepik.com/free-photo/man-electrical-technician-working-switchboard-with-fuses_169016-24062.jpg?semt=ais_hybrid&w=740&q=80',
        service: 'Electrician',
        experience: '5 Years',
        about:
            'Ravi Kumar is a skilled electrician specializing in home wiring, fan and light installations, and appliance repair. Known for his quick service and reliability across the city.',
        price: '250/hr',
        address: {
            line1: 'Shastri Nagar',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov2',
        name: 'Anjali Singh',
        image:
            'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format',
        service: 'Home Tutor',
        experience: '3 Years',
        about:
            'Anjali Singh provides personalized home tuition for students in grades 6–10. She focuses on conceptual learning and exam preparation in Science and Mathematics.',
        price: "300/hr",
        address: {
            line1: 'Rajendra Nagar',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov3',
        name: 'Amit Verma',
        image:
            'https://img.freepik.com/free-photo/medium-shot-man-posing-studio_23-2150275711.jpg?semt=ais_hybrid&w=740&q=80',
        service: 'Plumber',
        experience: '6 Years',
        about:
            'Amit Verma offers quick and affordable plumbing services for bathrooms, kitchens, and water tanks. Available for emergency repairs 24/7.',
        price: "200/hr",
        address: {
            line1: 'Kankarbagh',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov4',
        name: 'Sneha Patel',
        image:
            'https://media.istockphoto.com/id/1139905448/photo/the-young-tailor-working-near-the-sewing-machine.jpg?s=612x612&w=0&k=20&c=YFYXiwofFTxhsNLREOiUA-d7kRRTQgvFS0nWrerpiFY=',
        service: 'Tailor',
        experience: '4 Years',
        about:
            'Sneha Patel is a fashion tailor specializing in women’s wear, custom stitching, and alterations. She ensures perfect fitting and on-time delivery.',
        price: "180/hr",
        address: {
            line1: 'Boring Road',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov5',
        name: 'Rohit Sharma',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcVWPXVh9jXaUG6Bb6y6SWdM3BfRTvn4RYhA&s',
        service: 'Painter',
        experience: '7 Years',
        about:
            'Rohit Sharma provides wall painting, waterproofing, and decorative paint solutions for homes and offices with clean finishing.',
        price: "350/hr",
        address: {
            line1: 'Gola Road',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov6',
        name: 'Meena Devi',
        image:
            'https://img.freepik.com/free-photo/woman-chef-cooking-vegetables-pan_1303-22287.jpg?semt=ais_hybrid&w=740&q=80',
        service: 'Cook',
        experience: '8 Years',
        about:
            'Meena Devi is an experienced home cook who prepares hygienic and tasty meals. She is available for part-time cooking services for families and bachelors.',
        price: "150/hr",
        address: {
            line1: 'Exhibition Road',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov7',
        name: 'Suresh Yadav',
        image:
            'https://img.freepik.com/free-photo/carpenter-cutting-mdf-board-inside-workshop_23-2149451066.jpg?semt=ais_hybrid&w=740&q=80',
        service: 'Carpenter',
        experience: '10 Years',
        about:
            'Suresh Yadav provides custom furniture design, repair, and installation services. Skilled in both traditional and modular woodwork.',
        price: "400/hr",
        address: {
            line1: 'Patliputra Colony',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov8',
        name: 'Pooja Mishra',
        image:
            'https://ik.imagekit.io/uktherapyrooms/images/uploads/news-pictures/387-london-blog-post-image-20190418225330.jpg',
        service: 'Beautician',
        experience: '5 Years',
        about:
            'Pooja offers home beauty services including facials, waxing, haircuts, and bridal makeup. Known for her professional and hygienic setup.',
        price: '500/hr',
        address: {
            line1: 'Ashok Nagar',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov9',
        name: 'Rajesh Kumar',
        image:
            'https://www.leaderbank.com/sites/default/files/2024-07/AdobeStock_255057402_1200.jpg',
        service: 'Landlord',
        experience: '12 Years',
        about:
            'Rajesh Kumar owns several flats for rent in prime Patna addresss. Verified landlord with clean rental agreements and fair pricing.',
        price: '9000/month',
        address: {
            line1: 'Anisabad',
            line2: 'Patna, Bihar',
        },
    },
    {
        _id: 'prov10',
        name: 'Nisha Kumari',
        image:
            'https://img77.uenicdn.com/image/upload/v1551792022/category/shutterstock_697823383.jpg',
        service: 'Shop Owner – Stationery & Print',
        experience: '3 Years',
        about:
            'Nisha runs a stationery and photocopy shop offering quick printing, lamination, and school supplies at affordable rates.',
        price: '₹10 – ₹500 per item',
        address: {
            line1: 'Bailey Road',
            line2: 'Patna, Bihar',
        },
    },
];
