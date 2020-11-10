import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import { EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking


@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit {

    calEvent = [
        //{ title: 'event 1', start: '2019-06-06T14:13:29Z' }
    ];
    options;
    @Input() fkWorkGroup: string;

    fromDate: Date;
    toDate: Date;

    calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];

    calendarOptions: CalendarOptions = {
      locale: koLocale,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      events: this.calEvent, // alternatively, use the `events` setting to fetch from a feed
      selectable: true,
      dateClick: this.onDateClick.bind(this),
      datesSet: this.onDatesRender.bind(this)
    };

    @Output() itemSelected = new EventEmitter();
    @Output() newDateSelected = new EventEmitter();

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

    constructor(private workGroupService: WorkGroupService, private datePipe: DatePipe) {
        // this.getScheduleList();
    }

    ngOnInit(): void {
        this.getScheduleList(this.fkWorkGroup);
    }

    onChange(result: Date): void {
        // console.log('onChange: ', result.toLocaleString());
        // console.log(this.datePipe.transform(result, 'yyyyMM'));
        console.log(result.toISOString());

        const calendarApi = this.calendarComponent.getApi();
        // calendarApi.next();
        console.log(calendarApi);
        calendarApi.select(result, result);

        this.getScheduleList(this.fkWorkGroup);
    }

    //#region public methods

    public getScheduleList(ids: string): void {
        const param = {
            fkWorkGroup : ids,
            fromDate: this.datePipe.transform(this.fromDate, 'yyyyMMdd'),
            toDate: this.datePipe.transform(this.toDate, 'yyyyMMdd')
        };
        console.log('getScheduleList : ' + ids);
        this.workGroupService.getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
                if (model.data) {
                    this.calEvent = model.data;
                }
            },
            (err) => {},
            () => {}
        );
    }

    onEventClick(param): void {
        console.log(param);
        console.log(param.event.id);
        this.itemSelected.emit(param.event.id);
    }

    onDateClick(param): void {
        console.log(param);
        this.newDateSelected.emit({fkWorkGroup: this.fkWorkGroup, date: param.date});
    }

    onDatesRender(param): void {
      console.log(param.view.activeEnd);
      const endDate: Date = param.view.activeEnd;
      endDate.setDate(endDate.getDate() - 1);

      this.fromDate = param.view.activeStart;
      this.toDate = endDate;
      // console.log(param.view.currentStart);
      // console.log(param.view.currentEnd);
      // console.log(endDate);
      this.getScheduleList(this.fkWorkGroup);
    }


    //#endregion

}
