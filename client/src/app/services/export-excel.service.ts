import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';
const ExcelJS = require('exceljs');

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  async export(excelData, total, gst, admin, tds, digitalToken, earnings, available, withdrawed) {
    const title = excelData.title;
    const header = excelData.headers
    const data = excelData.data;

    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet(title, { views: [{ showGridLines: false }], properties: { defaultColWidth: 22 } },);

    worksheet.mergeCells('A1', 'D2');
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title
    titleRow.font = {
      name: 'Calibri',
      size: 16,
      underline: 'single',
      bold: true,
      color: { argb: 'ef8157' }
    }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }

    worksheet.addRow('');

    let totalRow = worksheet.addRow(['Total Amount:', 'Rs. ' + total])
    totalRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
    })
    let gstRow;
    gst != null ? gstRow = worksheet.addRow(['GST (18%):', 'Rs. ' + gst]) : gstRow = worksheet.addRow(['', '']);
    gstRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f0eeee' },
        bgColor: { argb: '' }
      }
    })

    let earningsRow;
    earnings != null ? earningsRow = worksheet.addRow(['User Earnings :', 'Rs. ' + earnings]) : earningsRow = worksheet.addRow(['', '']);
    earningsRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
    })

    let adminRow;
    admin != null ? adminRow = worksheet.addRow(['Admin (10%):', 'Rs. ' + admin]) : adminRow = worksheet.addRow(['', '']);
    adminRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f0eeee' },
        bgColor: { argb: '' }
      }
    })

    let tdsRow;
    tds != null ? tdsRow = worksheet.addRow(['TDS (5%):', 'Rs. ' + tds]) : tdsRow = worksheet.addRow(['', '']);
    tdsRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
    })

    let digitalTokenRow;
    digitalToken != null ? digitalTokenRow = worksheet.addRow(['Digital Token (10%):', 'Rs. ' + digitalToken]) : digitalTokenRow = worksheet.addRow(['', '']);
    digitalTokenRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f0eeee' },
        bgColor: { argb: '' }
      }
    })

    let availableRow;
    available != null ? availableRow = worksheet.addRow(['Total Available Balance:', 'Rs. ' + available]) : availableRow = worksheet.addRow(['', '']);
    availableRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
    })

    let withdrawedRow;
    withdrawed != null ? withdrawedRow = worksheet.addRow(['Total Withdrawed Balance:', 'Rs. ' + withdrawed]) : withdrawedRow = worksheet.addRow(['', '']);
    withdrawedRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f0eeee' },
        bgColor: { argb: '' }
      }
    })

    const imageSrc = '../../assets/img/logo.png';
    const response = await fetch(imageSrc);
    const buffer = await response.arrayBuffer();
    let logo = workbook.addImage({
      buffer: buffer,
      extension: 'png',
    });
    worksheet.addImage(logo, 'C6:D9');

    worksheet.addRow('');

    var newRow = [];
    newRow.push(header[0]);
    newRow.push(header[1]);
    newRow.push(header[2]);
    newRow.push(header[3]);
    newRow.push(header[4]);
    if (gst !== null) newRow.push(header[5]);
    if (earnings !== null) newRow.push(header[6]);
    if (admin !== null) newRow.push(header[7]);
    if (tds !== null) newRow.push(header[8]);
    if (digitalToken !== null) newRow.push(header[9]);
    if (withdrawed !== null) newRow.push(header[11]);
    if (available !== null) newRow.push(header[10]);

    let headerRow = worksheet.addRow(newRow);
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ef8157' },
        bgColor: { argb: '' }
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12
      }
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    })

    data.forEach(d => {
      var newRow = [];
      newRow.push(d[0]);
      newRow.push(d[1]);
      newRow.push(d[2]);
      newRow.push(d[3]);
      newRow.push(d[4]);
      if (gst !== null) newRow.push(d[5]);
      if (earnings !== null) newRow.push(d[6]);
      if (admin !== null) newRow.push(d[7]);
      if (tds !== null) newRow.push(d[8]);
      if (digitalToken !== null) newRow.push(d[9]);
      if (withdrawed !== null) newRow.push(d[11]);
      if (available !== null) newRow.push(d[10]);

      let dataRow = worksheet.addRow(newRow);

      dataRow.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, title + '.xlsx');
    })
  }
}
