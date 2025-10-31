"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, FileText, MapPin, Phone, Star, Video } from "lucide-react";
import {Link} from "react-router-dom";

// Minimal local UI components with Tailwind
function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow ${className}`}>{children}</div>;
}
function CardContent({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}
function Button({ children, className = "", ...props }) {
  return <button className={`px-4 py-2 rounded font-medium transition ${className}`} {...props}>{children}</button>;
}
function Badge({ children, className = "" }) {
  return <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${className}`}>{children}</span>;
}
function Avatar({ children, className = "" }) {
  return <span className={`inline-block rounded-full overflow-hidden bg-gray-200 ${className}`}>{children}</span>;
}
function AvatarImage({ src, alt }) {
  return src ? <img src={src} alt={alt} className="object-cover w-full h-full" /> : null;
}
function AvatarFallback({ children, className = "" }) {
  return <span className={`flex items-center justify-center w-full h-full ${className}`}>{children}</span>;
}
// Tabs system: basic implementation
function Tabs({ value, onValueChange, children, className = "" }) {
  return <div className={className}>{children}</div>;
}
function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
function TabsTrigger({ value, children, className = "", onClick }) {
  return <button className={`focus:outline-none px-4 py-2 ${className}`} onClick={() => onClick(value)}>{children}</button>;
}
function TabsContent({ value, activeValue, children, className = "" }) {
  return value === activeValue ? <div className={className}>{children}</div> : null;
}

// Local constants
function getStatusColor(status) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-100 text-blue-600";
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Cancelled":
      return "bg-red-100 text-red-600";
    case "In Progress":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

// Dummy Modal component
function PrescriptionViewModal({ appointment, userType, trigger }) {
  return <>
    {trigger}
    {/* Implement actual modal as needed */}
  </>;
}


// Dummy hooks with static data for demo purpose
const dummyAppointments = [
  {
    _id: "123",
    slotStartIso: new Date(Date.now() + 3600 * 1000).toISOString(),
    doctorId: {
      name: "Dr. John Smith",
      specialization: "Dermatology",
      profileImage: "",
      hospitalInfo: { name: "City Hospital" },
      fees: 500,
    },
    status: "Scheduled",
    symptoms: "Fever, headache",
    consultationType: "Video Consultation",
    prescription: null,
  },
  {
    _id: "456",
    slotStartIso: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    doctorId: {
      name: "Dr. Alice Ray",
      specialization: "Paediatrics",
      profileImage: "",
      hospitalInfo: { name: "Children Care" },
      fees: 400,
    },
    status: "Completed",
    symptoms: "Cough, cold",
    consultationType: "Phone Consultation",
    prescription: { details: "Take rest, drink fluids" },
  },
];

function useAppointmentStore() {
  const [appointments, setAppointments] = useState(dummyAppointments);
  const [loading, setLoading] = useState(false);
  const fetchAppointments = (userType, tab) => {
    setLoading(false);
    // In a real implementation, filter by tab here
    if (tab === "upcoming") {
      setAppointments(dummyAppointments.filter(apt =>
        new Date(apt.slotStartIso) >= new Date() &&
        (apt.status === "Scheduled" || apt.status === "In Progress")));
    } else {
      setAppointments(dummyAppointments.filter(apt =>
        new Date(apt.slotStartIso) < new Date() ||
        apt.status === "Completed" ||
        apt.status === "Cancelled"));
    }
  };
  return { appointments, fetchAppointments, loading };
}
function userAuthStore() {
  return { user: { type: "patient", name: "Jane Doe" } };
}

// Main Component
const PatientDashboardContent = () => {
  const { user } = userAuthStore();
  const { appointments, fetchAppointments, loading } = useAppointmentStore();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tabCounts, setTabCounts] = useState({ upcoming: 0, past: 0 });

  useEffect(() => {
    if (user?.type === "patient") fetchAppointments("patient", activeTab);
  }, [user, activeTab, fetchAppointments]);

  useEffect(() => {
    const now = new Date();
    const upcomingAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.slotStartIso);
      return (
        (aptDate >= now || apt.status === "In Progress") &&
        (apt.status === "Scheduled" || apt.status === "In Progress")
      );
    });
    const pastAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.slotStartIso);
      return (
        aptDate < now ||
        apt.status === "Completed" ||
        apt.status === "Cancelled"
      );
    });
    setTabCounts({ upcoming: upcomingAppointments.length, past: pastAppointments.length });
  }, [appointments]);

  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const isToday = dateString => new Date(dateString).toDateString() === new Date().toDateString();
  const canJoinCall = appointment => {
    const appointmentTime = new Date(appointment.slotStartIso);
    const now = new Date();
    const diffMintues = (appointmentTime.getTime() - now.getTime()) / (1000 * 60);
    return (
      isToday(appointment.slotStartIso) &&
      diffMintues <= 15 && diffMintues >= -120 &&
      (appointment.status === "Scheduled" || appointment.status === "In Progress")
    );
  };

  if (!user) return null;

  const AppointmentCard = ({ appointment }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <Avatar className="w-20 h-20">
              <AvatarImage src={appointment.doctorId?.profileImage} alt={appointment.doctorId?.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {appointment.doctorId?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-4 md:mt-0 flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {appointment.doctorId?.name}
                </h3>
                <p className="text-gray-600">{appointment.doctorId?.specialization}</p>
                <div className="flex items-center justify-center md:justify-start space-x-1 text-sm text-gray-500 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{appointment.doctorId?.hospitalInfo?.name}</span>
                </div>
              </div>
              <div className="mt-2 md:mt-0 text-center md:text-right">
                <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                {isToday(appointment.slotStartIso) && (
                  <div className="text-xs text-blue-600 font-semibold mt-1">TODAY</div>
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(appointment.slotStartIso)}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-600">
                  {appointment.consultationType === "Video Consultation"
                    ? <Video className="w-4 h-4" />
                    : <Phone className="w-4 h-4" />}
                  <span>{appointment.consultationType}</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="flex justify-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Fee:</span>
                  <p>₹{appointment.doctorId?.fees}</p>
                </div>
                {appointment.symptoms && (
                  <div className="flex justify-center gap-2 text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Symptoms</span>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {appointment.symptoms}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row items-center md:justify-between space-y-3 md:space-y-0">
              <div className="flex space-x-2">
                {canJoinCall(appointment) && (
                  <Link href={`/call/${appointment._id}`}>
                    <Button size='sm' className="bg-green-600 text-white hover:bg-green-700 flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </Button>
                  </Link>
                )}
                {appointment.status === 'Completed' && appointment.prescription && (
                  <PrescriptionViewModal
                    appointment={appointment}
                    userType="patient"
                    trigger={
                      <Button variant='outline' size='sm' className="text-green-700 border border-green-200 bg-white hover:bg-green-50 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        View Prescription
                      </Button>
                    }
                  />
                )}
              </div>
              {appointment.status === 'Completed' && (
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ tab }) => {
    const emptyStates = {
      upcoming: {
        icon: Clock,
        title: "No Upcoming Appointments",
        description: "You have no upcoming appointments scheduled.",
        showBookButton: true,
      },
      past: {
        icon: FileText,
        title: "No Past Appointments",
        description: "Your Completed consultations will appear here.",
        showBookButton: false,
      },
    };
    const state = emptyStates[tab];
    const Icon = state.icon;
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{state.title}</h3>
          <p className="text-gray-600 mb-6">{state.description}</p>
          {state.showBookButton && (
            <Link href="/doctor-list">
              <Button className="bg-blue-600 text-white flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Book Your First Appointment
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-md md:text-3xl font-bold text-gray-900">
              My Appointment
            </h1>
            <p className="text-xs md:text-lg text-gray-600">
              Manage your healthcare appointments
            </p>
          </div>
          <div className="flex items-center space-x-4 ">
            <Link href="/doctor-list">
              <Button className="bg-blue-600 text-white flex items-center">
                <Calendar className="w-4 h-4 mr-2 " />
                Book <span className="hidden md:block">New Appointment</span>
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="upcoming"
              className={`flex items-center space-x-2 ${activeTab === "upcoming" ? "border-b-2 border-blue-600" : ""}`}
              onClick={setActiveTab}
            >
              <Clock className="w-4 h-4" />
              <span>Upcoming ({tabCounts.upcoming})</span>
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className={`flex items-center space-x-2 ${activeTab === "past" ? "border-b-2 border-blue-600" : ""}`}
              onClick={setActiveTab}
            >
              <Calendar className="w-4 h-4" />
              <span>Past ({tabCounts.past})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" activeValue={activeTab} className="space-y-4">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : appointments.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {appointments.map((appointment) => (
                  <AppointmentCard key={appointment._id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <EmptyState tab="upcoming" />
            )}
          </TabsContent>
          <TabsContent value="past" activeValue={activeTab} className="space-y-4">
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : appointments.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {appointments.map((appointment) => (
                  <AppointmentCard key={appointment._id} appointment={appointment} />
                ))}
              </div>
            ) : (
              <EmptyState tab="past" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboardContent;
