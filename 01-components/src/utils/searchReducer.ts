// export enum SearchActionKind {
//   SET_QUERY = 'set_query',
//   SET_MODEL = 'set_model',
//   SET_ADULT = 'set_adult',
//   SET_YEAR = 'set_year',
// }

// export interface SearchAction {
//   type: SearchActionKind;
//   payload: string;
// }

// export interface SearchState {
//   query: string;
//   model: string;
//   adult: string;
//   year: string;
// }

// export function searchReducer(state: SearchState, action: SearchAction) {
//   const { type, payload } = action;
//   switch (type) {
//     case SearchActionKind.SET_QUERY:
//       return {
//         ...state,
//         query: payload,
//       };
//     case SearchActionKind.SET_MODEL:
//       return {
//         ...state,
//         model: payload,
//       };
//     case SearchActionKind.SET_ADULT:
//       return {
//         ...state,
//         adult: payload,
//       };
//     case SearchActionKind.SET_YEAR:
//       return {
//         ...state,
//         year: payload,
//       };
//   }
// }
