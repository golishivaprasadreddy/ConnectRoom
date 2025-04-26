"use client";

import { useState } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';
import CallList from '@/components/CallList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);

  const [upcomingMeeting, setUpcomingMeeting] = useState<{ time: string } | null>(null);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            {upcomingMeeting ? `Upcoming Meeting at: ${upcomingMeeting.time}` : 'No upcoming meeting'}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      {/* Pass a callback to CallList to get the upcoming meeting */}
      <CallList
        type="upcoming"
        onUpcomingMeeting={(meeting) => {
          if (meeting) {
            setUpcomingMeeting({ time: meeting.state?.startsAt?.toLocaleTimeString('en-US') || 'Unknown Time' });
          } else {
            setUpcomingMeeting(null);
          }
        }}
      />

      <MeetingTypeList />
    </section>
  );
};

export default Home;