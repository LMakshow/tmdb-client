// export enum PageActionKind {
//   PAGE_COUNT = 'change_page_count',
//   PAGE_CURRENT = 'change_page_current',
//   PAGE_ITEMS = 'change_page_items',
// }

// export interface PageAction {
//   type: PageActionKind;
//   payload: number;
// }

// export interface PageState {
//   count: number;
//   current: number;
//   items: number;
// }

// export function pageReducer(state: PageState, action: PageAction) {
//   const { type, payload } = action;
//   switch (type) {
//     case PageActionKind.PAGE_COUNT:
//       return {
//         ...state,
//         count: payload,
//       };
//     case PageActionKind.PAGE_CURRENT:
//       return {
//         ...state,
//         current: payload,
//       };
//     case PageActionKind.PAGE_ITEMS:
//       return {
//         ...state,
//         current: Math.floor(state.current * (state.items / payload)),
//         items: payload,
//       };
//   }
// }
