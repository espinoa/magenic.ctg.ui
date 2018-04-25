import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatSidenavModule, MatExpansionModule } from '@angular/material';
import { MatChipsModule, MatFormFieldModule, MatAutocompleteModule, MatIconModule } from '@angular/material';

import {
    MatDialogModule,
    MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatExpansionModule
    ],
    exports: [
        MatDialogModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatExpansionModule
    ]
})

export class MaterialModule {}
