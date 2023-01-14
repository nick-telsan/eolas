type SearchParam = {
  id: string
  value: string
}

export function getSearchParams(params: string) {
  if (params.length === 0) {
    return undefined
  }

  const paramArray = params.replace('?', '').split('&')
  const items: SearchParam[] = []

  paramArray.forEach((param) => {
    const parts = param.split('=')
    items.push({
      id: parts[0],
      value: parts[1],
    })
  })

  return items
}

export function getSearchParam(params: string, key: string) {
  const parsedParams = getSearchParams(params)

  if (!parsedParams) {
    return null
  }

  return parsedParams.find((param) => param.id === key).value || undefined
}
