import { Routes } from '@angular/router';

import { AppChatComponent } from './chat/chat.component';
import { AppEmailComponent } from './email/email.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';
import { AppEmployeeComponent } from './employee/employee.component';
import { AppBlogsComponent } from './blogs/blogs.component';
import { AppBlogDetailsComponent } from './blogs/details/details.component';
import { AppContactComponent } from './contact/contact.component';
import { AppNotesComponent } from './notes/notes.component';
import { AppTodoComponent } from './todo/todo.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppTaskboardComponent } from './taskboard/taskboard.component';
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { AppTicketlistComponent } from './ticketlist/ticketlist.component';
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { AreasComponent } from './areas/areas.component';
import { NationalitiesComponent } from './nationalities/nationalities.component';
import { BranchesComponent } from './branches/branches.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { InstallmentRatesComponent } from './installment-rates/installment-rates.component';

import { MinistriesComponent } from './ministries/ministries.component';
import { MinistryPercentageComponent } from './ministry-percentage/ministry-percentage.component';
import { CourtsComponent } from './courts/courts.component';
import { PoliceStationsComponent } from './police-stations/police-stations.component';

import { BanksComponent } from './banks/banks.component';
import { TransactionsCompletedComponent } from './transactions-completed/transactions-completed.component';
import { PermissionRoleComponent } from './permission-role/permission-role.component';


export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'chat',
        component: AppChatComponent,
        data: {
          title: 'Chat',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Chat' },
          ],
        },
      },
      {
        path: 'calendar',
        component: AppFullcalendarComponent,
        data: {
          title: 'Calendar',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Calendar' },
          ],
        },
      },
      {
        path: 'notes',
        component: AppNotesComponent,
        data: {
          title: 'Notes',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Notes' },
          ],
        },
      },
      { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },
      {
        path: 'email/:type',
        component: AppEmailComponent,
        data: {
          title: 'Email',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Email' },
          ],
        },
        children: [
          {
            path: ':id',
            component: DetailComponent,
            data: {
              title: 'Email Detail',
              urls: [
                { title: 'Dashboard', url: '/dashboards/dashboard1' },
                { title: 'Email Detail' },
              ],
            },
          },
        ],
      },
      {
        path: 'permission',
        component: AppPermissionComponent,
        data: {
          title: 'Roll Base Access',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Roll Base Access' },
          ],
        },
      },
      {
        path: 'todo',
        component: AppTodoComponent,
        data: {
          title: 'Todo App',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Todo App' },
          ],
        },
      },
      {
        path: 'taskboard',
        component: AppTaskboardComponent,
        data: {
          title: 'Taskboard',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Taskboard' },
          ],
        },
      },
      {
        path: 'tickets',
        component: AppTicketlistComponent,
        data: {
          title: 'Tickets',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tickets' },
          ],
        },
      },
      {
        path: 'contacts',
        component: AppContactComponent,
        data: {
          title: 'Contacts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Contacts' },
          ],
        },
      },
      {
        path: 'courses',
        component: AppCoursesComponent,
        data: {
          title: 'Courses',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Courses' },
          ],
        },
      },
      {
        path: 'courses/coursesdetail/:id',
        component: AppCourseDetailComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Course Detail' },
          ],
        },
      },
      {
        path: 'blog/post',
        component: AppBlogsComponent,
        data: {
          title: 'Posts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Posts' },
          ],
        },
      },
      {
        path: 'blog/detail/:id',
        component: AppBlogDetailsComponent,
        data: {
          title: 'Blog Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Blog Detail' },
          ],
        },
      },
      {
        path: 'employee',
        component: AppEmployeeComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Employee' },
          ],
        },
      },

      {
        path: 'areas',
        component: AreasComponent,
        data: {
          title: 'المناطق',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Areas' },
          ],
        },
      },

      {
        path: 'nationalities',
        component: NationalitiesComponent,
        data: {
          title: 'الجنسيات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'nationalities' },
          ],
        },
      },

      {
        path: 'branches',
        component: BranchesComponent,
        data: {
          title: 'الفروع',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'branches' },
          ],
        },
      },
      {
        path: 'governorates',
        component: GovernoratesComponent,
        data: {
          title: 'المحافظات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'governorates' },
          ],
        },
      },
      {
        path: 'installment_rates',
        component: InstallmentRatesComponent,
        data: {
          title: 'نسب التقسيط',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Installment_rates' },
          ],
        },
      },
      {

        path: 'ministry-rates',
        component: MinistryPercentageComponent,
        data: {
          title: 'نسب الوزارات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'نسب الوزارات' },
          ],
        },
      },
      {
        path: 'ministries',
        component: MinistriesComponent,
        data: {
          title: 'الوزارات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'ministries' },
          ],
        },
      },

      {
        path: 'courts',
        component: CourtsComponent,
        data: {
          title: 'المحاكم',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'courts' },
          ],
        },
      },
      // PoliceStationsComponent
      {
        path: 'police-stations',
        component: PoliceStationsComponent,
        data: {
          title: 'المغافر',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'police-stations' },

          ],
        },
      },
      {
        path: 'banks',
        component: BanksComponent,
        data: {
          title: 'البنوك',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Banks' },
          ],
        },
      },
      {
        path: 'transactions-completed',
        component: TransactionsCompletedComponent,
        data: {
          title: 'منجزين المعاملات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'TransactionsCompleted' },
          ],
        },
      },
      // PermissionRoleComponent
      {
        path: 'permission-role',
        component: PermissionRoleComponent,
        data: {
          title: 'الصلاحيات',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'PermissionRoleComponent' },
          ],
        },
      },
      {
        path: 'invoice',
        component: AppInvoiceListComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Invoice' },
          ],
        },
      },
      {
        path: 'addInvoice',
        component: AppAddInvoiceComponent,
        data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Add Invoice' },
          ],
        },
      },
      {
        path: 'viewInvoice/:id',
        component: AppInvoiceViewComponent,
        data: {
          title: 'View Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'View Invoice' },
          ],
        },
      },
      {
        path: 'editinvoice/:id',
        component: AppEditInvoiceComponent,
        data: {
          title: 'Edit Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Edit Invoice' },
          ],
        },
      },
    ],
  },
];
