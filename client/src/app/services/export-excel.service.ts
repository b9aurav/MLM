import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fileSaver from 'file-saver';
const ExcelJS = require('exceljs');

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  async export(excelData, total, gst, admin, tds) {
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

    let adminRow;
    admin != null ? adminRow = worksheet.addRow(['Admin (10%):', 'Rs. ' + admin]) : adminRow = worksheet.addRow(['', '']);
    adminRow.eachCell((cell, number) => {
      if (number == 2) {
        cell.alignment = { horizontal: 'right' };
      }
    })

    let tdsRow;
    tds != null ? tdsRow = worksheet.addRow(['TDS (5%):', 'Rs. ' + tds]) : tdsRow = worksheet.addRow(['', '']);
    tdsRow.eachCell((cell, number) => {
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
    worksheet.addImage(logo, 'C4:D7');

    worksheet.addRow('');

    let headerRow = worksheet.addRow(header);
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
    })

    data.forEach(d => {
      let dataRow = worksheet.addRow(d);
      dataRow.getCell('A').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      dataRow.getCell('A').value = dataRow.getCell('A').value.toString().slice(0, 4) + dataRow.getCell('A').value.toString().slice(4).replace(/./g, '*');
      dataRow.getCell('B').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      dataRow.getCell('C').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      dataRow.getCell('D').border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, title + '.xlsx');
    })
  }
}
