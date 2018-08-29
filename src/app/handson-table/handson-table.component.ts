import { Component, OnInit } from '@angular/core';
import * as Handsontable from 'handsontable';
import { HotTableRegisterer } from '@handsontable/angular';
import { HotTableService } from './handson-table.service';

@Component({
  selector: 'app-handson-table',
  templateUrl: './handson-table.component.html',
  styleUrls: ['./handson-table.component.css']
})
export class HandsonTableComponent implements OnInit {

  settings: Handsontable.GridSettings;
  columns: Handsontable.GridSettings[];
  selection: string;
  instance: string;
  remoteData: any;
  remoteColumns: any[];
  remoteTableId: string;
  row: number;
  column: number;
  comments: any[];

  constructor(private tableRegisterer: HotTableRegisterer,
    private tableService: HotTableService) {
    this.comments = [];
    this.selection = '';
    this.instance = 'table1';
    this.remoteTableId = 'remoteTable';
    this.settings = {
      data: [
        [1, 'Amr'],
        [2, 'Mohamed'],
        [3, 'Zyad']
      ],
      rowHeaders: true,
      colHeaders: true
    };
    this.columns = [
      {type: 'numeric', data: 'id'},
      {type: 'text', data: 'name'}
    ];
    this.row = 0;
    this.column = 0;
    this.remoteColumns = [
      { data: 'uid', title: 'UID', readOnly: true },
      { data: 'name', title: 'Name' },
      { data: 'age', title: 'Age', type: 'numeric' },
      { data: 'balance', title: 'Balance' },
      { data: 'company', title: 'Company' },
      { data: 'gender', title: 'Gender', type: 'dropdown', source: ['male', 'female'] },
      { data: 'phone', title: 'Phone' },
      { data: 'registered', title: 'Registered' },
      { data: 'isActive', title: 'Is active?', type: 'checkbox' },
      {
        data: 'about',
        title: 'About',
        renderer(hotInstance, td, row, column, prop, value, cellProperties) {
          const limit = 20;

          if (!value) {
            value = '';
          }

          value = value.length > limit ? `${value.substr(0, limit - 3)}...` : value;

          Handsontable.renderers.TextRenderer.apply(this, [hotInstance, td, row, column, prop, value, cellProperties]);
        }
      }
    ];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tableService.getAllUsers().subscribe(users => {
      this.remoteData = users;
    }, error => {
      console.log(error);
    });
  }

  clearCells() {
    const hotTable = this.tableRegisterer.getInstance(this.remoteTableId);
    if (hotTable) {
      hotTable.emptySelectedCells();
    }
  }

  onAfterSetCellMeta = (event, row, column, type) => {
    if (type !== 'comment') {
      return;
    }
    const instance = this.tableRegisterer.getInstance(this.instance);
    const metaData = instance.getCellMeta(row, column);

    if (!metaData['comment']) {
      const index = this.comments.findIndex(elem => {
        return elem.row === row && elem.column === column;
      });
      this.comments.splice(index, 1);
      console.log(this.comments);
      return;
    }
    const comment = metaData['comment']['value'];
    if (!comment) {
      return;
    }
    this.comments.push({row: row, column: column, comment: comment});
    console.log(this.comments);
  }

  onAfterSelection = (tableInstance) => {
    let [sRow, sCol, eRow, eCol] = tableInstance.getSelectedLast();

    sCol = Handsontable.helper.spreadsheetColumnLabel(sCol);
    eCol = Handsontable.helper.spreadsheetColumnLabel(eCol);

    const sCoordinates = `${sCol}${sRow + 1}`;
    const eCoordinates = `${eCol}${eRow + 1}`;

    if (sCoordinates !== eCoordinates) {
      this.selection = `${sCoordinates}:${eCoordinates}`;
      return;
    }
    this.selection = sCoordinates;
  }

  onAfterDeselection = () => {
    this.selection = '';
  }

  onAfterChange = (hotInstance, changes, source) => {
    if (!changes) { return; }
    console.log('Old value: ', changes[0][2]);
    console.log('New value: ', changes[0][3]);
  }

}
