
"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse } from "date-fns";

interface Calendar28Props {
  value: string;
  onChange: (date: Date | undefined, formattedValue: string) => void;
  label: string;
  error?: string;
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

export function Calendar28({ value, onChange, label, error }: Calendar28Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value ? new Date(value) : undefined);
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [inputValue, setInputValue] = React.useState(
    value ? format(new Date(value), "MMMM dd, yyyy") : ""
  );

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const formatted = selectedDate ? format(selectedDate, "MMMM dd, yyyy") : "";
    setInputValue(formatted);
    onChange(selectedDate, selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
    if (selectedDate) setMonth(selectedDate);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputValue(input);
    try {
      const parsedDate = parse(input, "MMMM dd, yyyy", new Date());
      if (isValidDate(parsedDate)) {
        setDate(parsedDate);
        setMonth(parsedDate);
        onChange(parsedDate, format(parsedDate, "yyyy-MM-dd"));
      }
    } catch {
      onChange(undefined, "");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={inputValue}
          placeholder="June 01, 2000"
          className="bg-background pr-10 pl-10"
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0 datepicker-container"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateChange}
              disabled={(date) => date > new Date()}
              initialFocus
              className="calendar-day"
            />
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
