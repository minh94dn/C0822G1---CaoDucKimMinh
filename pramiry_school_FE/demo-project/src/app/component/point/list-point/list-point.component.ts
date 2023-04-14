import {Component, OnInit} from '@angular/core';
import {PointManagement} from '../../../model/point-management';
import {PointService} from '../../../service/point.service';


@Component({
  selector: 'app-list-point',
  templateUrl: './list-point.component.html',
  styleUrls: ['./list-point.component.css']
})
export class ListPointComponent implements OnInit {
  pointManagementList: PointManagement[] = [];
  teacherId = 1;
  // @ts-ignore
  studentName: '';

  constructor(private pointService: PointService) {
    this.search();
    // this.getAll();
  }

  ngOnInit() {

  }

  // getAll() {
  //   return this.pointService.getAll(this.teacherId).subscribe(next => {
  //     console.log(next);
  //     this.pointManagementList = next;
  //     console.log(next);
  //   });
  // }


  editPoint1(id: number, value: string, value2: string) {
    console.log(id, value, value2);
    this.pointService.editPoint(id, Number(value), Number(value2)).subscribe(next => {
      alert('Sửa điểm thành công');
      // return this.getAll();
    });
  }

  search() {
    if (this.studentName) {
      this.pointService.searchStudent(this.teacherId, this.studentName).subscribe(next => {
        console.log(next);
        this.pointManagementList = next;
      });
    } else {
      this.pointService.searchTeacherId(this.teacherId).subscribe(next => {
        console.log(next);
        this.pointManagementList = next;
      });
    }
  }
}
