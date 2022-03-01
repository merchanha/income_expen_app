import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setIntems = createAction(
    '[IngresoEgreso] Set Items',
    props<{items: IngresoEgreso[]}>()
    );
export const unSetIntems = createAction('[IngresoEgreso] UnSet Items');