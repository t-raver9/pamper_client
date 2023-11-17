import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import { TimeRangeType } from ".";
import { Day } from "../../../api/queries";

type TimeRangeProps = {
  dayName: Day;
  range: TimeRangeType;
  onRangeChange: (day: Day, newRange: TimeRangeType) => void;
};

const TimeRange = ({ dayName, range, onRangeChange }: TimeRangeProps) => {
  const handleStartTimeChange = (newValue: dayjs.Dayjs | null) => {
    console.log("new value", newValue);
    onRangeChange(dayName, { ...range, open: newValue });
  };

  const handleEndTimeChange = (newValue: dayjs.Dayjs | null) => {
    onRangeChange(dayName, { ...range, close: newValue });
  };

  return (
    <Box my={2}>
      <h4>{dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h4>
      <Box display="inline-block" mr={2}>
        <TimePicker
          label="Start Time"
          value={range.open}
          onChange={handleStartTimeChange}
        />
      </Box>
      <Box display="inline-block">
        <TimePicker
          label="End Time"
          value={range.close}
          onChange={handleEndTimeChange}
        />
      </Box>
    </Box>
  );
};

export default TimeRange;
