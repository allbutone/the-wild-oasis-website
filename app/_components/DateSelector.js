"use client";

import { differenceInDays, isSameDay, isWithinInterval } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext.js";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

function DateSelector({ cabin, bookedDates, settings }) {
  // console.log(`cabin ${cabin.id} 已经被预订的日期有: `, bookedDates);

  const { range, setRange, resetRange } = useReservation();

  // 不允许选择的日期:
  // - 今天之前的日期
  // - bookedDates 中的日期(即: 已经被预订的日期)
  //
  // 存储在 context 内的 range 是被 all cabins 共享的, 因此可能出现如下情况:
  // `cabin1 选择的 range` 和 `cabin2 已经预订的日期` overlap, 为此要处理如下:
  const displayedRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  // 注意: 如果需要提交 reservation, 那么预订的日期应采用 displayedRange 而非 range

  // 从 cabin 中查到的信息:
  // const regularPrice = 23; // 木屋每天的价格
  // const discount = 23; // 木屋折扣(可从每天价格中扣除)
  // const numNights = 23; // guest 预订多少晚
  // const cabinPrice = 23; // guest 预订后, 计算的总价
  const { regularPrice, discount } = cabin;
  // console.log(`range from ${range.from} to ${range.to}`);
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // 从 setting 中查到的信息:
  const { minBookingLength, maxBookingLength } = settings;
  // console.log("minBookingLength", minBookingLength);
  // console.log("maxBookingLength", maxBookingLength);

  // 操作当日(今天)
  const today = new Date();
  function handleSelect(newSelected) {
    setRange(newSelected);
    console.log(`from ${newSelected.from} to ${newSelected.to}`);
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="px-5 py-2"
        //参考 https://daypicker.dev/selections/selection-modes 可知:
        //onSelect: Event callback when a date is selected
        //selected: The selected date(s).
        onSelect={handleSelect}
        selected={displayedRange}
        // mode:
        // single: 只能选择一天
        // range: 可以选择从那天开始(from)/到哪天结束(to)
        // mulitple: 可以选择多个日期
        mode="range"
        // range 跨越的天数的最小值
        min={minBookingLength}
        // range 跨越的天数的最大值
        max={maxBookingLength}
        // fromMonth={new Date()}
        // 迁移到高版本, 需要指定为:
        startMonth={today} // 可选的起始月份
        // fromDate={new Date()}
        // 迁移到高版本, 需要指定为:
        // hidden={{ before: today }} // 不展示今天以前的 date
        // 参考 https://daypicker.dev/selections/disabling-dates
        disabled={[
          { before: today }, // 不允许选择今天以前的 date
          (targetDay) => {
            // 如果已经预订的日期中, 已经有 targetDay, 就 disable (不让用户选择)
            return bookedDates.some((someDay) => isSameDay(someDay, targetDay));
          },
        ]} 
        // toYear={new Date().getFullYear() + 5}
        // 迁移到高版本, 需要指定为:
        endMonth={new Date(today.getFullYear() + 1, today.getMonth())} //可选的结束月份
        //captionLayout 可以指定为:
        // - 'label'(default), 即: 仅展示 caption (年月)
        // - 'dropdown-years', 即: 展示 caption (年月), 且 year 可下拉选择
        // - 'dropdown-months', 即: 展示 caption (年月), 且 month 可下拉选择
        captionLayout="dropdown-months"
        // 展示 current month 和 next month
        numberOfMonths={2}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range && (range.from || range.to) ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
