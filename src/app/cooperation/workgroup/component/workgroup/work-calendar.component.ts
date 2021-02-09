import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../common/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule';

import { EventApi, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
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
      { title: 'event 1', start: new Date('2021-02-01T14:13:29Z'), end: new Date('2021-02-03T14:13:29Z'), allDay: null }
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
      eventClick: this.onDateClick.bind(this),
      eventsSet: this.onDatesRender.bind(this)
    };

    @Output() itemSelected = new EventEmitter();
    @Output() newDateSelected = new EventEmitter();

    @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent;

    constructor(private workGroupService: WorkGroupService, private datePipe: DatePipe) {
        /*this.fromDate = new Date('2020-10-01');
        this.toDate = new Date('2020-10-30');
        this.getScheduleList('65');
        */
    }

    ngOnInit(): void {
      //this.getScheduleList(this.fkWorkGroup);
      this.fromDate = new Date('2020-10-01');
      this.toDate = new Date('2020-10-30');
      this.getScheduleList('55');
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

                    console.log(this.calendarComponent);
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

    onDatesRender(param: EventApi): void {
      console.log(param);
      //console.log(param[0]._context.viewApi);

      const endDate: Date = param[0]._context.viewApi.currentEnd;
      endDate.setDate(endDate.getDate() - 1);

      this.fromDate = param[0]._context.viewApi.currentStart;
      this.toDate = endDate;
      // console.log(param.view.currentStart);
      // console.log(param.view.currentEnd);
      // console.log(endDate);
      this.getScheduleList(this.fkWorkGroup);

    }


    //#endregion

}
