import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setIntems, unSetIntems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[]
}


export interface AppStateWithIngreso extends AppState{
    ingresosEgresos: State

}

export const initialState: State = {
   items: []
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setIntems, (state, {items}) => ({ ...state, items:[...items]})),
    on(unSetIntems, (state) => ({ ...state, items: []}))

);

export function IngresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}