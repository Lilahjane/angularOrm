import { Routes } from '@angular/router';
import { CookbookComponent } from '../coobook/coobook.component';
import {LandingComponent} from '../landing/landing.component';
export const routes: Routes = [
    {
        path: 'meals',
        component: CookbookComponent
    },

    {
        path: '',
        component: LandingComponent
    }



];
