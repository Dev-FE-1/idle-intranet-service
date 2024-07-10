import Table from '../Table/Table.js';
import ManagementSection from './ManagementSection.js';

export default class WorkingTab {
  constructor() {
    this.contents = [];
    const transformedEmployees = this.contents.map((employee) => [
      employee.name,
      employee.position,
      employee.departmentName,
      employee.email,
      employee.phoneNumber,
    ]);
    this.table = new Table({
      headers: ['날짜', '출근 시각', '퇴근 시각', '주간 근무 시간'],
      contents: transformedEmployees,
    });

    this.managementSection = new ManagementSection({
      title: '근무내역',
      contents: [
        `<div class="work-history-container">${this.table.html()}</div>`,
      ],
    });
  }

  render() {
    return this.managementSection.html();
  }
}
