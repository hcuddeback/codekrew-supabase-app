'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { getEvents } from '@/app/actions/calendar/getEvents'
import { createClient } from '@/lib/utils/supabase/client'

interface CalendarEvent {
  id: string
  title: string
  event_date: string
}

export default function CalendarWidget() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        redirect("/sign-in");
        return;
      }

      const fetchedEvents = await getEvents(user.id);
      setEvents(fetchedEvents);
          {loading && <li className="text-gray-500">Loading events...</li>}
          {!loading && events.length === 0 && <li className="text-gray-500">No upcoming events</li>}
    };

    fetchData();
  }, []);
  

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-zinc-800">
      <h2 className="widget-header font-semibold text-lg mb-4">Calendar</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <ul className="space-y-2 text-sm">
          {events.length === 0 && <li className="text-gray-500">No upcoming events</li>}
          {events.map(event => (
            <li key={event.id} className="flex justify-between">
              <span>{event.title}</span>
              <span className="text-gray-500 dark:text-gray-400">{new Date(event.event_date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 text-center text-gray-400 text-xs">
        (Static calendar grid coming soon...)
      </div>
    </div>
  )
}
