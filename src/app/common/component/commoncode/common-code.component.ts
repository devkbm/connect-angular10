import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent extends AppBase implements OnInit {

    queryKey = 'programCode';
    queryValue = '';
    selectedCode;

    @ViewChild('commonCodeTree', {static: true})
    tree: CommonCodeTreeComponent;

    @ViewChild('commonCodeForm', {static: false})
    form: CommonCodeFormComponent;

    constructor(location: Location) {
        super(location);
    }

    ngOnInit(): void {
        this.tree.getCommonCodeHierarchy();
    }

    public getCommonCodeTree(): void {
        this.tree.getCommonCodeHierarchy();
        this.form.getCommonCodeHierarchy();
    }

    public newForm(): void {
        this.form.newForm(this.selectedCode);
    }

    public saveCommonCode(): void {
        this.form.submitCommonCode();
    }

    public deleteCommonCode(): void {
        this.form.deleteCommonCode();
    }

    public selectedItem(item): void {
        this.selectedCode = item.id;
        this.form.getCommonCode(item.id);
    }

}
