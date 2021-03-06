import {inject} from 'aurelia-framework';
import {Api} from '~/services/api';
import {DialogService} from 'aurelia-dialog';
import {AnnouncementUpdateView} from '~/views/admin/announcement/update';

@inject(Api, DialogService)
export class AnnouncementListView {
  announcements = {
    params: {}
  }

  constructor(api, dialog) {
    this.api = api;
    this.dialog = dialog;
  }

  getAnnouncements() {
    this.api
    .fetch('announcements', this.announcements.params)
    .then(data => this.announcements.data = data.results)
    .catch(err => console.log(err));
  }

  edit(announcement) {
    this.dialog.open({ viewModel: AnnouncementUpdateView, model: announcement })
      .whenClosed(response => {
        this.getAnnouncements();
      });
  }

  delete(id) {
    console.log(id);
  }

  activate() {
    this.getAnnouncements();
  }
}
