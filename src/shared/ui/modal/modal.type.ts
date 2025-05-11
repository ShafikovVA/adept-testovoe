export interface IModal<ViewData> {
  open: boolean;
  view: 'companies' | 'employees';
  viewData: ViewData;
}