import { useEffect, useState } from "react";
import TimeRange from "./TimeRange";
import {
  BusinessHoursDTO,
  DAYS,
  Day,
  VenueHoursDTO,
  getVenueHours,
  postVenueHours,
  stringToDay,
} from "../../../api/queries";
import { useAuth } from "../../../contexts/authContext";
import dayjs from "dayjs";
import { Button } from "@mui/material";

export type TimeRangeType = {
  open: dayjs.Dayjs | null;
  close: dayjs.Dayjs | null;
};

const defaultTimeRange = {
  open: null,
  close: null,
};

type TimeRangeLookup = {
  [key in Day]: TimeRangeType;
};

const defaultState = DAYS.reduce((state, day) => {
  state[day] = { ...defaultTimeRange };
  return state;
}, {} as TimeRangeLookup);

const BusinessHours = () => {
  const [timeRanges, setTimeRanges] = useState(defaultState);
  const { venue } = useAuth();

  const createVenueHoursDTO = (): VenueHoursDTO => {
    const businessHours = Object.keys(timeRanges).map((day) => {
      const timeRange = timeRanges[day as unknown as Day];

      return {
        weekday: stringToDay(day),
        open: timeRange?.open ? timeRange.open.format("HH:mm") : null,
        close: timeRange?.close ? timeRange.close.format("HH:mm") : null,
        closed: false,
        venueId: venue!.id,
      };
    });

    return {
      businessHours: businessHours,
      holidayDays: [],
    };
  };

  const businessHoursDTOsToTimeRangeLookup = (
    businessHoursDTOs: BusinessHoursDTO[]
  ) => {
    return businessHoursDTOs.reduce((state, businessHoursDTO) => {
      state[businessHoursDTO.weekday] = {
        open: businessHoursDTO?.open
          ? dayjs(businessHoursDTO.open, "HH:mm")
          : null,
        close: businessHoursDTO?.close
          ? dayjs(businessHoursDTO.close, "HH:mm")
          : null,
      };
      return state;
    }, {} as TimeRangeLookup);
  };

  useEffect(() => {
    venue?.id &&
      getVenueHours(venue.id)
        .then((res) => {
          setTimeRanges(businessHoursDTOsToTimeRangeLookup(res.businessHours));
        })
        .catch((err) => console.log(err));
  }, []);

  const handleRangeChange = (day: Day, newRange: TimeRangeType) => {
    setTimeRanges((prevRanges) => ({
      ...prevRanges,
      [day]: newRange,
    }));
  };

  return (
    <div>
      <h2>Business Hours</h2>
      {DAYS.map((day) => {
        return (
          <TimeRange
            dayName={day}
            range={timeRanges[day]}
            onRangeChange={handleRangeChange}
          />
        );
      })}
      <Button
        onClick={() =>
          venue?.id && postVenueHours(venue?.id, createVenueHoursDTO())
        }
      >
        Save Hours
      </Button>
    </div>
  );
};

export default BusinessHours;
