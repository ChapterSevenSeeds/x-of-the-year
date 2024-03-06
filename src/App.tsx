import {
    Box,
    Divider,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import {
    differenceInBusinessDays,
    differenceInCalendarMonths,
    differenceInCalendarWeeks,
    differenceInDays,
    differenceInSeconds,
    format,
    isWeekend,
    startOfYear
} from "date-fns";
import { useEffect, useReducer } from "react";

function getSecondOfYear(date: Date, startOfYear: Date) {
    return differenceInSeconds(date, startOfYear) + 1;
}

const entries: { label: string, calculate: (date: Date, startOfYear: Date) => number, shouldSkipManualOffset?: (date: Date) => boolean }[] = [
    {
        label: "Calendar month",
        calculate: differenceInCalendarMonths,
    },
    {
        label: "Calendar week",
        calculate: differenceInCalendarWeeks,
    },
    {
        label: "Calendar day",
        calculate: differenceInDays,
    },
    {
        label: "Business day",
        calculate: differenceInBusinessDays,
        shouldSkipManualOffset: isWeekend,
    },
    { // These bottom three are manually calculated because the difference functions for their respective units do not change at the proper time (e.g. the minute changes at the 61st second rather than the 60th)
        label: "Hour",
        calculate: (date, startOfYear) => Math.floor(getSecondOfYear(date, startOfYear) / 60 / 60) + 1,
        shouldSkipManualOffset: () => true
    },
    {
        label: "Minute",
        calculate: (date, startOfYear) => Math.floor(getSecondOfYear(date, startOfYear) / 60) + 1,
        shouldSkipManualOffset: () => true
    },
    {
        label: "Second",
        calculate: getSecondOfYear,
        shouldSkipManualOffset: () => true
    }
];

export default function App() {
    const [, rerender] = useReducer(x => x + 1, 0);
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            rerender();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const now = new Date(); // Represents the elapsed time since the start of the year
    const start = startOfYear(now);
    return (
        <Box sx={{ margin: "auto", width: "fit-content", padding: theme => theme.spacing(2) }}>
            <Stack spacing={2}>
                <Typography variant="h4">Today is {format(now, "eeee, MMMM do 'of' y GGGG, QQQQ")}</Typography>
                <Divider flexItem />
                {entries.map(entry => (
                    <Typography key={entry.label} variant="h6">
                        <span style={{ color: theme.palette.secondary.main }}>{entry.label}</span> <span style={{ color: theme.palette.primary.main }}>{entry.calculate(now, start) + /* The offset is used to mimic a round-up behavior of the difference functions */ (!entry.shouldSkipManualOffset || !entry.shouldSkipManualOffset(now) ? 1 : 0)}</span> <span style={{ color: theme.palette.text.secondary }}>of the year</span>
                    </Typography>
                ))}
            </Stack>
        </Box>
    );
}