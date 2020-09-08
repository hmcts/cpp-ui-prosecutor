export interface Breadcrumb {
  id: string;
  title: string;
  link?: (caseId?: string) => string;
}
