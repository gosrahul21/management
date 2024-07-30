import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface AttendanceRecord {
  date: string;
  time: string;
}

interface AttendanceCalendarProps {
  records: AttendanceRecord[];
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({ records }) => {
  const events = records.map(record => ({
    title: `Session at ${record.time}`,
    start: new Date(record.date),
    end: new Date(record.date),
    allDay: true,
  }));

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
};

export default AttendanceCalendar;
