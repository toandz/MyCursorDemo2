import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, IconButton, Select, MenuItem } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, getDaysInMonth, startOfMonth, getDay, addMonths, subMonths } from 'date-fns';
import DayView from '../components/planner/DayView';

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const YearHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const MonthsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
}));

const MonthCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[3],
  },
}));

const MonthTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const DaysGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '2px',
});

const WeekdayHeader = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(0.5),
  fontSize: '0.75rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

const DayCell = styled(Box, {
  shouldForwardProp: prop => 
    prop !== 'isToday' && 
    prop !== 'isCurrentMonth' && 
    prop !== 'isSelected'
})<{ 
  isToday?: boolean; 
  isCurrentMonth?: boolean;
  isSelected?: boolean;
}>(({ theme, isToday, isCurrentMonth, isSelected }) => ({
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.875rem',
  color: isCurrentMonth ? theme.palette.text.primary : theme.palette.text.disabled,
  position: 'relative',
  cursor: 'default',
  backgroundColor: isSelected ? theme.palette.action.selected : 'transparent',
  ...(isToday && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '2px',
      left: '2px',
      right: '2px',
      bottom: '2px',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '50%',
    },
  }),
}));

// Monthly View Components
const MonthlyViewContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(4),
}));

const MonthlyCalendarSection = styled(Box)(({ theme }) => ({
  width: '300px',
  height: 'fit-content',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[1],
}));

const DailyViewSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2),
}));

const DayCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[1],
}));

const DayCardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const DayName = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.text.secondary,
}));

const DayNumber = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  '&.today': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const ExtraCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.warning.light,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  minHeight: '300px',
  gridColumn: 'span 4',
  marginTop: theme.spacing(2),
}));

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Types
interface DayInfo {
  day: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  weekIndex: number;
}

// Helper Functions
const generateMonthDays = (date: Date): DayInfo[] => {
  const today = new Date();
  const monthStart = startOfMonth(date);
  const daysInMonth = getDaysInMonth(monthStart);
  const startingDayIndex = getDay(monthStart);
  
  const days: DayInfo[] = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayIndex; i++) {
    days.push({ 
      day: '', 
      isCurrentMonth: false, 
      isToday: false,
      weekIndex: Math.floor(i / 7)
    });
  }
  
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = 
      today.getDate() === day && 
      today.getMonth() === date.getMonth() && 
      today.getFullYear() === date.getFullYear();
      
    days.push({ 
      day: day.toString(), 
      isCurrentMonth: true, 
      isToday,
      weekIndex: Math.floor((day + startingDayIndex - 1) / 7)
    });
  }
  
  // Fill remaining cells to maintain grid structure
  const remainingCells = 42 - days.length;
  for (let i = 0; i < remainingCells; i++) {
    days.push({ 
      day: '', 
      isCurrentMonth: false, 
      isToday: false,
      weekIndex: Math.floor((days.length + i) / 7)
    });
  }
 
  return days;
};

interface MonthViewProps {
  date: Date;
  onBack: () => void;
}

const MonthView: React.FC<MonthViewProps> = ({ date, onBack }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const days = generateMonthDays(date);
  const today = new Date();
  const monthStart = startOfMonth(date);
  const daysInMonth = getDaysInMonth(monthStart);
  const startingDayIndex = getDay(monthStart);

  const handleDayClick = (weekIndex: number) => {
    setSelectedWeek(weekIndex);
  };

  // Handle click on the day grid panel  
  const handleDayGridClick = (dayNumber: number) => {
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      setSelectedDate(new Date(date.getFullYear(), date.getMonth(), dayNumber));
    }
  };

  if (selectedDate) {
    return (
      <DayView 
        date={selectedDate} 
        onClose={() => setSelectedDate(null)} 
      />
    );
  }

  // Calculate the days to display in the first row (Sunday to Wednesday)
  const firstRowDays = Array.from({ length: 4 }, (_, i) => {
    const dayNumber = i + (selectedWeek * 7) - startingDayIndex + 1;
    return {
      weekday: WEEKDAYS[i],
      dayNumber,
      isCurrentMonth: dayNumber > 0 && dayNumber <= daysInMonth,
      isToday: 
        today.getDate() === dayNumber && 
        today.getMonth() === date.getMonth() && 
        today.getFullYear() === date.getFullYear()
    };
  });

  // Calculate the days to display in the second row (Thursday to Saturday)
  const secondRowDays = Array.from({ length: 3 }, (_, i) => {
    const dayNumber = (i + 4) + (selectedWeek * 7) - startingDayIndex + 1;
    return {
      weekday: WEEKDAYS[i + 4],
      dayNumber,
      isCurrentMonth: dayNumber > 0 && dayNumber <= daysInMonth,
      isToday: 
        today.getDate() === dayNumber && 
        today.getMonth() === date.getMonth() && 
        today.getFullYear() === date.getFullYear()
    };
  });

  return (
    <MonthlyViewContainer>
      <MonthlyCalendarSection>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <IconButton onClick={onBack} size="small">
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">
            {format(date, 'MMMM yyyy')}
          </Typography>
        </Box>

        <DaysGrid>
          {WEEKDAYS.map(day => (
            <WeekdayHeader key={day}>{day}</WeekdayHeader>
          ))}
          {days.map((day: DayInfo, index: number) => (
            <DayCell 
              key={index}
              isToday={day.isToday}
              isCurrentMonth={day.isCurrentMonth}
              isSelected={selectedWeek === day.weekIndex}
              onClick={() => handleDayClick(day.weekIndex)}
              sx={{ 
                cursor: 'default',
                '&:hover': {
                  backgroundColor: 'transparent'
                },
                ...(selectedWeek === day.weekIndex && {
                  backgroundColor: theme => theme.palette.action.selected,
                  '&:hover': {
                    backgroundColor: theme => theme.palette.action.selected
                  }
                })
              }}
            >
              {day.day}
            </DayCell>
          ))}
        </DaysGrid>
      </MonthlyCalendarSection>

      <DailyViewSection>
        {/* First row: Sunday to Wednesday */}
        {firstRowDays.map((day, index) => (
          <DayCard 
            key={index} 
            elevation={0}
            onClick={() => day.isCurrentMonth && handleDayGridClick(day.dayNumber)}
            sx={{ 
              cursor: day.isCurrentMonth ? 'pointer' : 'default',
              opacity: day.isCurrentMonth ? 1 : 0.3,
              backgroundColor: day.isCurrentMonth ? 'background.paper' : 'action.disabledBackground'
            }}
          >
            <DayCardHeader>
              <DayName>{day.weekday}</DayName>
              {day.isCurrentMonth && (
                <DayNumber className={day.isToday ? 'today' : ''}>
                  {day.dayNumber}
                </DayNumber>
              )}
            </DayCardHeader>
            {day.isCurrentMonth && (
              <Box sx={{ flex: 1, opacity: 0.6 }}>
                {/* Placeholder for future content */}
              </Box>
            )}
          </DayCard>
        ))}

        {/* Second row: Thursday to Saturday */}
        {secondRowDays.map((day, index) => (
          <DayCard 
            key={index} 
            elevation={0}
            onClick={() => day.isCurrentMonth && handleDayGridClick(day.dayNumber)}
            sx={{ 
              cursor: day.isCurrentMonth ? 'pointer' : 'default',
              opacity: day.isCurrentMonth ? 1 : 0.3,
              backgroundColor: day.isCurrentMonth ? 'background.paper' : 'action.disabledBackground'
            }}
          >
            <DayCardHeader>
              <DayName>{day.weekday}</DayName>
              {day.isCurrentMonth && (
                <DayNumber className={day.isToday ? 'today' : ''}>
                  {day.dayNumber}
                </DayNumber>
              )}
            </DayCardHeader>
            {day.isCurrentMonth && (
              <Box sx={{ flex: 1, opacity: 0.6 }}>
                {/* Placeholder for future content */}
              </Box>
            )}
          </DayCard>
        ))}

        {/* Extra space card */}
        <ExtraCard elevation={0}>
          <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
            Additional Space
          </Typography>
        </ExtraCard>
      </DailyViewSection>
    </MonthlyViewContainer>
  );
};

const YearCalendar: React.FC = () => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const yearRange = Array.from({ length: 21 }, (_, i) => selectedYear - 10 + i);

  const handleMonthClick = (month: number) => {
    setSelectedMonth(new Date(selectedYear, month));
  };

  if (selectedMonth) {
    return (
      <Container>
        <MonthView 
          date={selectedMonth} 
          onBack={() => setSelectedMonth(null)}
        />
      </Container>
    );
  }

  return (
    <Container>
      <YearHeader>
        <IconButton onClick={() => setSelectedYear(prev => prev - 1)}>
          <ChevronLeft />
        </IconButton>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          variant="standard"
          sx={{ minWidth: 100 }}
        >
          {yearRange.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => setSelectedYear(prev => prev + 1)}>
          <ChevronRight />
        </IconButton>
      </YearHeader>

      <MonthsGrid>
        {Array.from({ length: 12 }, (_, month) => {
          const monthDate = new Date(selectedYear, month);
          return (
            <MonthCard 
              key={month} 
              elevation={1}
              onClick={() => handleMonthClick(month)}
            >
              <MonthTitle variant="subtitle1">
                {format(monthDate, 'MMMM')}
              </MonthTitle>
              <DaysGrid>
                {WEEKDAYS.map(day => (
                  <WeekdayHeader key={day}>{day}</WeekdayHeader>
                ))}
                {generateMonthDays(monthDate).map((day: DayInfo, index: number) => (
                  <DayCell 
                    key={index}
                    isToday={day.isToday}
                    isCurrentMonth={day.isCurrentMonth}
                    sx={{ 
                      cursor: 'default',
                      '&:hover': {
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    {day.day}
                  </DayCell>
                ))}
              </DaysGrid>
            </MonthCard>
          );
        })}
      </MonthsGrid>
    </Container>
  );
};

export default YearCalendar; 