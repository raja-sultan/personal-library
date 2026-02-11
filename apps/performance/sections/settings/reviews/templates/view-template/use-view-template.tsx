import { useTemplateViewQuery } from "@services/settings/review/templates-api"

interface TemplateView {
  viewData: any
}

export function useViewTemplates(id: string): TemplateView {
  const { data: viewData } = useTemplateViewQuery({ id })
  return {
    viewData
  }
}